'use client';

import React from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { CircularPixelProgress, PixelProgressBar } from '@/components/ui/PixelProgressBar';
import { PixelAvatarGenerator, downloadAvatar } from './PixelAvatarGenerator';
import { BadgeCollection } from './BadgeCollection';
import { ActivityLogbook } from './ActivityLogbook';
import { cn } from '@/lib/utils/cn';
import type { UserProfile } from '@/types';

interface AvatarConsoleProps {
  profile: UserProfile;
  className?: string;
}

const LEVEL_XP_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 500,
  3: 1250,
  4: 2250,
  5: 3500,
  6: 5000,
  7: 6750,
  8: 8750,
  9: 11000,
  10: 13500,
};

export function AvatarConsole({ profile, className }: AvatarConsoleProps) {
  const currentLevel = profile.explorerLevel;
  const nextLevel = currentLevel + 1;
  const currentLevelXP = LEVEL_XP_THRESHOLDS[currentLevel] || 0;
  const nextLevelXP = LEVEL_XP_THRESHOLDS[nextLevel] || 15000;
  const xpInCurrentLevel = profile.totalXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  const progressPercentage = Math.min(
    Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100),
    100
  );

  const getLevelTitle = (level: number): string => {
    const titles: Record<number, string> = {
      1: 'NEWBIE',
      2: 'CADET',
      3: 'APPRENTICE',
      4: 'WANDERER',
      5: 'TRADER',
      6: 'COLLECTOR',
      7: 'GUARDIAN',
      8: 'ARCHITECT',
      9: 'VETERAN',
      10: 'FRONTIER CITIZEN',
    };
    return titles[level] || 'EXPLORER';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Profile Header */}
      <div className="terminal-window p-8 scanline-overlay">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <PixelAvatarGenerator seed={profile.userId} size={128} />
            <PixelButton
              variant="primary"
              size="sm"
              onClick={() => downloadAvatar(profile.userId, `${profile.username}-avatar.png`)}
            >
              DOWNLOAD AVATAR
            </PixelButton>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-6">
            {/* Name and Level */}
            <div>
              <h1 className="pixel-text-2xl text-glow-green mb-2">
                {getLevelTitle(currentLevel)}
              </h1>
              <p className="pixel-text-lg text-[var(--blockchain-blue)] mb-1">
                @{profile.username}
              </p>
              <p className="font-mono text-sm text-[var(--text-tertiary)] bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] px-3 py-2 inline-block">
                {formatAddress(profile.walletAddress)}
              </p>
            </div>

            {/* Level Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="pixel-text-base text-[var(--text-secondary)]">
                  LEVEL {currentLevel}
                </span>
                <span className="pixel-text-base text-[var(--text-primary)]">
                  {xpInCurrentLevel.toLocaleString()} / {xpNeededForNextLevel.toLocaleString()} XP
                </span>
              </div>
              <PixelProgressBar
                current={xpInCurrentLevel}
                max={xpNeededForNextLevel}
                variant="green"
                size="lg"
                showPercentage={true}
              />
              <p className="pixel-text-sm text-[var(--text-tertiary)] text-center">
                ▲ {(xpNeededForNextLevel - xpInCurrentLevel).toLocaleString()} XP TO LEVEL {nextLevel}
              </p>
            </div>

            {/* Profile Meta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3">
                <p className="pixel-text-sm text-[var(--text-tertiary)] mb-1">📊 JOINED</p>
                <p className="pixel-text-base text-[var(--text-primary)]">
                  {formatDate(profile.createdAt.toDate())}
                </p>
              </div>
              <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3">
                <p className="pixel-text-sm text-[var(--text-tertiary)] mb-1">🔥 STREAK</p>
                <p className="pixel-text-base text-[var(--text-primary)]">7 DAYS</p>
              </div>
              <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3">
                <p className="pixel-text-sm text-[var(--text-tertiary)] mb-1">🏅 RANK</p>
                <p className="pixel-text-base text-[var(--text-primary)]">#142</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PixelCard variant="terminal">
          <PixelCardBody className="text-center">
            <p className="text-4xl mb-2">🎯</p>
            <p className="pixel-text-xl text-[var(--terminal-green)] mb-1">6</p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">MISSIONS</p>
          </PixelCardBody>
        </PixelCard>

        <PixelCard variant="terminal">
          <PixelCardBody className="text-center">
            <p className="text-4xl mb-2">🏆</p>
            <p className="pixel-text-xl text-[var(--dao-gold)] mb-1">
              {profile.badgesEarned.length}
            </p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">BADGES</p>
          </PixelCardBody>
        </PixelCard>

        <PixelCard variant="terminal">
          <PixelCardBody className="text-center">
            <p className="text-4xl mb-2">⚡</p>
            <p className="pixel-text-xl text-[var(--blockchain-blue)] mb-1">
              {profile.totalXP.toLocaleString()}
            </p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">TOTAL XP</p>
          </PixelCardBody>
        </PixelCard>

        <PixelCard variant="terminal">
          <PixelCardBody className="text-center">
            <p className="text-4xl mb-2">⏱️</p>
            <p className="pixel-text-xl text-[var(--voxel-purple)] mb-1">8H</p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">TIME</p>
          </PixelCardBody>
        </PixelCard>
      </div>

      {/* Badge Collection */}
      <BadgeCollection earnedBadges={profile.badgesEarned} />

      {/* Activity Logbook */}
      <ActivityLogbook />
    </div>
  );
}
