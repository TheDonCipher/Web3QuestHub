import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  // Create user profile in Firestore
  await createUserProfile(user.uid, displayName, email);

  return user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;

  // Check if this is a new user and create profile if needed
  // This would typically check if the user document exists first
  await createUserProfile(user.uid, user.displayName || 'Explorer', user.email || '');

  return user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

const createUserProfile = async (
  userId: string,
  displayName: string,
  email: string
) => {
  const userRef = doc(db, 'users', userId);
  
  await setDoc(userRef, {
    displayName,
    email,
    walletAddress: '',
    totalXP: 0,
    explorerLevel: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, { merge: true }); // merge: true prevents overwriting existing data
};
