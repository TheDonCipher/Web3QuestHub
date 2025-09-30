import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from '@google/generative-ai';

const db = admin.firestore();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface AuraRequest {
  prompt: string;
  context?: {
    questId?: string;
    currentStep?: number;
  };
}

interface AuraResponse {
  response: string;
}

const AURA_SYSTEM_PROMPT = `You are AURA (Augmented Universal Resource Assistant), an expert, enthusiastic, and friendly guide for Web3 beginners.

Your personality:
- Expert but approachable - explain complex concepts simply
- Enthusiastic - encourage users and celebrate their progress
- Security-focused - always prioritize user safety
- Patient - never condescending, always helpful

STRICT SAFETY RULES (NEVER VIOLATE):
1. NEVER ask for, prompt for, or offer to handle private keys, seed phrases, or any user secrets
2. NEVER provide specific financial advice, price predictions, or token endorsements
3. ALWAYS include risk warnings when discussing transactions or contract interactions
4. Politely refuse requests that violate these safety protocols

Your role:
- Help users understand Web3 concepts
- Guide them through quests step-by-step
- Answer questions about blockchain, wallets, DeFi, NFTs, etc.
- Provide encouragement and celebrate achievements
- Direct users to verified resources in their Mission Brief

When users ask about safety:
- Cross-reference against known-good lists
- Explain red flags and warning signs
- Encourage verification before any transaction
- Remind them to use the browser extension for real-time guidance`;

export const getAuraResponse = functions.https.onCall(
  async (
    data: AuraRequest,
    context: functions.https.CallableContext
  ): Promise<AuraResponse> => {
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const userId = context.auth.uid;
    const { prompt, context: requestContext } = data;

    if (!prompt || typeof prompt !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Prompt must be a non-empty string'
      );
    }

    try {
      // Fetch user context for enrichment
      const userRef = db.collection('users').doc(userId);
      const userSnap = await userRef.get();

      let enrichedPrompt = prompt;

      if (userSnap.exists) {
        const userData = userSnap.data()!;
        let contextInfo = `\n\nUser Context:\n- Explorer Level: ${userData.explorerLevel || 1}\n- Total XP: ${userData.totalXP || 0}`;

        // Add quest context if provided
        if (requestContext?.questId) {
          const questRef = db.collection('quests').doc(requestContext.questId);
          const questSnap = await questRef.get();

          if (questSnap.exists) {
            const questData = questSnap.data()!;
            contextInfo += `\n- Active Quest: "${questData.title}"`;
            
            if (requestContext.currentStep !== undefined) {
              const stepDescription = questData.actionPlan?.[requestContext.currentStep - 1];
              if (stepDescription) {
                contextInfo += `\n- Current Step: ${requestContext.currentStep} - ${stepDescription}`;
              }
            }
          }
        }

        enrichedPrompt = `${AURA_SYSTEM_PROMPT}\n\n${contextInfo}\n\nUser asks: ${prompt}`;
      }

      // Call Gemini API
      const result = await model.generateContent(enrichedPrompt);
      const response = result.response;
      const text = response.text();

      // Sanitize response (basic checks)
      const sanitizedText = sanitizeResponse(text);

      return { response: sanitizedText };
    } catch (error: any) {
      console.error('AURA response error:', error);
      throw new functions.https.HttpsError('internal', 'Failed to generate response');
    }
  }
);

function sanitizeResponse(text: string): string {
  // Remove any potential sensitive patterns
  // This is a basic implementation - production would be more thorough
  
  const sensitivePatterns = [
    /private\s+key/gi,
    /seed\s+phrase/gi,
    /mnemonic\s+phrase/gi,
  ];

  let sanitized = text;

  for (const pattern of sensitivePatterns) {
    if (pattern.test(sanitized)) {
      console.warn('Detected sensitive content in AI response');
      // If we detect sensitive content, return a safe fallback
      return "I apologize, but I cannot provide that information as it may compromise your security. Please never share your private keys or seed phrases with anyone, including me. Is there another way I can help you with your Web3 journey?";
    }
  }

  return sanitized;
}
