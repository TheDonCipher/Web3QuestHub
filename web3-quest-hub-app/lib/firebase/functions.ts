import { httpsCallable } from 'firebase/functions';
import { functions } from './config';

// Type definitions for function requests and responses
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

interface AuraRequest {
  prompt: string;
  context: {
    questId?: string;
    currentStep?: number;
  };
}

interface AuraResponse {
  response: string;
}

// Callable Functions
export const verifyMissionCompletion = httpsCallable<
  VerifyMissionRequest,
  VerifyMissionResponse
>(functions, 'verifyMissionCompletion');

export const getAuraResponse = httpsCallable<AuraRequest, AuraResponse>(
  functions,
  'getAuraResponse'
);
