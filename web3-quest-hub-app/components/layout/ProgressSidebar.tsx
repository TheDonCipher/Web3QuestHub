'use client';

import React from 'react';
import { User } from '@/lib/types';
import { getProgressToNextLevel, getLevelTitle } from '@/lib/utils/xp-calculator';

interface ProgressSidebarProps {
  user: User;
}

export default function ProgressSidebar({ user }: ProgressSidebarProps) {
  const progress = getProgressToNextLevel(user.totalXP);
  const levelTitle = getLevelTitle(user.explorerLevel);

  return (
    <div className="w-64 cyber-border rounded-lg p-6 bg-black/50">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-500 mb-1">Level {user.explorerLevel}</h2>
        <p className="text-sm text-gray-400">{levelTitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>XP Progress</span>
          <span className="text-cyan-500">{Math.round(progress.percentage)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {progress.currentLevelXP} / {progress.nextLevelXP} XP
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Total XP</p>
          <p className="text-xl font-bold text-cyan-500">{user.totalXP}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Wallet Status</p>
          {user.walletAddress ? (
            <p className="text-xs text-green-500 font-mono">
              {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
            </p>
          ) : (
            <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-medium">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
