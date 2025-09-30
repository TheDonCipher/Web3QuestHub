'use client';

import React from 'react';
import { User } from '@/lib/types';
import { getProgressToNextLevel, getLevelTitle } from '@/lib/utils/xp-calculator';

interface XPCoreProps {
  user: User;
}

export default function XPCore({ user }: XPCoreProps) {
  const progress = getProgressToNextLevel(user.totalXP);
  const levelTitle = getLevelTitle(user.explorerLevel);

  return (
    <div className="cyber-border rounded-lg p-6 bg-black/50">
      <h2 className="text-2xl font-bold mb-6 text-center">XP Core</h2>

      <div className="flex flex-col items-center">
        {/* Circular progress indicator */}
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-800"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress.percentage / 100)}`}
              className="text-cyan-500 transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-5xl font-bold text-cyan-500">{user.explorerLevel}</p>
            <p className="text-sm text-gray-400">{levelTitle}</p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-500">{user.totalXP}</p>
            <p className="text-sm text-gray-400">Total XP</p>
          </div>

          <div className="text-center">
            <p className="text-lg">
              <span className="text-cyan-500">{progress.currentLevelXP}</span>
              <span className="text-gray-400"> / </span>
              <span className="text-gray-400">{progress.nextLevelXP}</span>
            </p>
            <p className="text-sm text-gray-400">XP to Next Level</p>
          </div>

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
