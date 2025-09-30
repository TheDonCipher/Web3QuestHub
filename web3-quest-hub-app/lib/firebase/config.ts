/**
 * WHAT: Firebase SDK Configuration
 * HOW: Initializes Firebase app with project credentials from environment variables
 * WHY: Central configuration for all Firebase services (Auth, Firestore, Functions, Analytics)
 * 
 * Security: Uses environment variables to protect sensitive configuration
 * Services: Authentication, Firestore Database, Cloud Functions, Analytics
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration is incomplete. Check your .env.local file.');
  console.error('Required: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID');
}

// Initialize Firebase (singleton pattern - only once)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const functions: Functions = getFunctions(app);

// Initialize Analytics (only in browser and when supported)
let analyticsInstance: Analytics | null = null;

if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analyticsInstance = getAnalytics(app);
    }
  }).catch(err => {
    console.warn('Analytics not supported:', err);
  });
}

export const analytics = analyticsInstance;

export default app;
