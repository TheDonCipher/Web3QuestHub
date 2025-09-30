import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Export all functions
export { verifyMissionCompletion } from './verifyMissionCompletion';
export { getAuraResponse } from './getAuraResponse';
