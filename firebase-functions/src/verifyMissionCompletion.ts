import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Alchemy, Network } from 'alchemy-sdk';

const db = admin.firestore();

// Initialize Alchemy SDK
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

interface VerifyMissionRequest {
  questId: string;
}

interface VerifyMissionResponse {
  success: boolean;
  xpGained: number;
  leveledUp: boolean;
  newLevel?: number;
  badge?: {
    id: string;
    name: string;
    iconUrl: string;
  };
}

// Level progression thresholds
const LEVEL_THRESHOLDS = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 500 },
  { level: 3, xpRequired: 1250 },
  { level: 4, xpRequired: 2250 },
  { level: 5, xpRequired: 3500 },
  { level: 6, xpRequired: 5000 },
  { level: 7, xpRequired: 6750 },
  { level: 8, xpRequired: 8750 },
  { level: 9, xpRequired: 11000 },
  { level: 10, xpRequired: 13500 },
];

const calculateLevel = (totalXP: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i].xpRequired) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  return 1;
};

export const verifyMissionCompletion = functions.https.onCall(
  async (
    data: VerifyMissionRequest,
    context: functions.https.CallableContext
  ): Promise<VerifyMissionResponse> => {
    // Ensure user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const userId = context.auth.uid;
    const { questId } = data;

    try {
      // Fetch user profile
      const userRef = db.collection('users').doc(userId);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        throw new functions.https.HttpsError('not-found', 'User profile not found');
      }

      const userData = userSnap.data()!;
      const walletAddress = userData.walletAddress;

      if (!walletAddress) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'Wallet address not set'
        );
      }

      // Fetch quest details
      const questRef = db.collection('quests').doc(questId);
      const questSnap = await questRef.get();

      if (!questSnap.exists) {
        throw new functions.https.HttpsError('not-found', 'Quest not found');
      }

      const questData = questSnap.data()!;
      const verification = questData.verification;

      // Perform on-chain verification
      let verificationPassed = false;

      switch (verification.type) {
        case 'balance_check':
          verificationPassed = await verifyBalance(
            walletAddress,
            verification.params
          );
          break;
        case 'tx_history_check':
          verificationPassed = await verifyTransactionHistory(
            walletAddress,
            verification.params
          );
          break;
        case 'event_check':
          verificationPassed = await verifyEvent(
            walletAddress,
            verification.params
          );
          break;
        default:
          throw new functions.https.HttpsError(
            'invalid-argument',
            'Unknown verification type'
          );
      }

      if (!verificationPassed) {
        return {
          success: false,
          xpGained: 0,
          leveledUp: false,
        };
      }

      // Perform atomic Firestore transaction
      const result = await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);
        const currentData = userDoc.data()!;
        const currentXP = currentData.totalXP || 0;
        const currentLevel = currentData.explorerLevel || 1;

        const newTotalXP = currentXP + questData.xpReward;
        const newLevel = calculateLevel(newTotalXP);
        const leveledUp = newLevel > currentLevel;

        // Update user profile
        transaction.update(userRef, {
          totalXP: newTotalXP,
          explorerLevel: newLevel,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Update user quest status
        const userQuestRef = db
          .collection('userQuests')
          .doc(userId)
          .collection('quests')
          .doc(questId);

        transaction.set(userQuestRef, {
          status: 'completed',
          completedAt: admin.firestore.FieldValue.serverTimestamp(),
          earnedBadgeId: questData.badge?.id || null,
        });

        return {
          success: true,
          xpGained: questData.xpReward,
          leveledUp,
          newLevel: leveledUp ? newLevel : undefined,
          badge: questData.badge,
        };
      });

      return result;
    } catch (error: any) {
      console.error('Verification error:', error);
      throw new functions.https.HttpsError('internal', error.message);
    }
  }
);

// Verification helper functions
async function verifyBalance(
  walletAddress: string,
  params: any
): Promise<boolean> {
  try {
    // TODO: Implement actual balance check using Alchemy SDK
    // For now, return true as placeholder
    console.log('Verifying balance for:', walletAddress, params);
    
    if (params.tokenAddress === 'ETH') {
      const balance = await alchemy.core.getBalance(walletAddress);
      const balanceInEth = parseFloat(balance.toString()) / 1e18;
      return balanceInEth >= (params.minAmount || 0);
    } else {
      // Check ERC-20 token balance
      // TODO: Implement ERC-20 balance check
      return true;
    }
  } catch (error) {
    console.error('Balance verification error:', error);
    return false;
  }
}

async function verifyTransactionHistory(
  walletAddress: string,
  params: any
): Promise<boolean> {
  try {
    // TODO: Implement actual transaction history check
    console.log('Verifying transaction history for:', walletAddress, params);
    
    const history = await alchemy.core.getAssetTransfers({
      fromAddress: walletAddress,
      category: ['external', 'erc20', 'erc721', 'erc1155'],
      maxCount: 100,
    });

    // Check if there's a matching transaction
    // This is a simplified check - production code would be more thorough
    return history.transfers.length > 0;
  } catch (error) {
    console.error('Transaction history verification error:', error);
    return false;
  }
}

async function verifyEvent(
  walletAddress: string,
  params: any
): Promise<boolean> {
  try {
    // TODO: Implement actual event check
    console.log('Verifying event for:', walletAddress, params);
    
    // This would query contract event logs
    // For now, return true as placeholder
    return true;
  } catch (error) {
    console.error('Event verification error:', error);
    return false;
  }
}
