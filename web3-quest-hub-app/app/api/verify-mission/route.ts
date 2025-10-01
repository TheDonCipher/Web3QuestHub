import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { doc, getDoc, updateDoc, increment, arrayUnion, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function POST(request: NextRequest) {
  try {
    const { userId, missionId } = await request.json();

    if (!userId || !missionId) {
      return NextResponse.json(
        { success: false, message: 'Missing userId or missionId' },
        { status: 400 }
      );
    }

    const missionDoc = await getDoc(doc(db, 'mission_catalog', missionId));
    if (!missionDoc.exists()) {
      return NextResponse.json(
        { success: false, message: 'Mission not found' },
        { status: 404 }
      );
    }

    const mission = missionDoc.data();
    const { verification, xpReward, badge } = mission;

    if (verification.type === 'balance_check') {
      const { targetChainId, targetCurrency, minAmount } = verification.params;
      
      const rpcUrl = targetChainId === '11155111' 
        ? 'https://rpc.sepolia.org'
        : `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
      
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      
      try {
        const balance = await provider.getBalance(userId);
        const balanceInEth = parseFloat(ethers.formatEther(balance));
        
        if (balanceInEth >= minAmount) {
          await updateDoc(doc(db, 'user_profile', userId), {
            totalXP: increment(xpReward),
            badgesEarned: arrayUnion(badge.id),
            updatedAt: Timestamp.now(),
          });

          const statusId = `${userId}_${missionId}`;
          await updateDoc(doc(db, 'mission_status', statusId), {
            status: 'completed',
            completedAt: Timestamp.now(),
            earnedBadgeId: badge.id,
          });

          return NextResponse.json({
            success: true,
            message: 'Mission completed successfully!',
            xpAwarded: xpReward,
            badgeId: badge.id,
          });
        } else {
          return NextResponse.json({
            success: false,
            message: `Insufficient balance. Required: ${minAmount} ETH, Current: ${balanceInEth.toFixed(4)} ETH`,
          });
        }
      } catch (error) {
        console.error('Blockchain verification error:', error);
        return NextResponse.json(
          { success: false, message: 'Failed to verify blockchain data' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: 'Unsupported verification type for MVP' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
