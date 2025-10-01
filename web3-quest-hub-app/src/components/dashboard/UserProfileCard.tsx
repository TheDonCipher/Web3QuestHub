'use client';

import React from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';
import { PixelProgressBar } from '@/components/ui/PixelProgressBar';
import { PixelAvatarGenerator } from '@/components/profile/PixelAvatarGenerator';
import type { UserProfile } from '@/types';

interface UserProfileCardProps {
  profile: UserProfile | null;
  className?: string;
}

export function UserProfileCard({ profile, className }: UserProfileCardProps) {
  if (!profile) return null;

  const currentLevel = profile.explorerLevel;
  const nextLevel = currentLevel + 1;
  const totalXP = profile.totalXP;
  
  // Calculate XP for current level
  const xpForCurrentLevel = currentLevel === 1 ? 0 : (currentLevel - 1) * 500;
  const xpForNextLevel = currentLevel * 500;
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  const getLevelTitle = (level: number) => {
    if (level < 5) return 'Novice Explorer';
    if (level < 10) return 'Skilled Navigator';
    if (level < 15) return 'Expert Pathfinder';
    if (level < 20) return 'Master Voyager';
    return 'Legendary Cartographer';
  };

  return (
    <PixelCard className={className}>
      <PixelCardBody className="space-y-6">
        {/* Avatar & Level */}
        <div className="flex flex-col items-center gap-4">
          {/* Avatar with Level Badge */}
          <div className="relative">
            <div className="w-32 h-32 border-4 border-[var(--terminal-green)] pixel-shadow-lg overflow-hidden">
              <PixelAvatarGenerator
                seed={profile.walletAddress}
                size={128}
              />
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-2 -right-2 bg-[var(--terminal-green)] text-black border-4 border-[var(--void-black)] px-3 py-1 pixel-text-base font-bold">
              LVL {currentLevel}
            </div>
          </div>

          {/* Name & XP */}
          <div className="text-center space-y-2">
            <h2 className="pixel-text-xl text-[var(--text-primary)] font-bold">
              {profile.username.toUpperCase()}
            </h2>
            <p className="pixel-text-base text-[var(--text-secondary)]">
              {totalXP.toLocaleString()} XP
            </p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">
              {getLevelTitle(currentLevel).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="pixel-text-base text-[var(--text-secondary)] font-bold">NEXT LEVEL</span>
            <span className="pixel-text-base text-[var(--terminal-green)] font-bold">{progressPercentage}%</span>
          </div>
          <PixelProgressBar
            current={xpInCurrentLevel}
            max={xpNeededForNextLevel}
            size="lg"
            showPercentage={false}
          />
          <p className="pixel-text-base text-center text-[var(--text-secondary)] font-bold">
            {(xpNeededForNextLevel - xpInCurrentLevel).toLocaleString()} XP TO LVL {nextLevel}
          </p>
        </div>
      </PixelCardBody>
    </PixelCard>
  );
}
