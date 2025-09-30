import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { User, Quest, UserQuest, Level } from '../types';

// User Profile Operations
export const getUserProfile = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return { userId, ...userSnap.data() } as User;
  }
  return null;
};

export const updateUserProfile = async (
  userId: string,
  data: Partial<User>
) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

// Quest Operations
export const getQuests = async (): Promise<Quest[]> => {
  const questsRef = collection(db, 'quests');
  const querySnapshot = await getDocs(questsRef);
  
  return querySnapshot.docs.map(doc => ({
    questId: doc.id,
    ...doc.data(),
  } as Quest));
};

export const getQuestById = async (questId: string): Promise<Quest | null> => {
  const questRef = doc(db, 'quests', questId);
  const questSnap = await getDoc(questRef);
  
  if (questSnap.exists()) {
    return { questId, ...questSnap.data() } as Quest;
  }
  return null;
};

// User Quest Operations
export const getUserQuests = async (userId: string): Promise<UserQuest[]> => {
  const userQuestsRef = collection(db, 'userQuests', userId, 'quests');
  const querySnapshot = await getDocs(userQuestsRef);
  
  return querySnapshot.docs.map(doc => ({
    questId: doc.id,
    ...doc.data(),
  } as UserQuest));
};

export const updateUserQuest = async (
  userId: string,
  questId: string,
  data: Partial<UserQuest>
) => {
  const userQuestRef = doc(db, 'userQuests', userId, 'quests', questId);
  await updateDoc(userQuestRef, data);
};

// Level Operations
export const getLevels = async (): Promise<Level[]> => {
  const levelsRef = collection(db, 'levels');
  const q = query(levelsRef, orderBy('cumulativeXpRequired'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    levelNumber: parseInt(doc.id),
    ...doc.data(),
  } as Level));
};
