import { Timestamp } from 'firebase/firestore';

export interface Badge {
  id: string;
  name: string;
  iconUrl: string;
}

export interface VerificationCriteria {
  type: 'balance_check' | 'tx_history_check' | 'event_check';
  params: {
    targetChainId?: number;
    tokenAddress?: string;
    minAmount?: number;
    toAddress?: string;
    fromAddress?: string;
    minValue?: number;
    contractAddress?: string;
    eventSignature?: string;
    userAddressParam?: string;
  };
}

export interface Quest {
  questId: string;
  title: string;
  expeditionId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  badge: Badge;
  lore: string;
  actionPlan: string[];
  verification: VerificationCriteria;
  whitelistedDomains?: string[];
}

export interface UserQuest {
  questId: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  completedAt: Timestamp | null;
  earnedBadgeId: string | null;
}

export interface Level {
  levelNumber: number;
  title: string;
  cumulativeXpRequired: number;
  unlockDescription: string;
}
