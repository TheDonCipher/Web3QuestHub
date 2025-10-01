import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore';
import { db } from './config';
import type {
  UserProfile,
  Mission,
  MissionStatus,
  Expedition,
  LevelProgression,
  Badge,
} from '@/types';

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'user_profile', userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const createUserProfile = async (
  userId: string,
  walletAddress: string,
  username: string
): Promise<void> => {
  const userProfile: UserProfile = {
    userId,
    walletAddress,
    username,
    totalXP: 0,
    explorerLevel: 1,
    badgesEarned: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  
  await setDoc(doc(db, 'user_profile', userId), userProfile);
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  const docRef = doc(db, 'user_profile', userId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const getMissions = async (): Promise<Mission[]> => {
  const querySnapshot = await getDocs(collection(db, 'mission_catalog'));
  return querySnapshot.docs.map((doc) => doc.data() as Mission);
};

export const getMission = async (missionId: string): Promise<Mission | null> => {
  const docRef = doc(db, 'mission_catalog', missionId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as Mission;
  }
  return null;
};

export const getUserMissionStatus = async (
  userId: string,
  missionId: string
): Promise<MissionStatus | null> => {
  const statusId = `${userId}_${missionId}`;
  const docRef = doc(db, 'mission_status', statusId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as MissionStatus;
  }
  return null;
};

export const updateMissionStatus = async (
  userId: string,
  missionId: string,
  status: 'available' | 'in-progress' | 'completed',
  earnedBadgeId?: string
): Promise<void> => {
  const statusId = `${userId}_${missionId}`;
  const docRef = doc(db, 'mission_status', statusId);
  
  const updates: Partial<MissionStatus> = {
    status,
    userId,
    missionId,
  };
  
  if (status === 'in-progress') {
    updates.startedAt = Timestamp.now();
  } else if (status === 'completed') {
    updates.completedAt = Timestamp.now();
    if (earnedBadgeId) {
      updates.earnedBadgeId = earnedBadgeId;
    }
  }
  
  await setDoc(docRef, updates, { merge: true });
};

export const getExpeditions = async (): Promise<Expedition[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'expedition_catalog'), orderBy('order'))
  );
  return querySnapshot.docs.map((doc) => doc.data() as Expedition);
};

export const getLevelProgressionTable = async (): Promise<LevelProgression[]> => {
  const querySnapshot = await getDocs(
    query(collection(db, 'level_progression_table'), orderBy('level'))
  );
  return querySnapshot.docs.map((doc) => doc.data() as LevelProgression);
};

export const getBadge = async (badgeId: string): Promise<Badge | null> => {
  const docRef = doc(db, 'badge_catalog', badgeId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as Badge;
  }
  return null;
};
