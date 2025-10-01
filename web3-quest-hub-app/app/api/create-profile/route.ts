import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    // Check if we have service account credentials
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Fallback: use application default credentials or project ID
      admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const db = admin.firestore();

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, username } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, message: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Check if profile already exists
    const profileRef = db.collection('user_profile').doc(walletAddress);
    const profileSnap = await profileRef.get();

    if (profileSnap.exists) {
      return NextResponse.json({
        success: true,
        message: 'Profile already exists',
        profile: profileSnap.data(),
      });
    }

    // Create new profile
    const newProfile = {
      userId: walletAddress,
      walletAddress,
      username: username || `Explorer_${walletAddress.slice(2, 8)}`,
      totalXP: 0,
      explorerLevel: 1,
      badgesEarned: [],
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    };

    await profileRef.set(newProfile);

    // Create initial mission status for the first mission
    const missionStatusRef = db.collection('mission_status').doc(`${walletAddress}_procure_test_fuel`);
    await missionStatusRef.set({
      userId: walletAddress,
      missionId: 'procure_test_fuel',
      status: 'available',
    });

    return NextResponse.json({
      success: true,
      message: 'Profile created successfully',
      profile: newProfile,
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { success: false, message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
