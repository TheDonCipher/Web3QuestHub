import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  userId: string;
  walletAddress: string;
  username: string;
  totalXP: number;
  explorerLevel: number;
  badgesEarned: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Mission {
  missionId: string;
  title: string;
  expeditionId: string;
  expeditionTitle: string;
  difficulty: number;
  xpReward: number;
  timeEstimate: string;
  platform: string;
  badge: Badge;
  lore: string;
  actionPlan: string[];
  verification: VerificationData;
  externalLink?: string;
  requiredLevel: number;
}

export interface Badge {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
}

export interface VerificationData {
  type: 'balance_check' | 'tx_history_check' | 'event_check' | 'manual';
  params: BalanceCheckParams | TxHistoryCheckParams | EventCheckParams;
}

export interface BalanceCheckParams {
  targetChainId: string;
  targetCurrency: string;
  minAmount: number;
}

export interface TxHistoryCheckParams {
  targetChainId: string;
  checkWindow: number;
}

export interface EventCheckParams {
  targetChainId: string;
  contractAddress: string;
  functionSignature: string;
  minAmountIn: number;
}

export interface MissionStatus {
  missionId: string;
  userId: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  earnedBadgeId?: string;
}

export interface Expedition {
  expeditionId: string;
  title: string;
  description: string;
  requiredLevel: number;
  missionIds: string[];
  order: number;
}

export interface LevelProgression {
  level: number;
  cumulativeXpRequired: number;
  title: string;
  unlockDescription: string;
}

export interface AuraMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Timestamp;
  activeMissionId?: string;
}

export interface HudSyncState {
  userId: string;
  activeMissionId?: string;
  currentUrl?: string;
  lastSync: Timestamp;
}
