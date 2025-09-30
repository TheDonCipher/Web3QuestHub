import { Timestamp } from 'firebase/firestore';

export interface User {
  userId: string;
  displayName: string;
  email: string;
  walletAddress: string;
  totalXP: number;
  explorerLevel: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
