/**
 * WHAT: Firebase Authentication Setup Helpers
 * HOW: Provides utility functions for authentication configuration
 * WHY: Centralize auth provider setup for Email/Password and Google Sign-In
 */

import { 
  GoogleAuthProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from './config';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Email sign-in error:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Create new user with email and password
 */
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  displayName?: string
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name if provided
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
    
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Email sign-up error:', error);
    return { user: null, error: error.message };
  }
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Sign-out error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset email
 */
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (user: User, updates: {
  displayName?: string;
  photoURL?: string;
}) => {
  try {
    await updateProfile(user, updates);
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Profile update error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Auth error messages
 */
export const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in cancelled.',
    'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};
