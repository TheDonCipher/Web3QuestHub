'use client';

import React from 'react';
import { CircularPixelProgress, PixelProgressBar } from '@/components/ui/PixelProgressBar';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { cn } from '@/lib/utils/cn';
import type { UserProfile } from '@/types';

interface ProgressSidebarProps {
  profile: UserProfile | null;
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

export function ProgressSidebar({ profile, className }: ProgressSidebarProps) {
  if (!profile) {
    return (
      <aside className={cn('w-full lg:w-80', className)}>
        <PixelCard variant="terminal">
          <PixelCardBody>
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-[var(--terminal-surface)] w-3/4"></div>
              <div className="h-4 bg-[var(--terminal-surface)] w-1/2"></div>
              <div className="h-2 bg-[var(--terminal-surface)] w-full"></div>
            </div>
          </PixelCardBody>
        </PixelCard>
      </aside>
    );
  }

  const currentLevel = profile.explorerLevel;
  const nextLevel = currentLevel + 1;
  const currentLevelXP = LEVEL_XP_THRESHOLDS[currentLevel] || 0;
  const nextLevelXP = LEVEL_XP_THRESHOLDS[nextLevel] || 15000;
  const xpInCurrentLevel = profile.totalXP - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

  const getLevelTitle = (level: number): string => {
    const titles: Record<number, string> = {
      1: 'Newbie',
      2: 'Cadet',
      3: 'Apprentice',
      4: 'Wanderer',
      5: 'Trader',
      6: 'Collector',
      7: 'Guardian',
      8: 'Architect',
      9: 'Veteran',
      10: 'Frontier Citizen',
    };
    return titles[level] || 'Explorer';
  };

  const getNextUnlock = (level: number): string => {
    const unlocks: Record<number, string> = {
      2: 'Unlocks Logbook history view',
      3: 'Unlocks AURA Security Health Check',
      4: 'Unlocks Trading Outpost Expedition',
      5: 'Unlocks Leaderboard & Filters',
      6: 'Unlocks Artifact Quarter Expedition',
      7: 'Unlocks Custom Profile Tag',
      8: 'Unlocks Advanced Wallet Analysis',
      9: 'Unlocks Dashboard Theme Selector',
      10: 'Unlocks High Security Zone',
    };
    return unlocks[level] || 'More adventures await!';
  };

  return (
    <aside className={cn('w-full lg:w-80 space-y-4', className)}>
      {/* Level Progress Card */}
      <PixelCard variant="terminal" className="scanline-overlay">
        <PixelCardBody className="space-y-4">
          {/* Circular Progress */}
          <div className="flex flex-col items-center">
            <CircularPixelProgress
              level={currentLevel}
              current={xpInCurrentLevel}
              max={xpNeededForNextLevel}
              size={120}
            />
            <div className="mt-4 text-center">
              <h2 className="pixel-text-lg text-[var(--text-primary)]">
                {getLevelTitle(currentLevel).toUpperCase()}
              </h2>
              <p className="pixel-text-base text-[var(--text-secondary)] mt-1">
                @{profile.username}
              </p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="pixel-text-base text-[var(--text-secondary)] font-bold">
                {xpInCurrentLevel.toLocaleString()} XP
              </span>
              <span className="pixel-text-base text-[var(--text-secondary)]">
                {xpNeededForNextLevel.toLocaleString()} XP
              </span>
            </div>
            <PixelProgressBar
              current={xpInCurrentLevel}
              max={xpNeededForNextLevel}
              variant="green"
              size="md"
              showPercentage={true}
            />
            <p className="pixel-text-base text-[var(--text-secondary)] text-center mt-2 font-bold">
              ▲ {xpNeededForNextLevel - xpInCurrentLevel} XP TO LVL {nextLevel}
            </p>
          </div>
        </PixelCardBody>
      </PixelCard>

      {/* Quick Stats Panel */}
      <PixelCard variant="default">
        <PixelCardBody>
          <h3 className="pixel-text-base text-[var(--text-secondary)] mb-3 pb-2 border-b-2 border-[var(--terminal-surface)]">
            QUICK STATS
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)]">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <span className="pixel-text-base text-[var(--text-secondary)] font-bold">MISSIONS</span>
              </div>
              <span className="pixel-text-base text-[var(--terminal-green)]">6</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)]">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏆</span>
                <span className="pixel-text-base text-[var(--text-secondary)] font-bold">BADGES</span>
              </div>
              <span className="pixel-text-base text-[var(--terminal-green)]">{profile.badgesEarned.length}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)]">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="pixel-text-base text-[var(--text-secondary)] font-bold">STREAK</span>
              </div>
              <span className="pixel-text-base text-[var(--terminal-green)]">7</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)]">
              <div className="flex items-center gap-2">
                <span className="text-lg">⏱️</span>
                <span className="pixel-text-base text-[var(--text-secondary)] font-bold">TIME</span>
              </div>
              <span className="pixel-text-base text-[var(--terminal-green)]">8H</span>
            </div>
          </div>
        </PixelCardBody>
      </PixelCard>

      {/* AURA AI Button */}
      <PixelButton
        variant="primary"
        size="lg"
        className="w-full bg-gradient-to-r from-[var(--voxel-purple)] to-[var(--cyber-magenta)] border-[var(--cyber-magenta)] hover:from-[var(--cyber-magenta)] hover:to-[var(--voxel-purple)]"
        onClick={() => {
          // TODO: Open AURA AI widget
          console.log('AURA AI clicked');
        }}
      >
        <span className="flex items-center gap-2 justify-center">
          <span className="text-lg">🤖</span>
          <div className="text-left">
            <div className="text-[10px] leading-tight">AURA.EXE</div>
            <div className="text-[8px] opacity-80 leading-tight">ASK AI</div>
          </div>
        </span>
      </PixelButton>

      {/* Next Unlock Info */}
      {nextLevel <= 10 && (
        <PixelCard variant="default" className="bg-gradient-to-br from-[var(--void-black)] to-[var(--pixel-dark)]">
          <PixelCardBody>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔓</span>
                <h3 className="pixel-text-base text-[var(--blockchain-blue)] font-bold">NEXT UNLOCK</h3>
              </div>
              <p className="pixel-text-lg text-[var(--text-primary)]">LEVEL {nextLevel}</p>
              <p className="pixel-text-base text-[var(--text-secondary)] leading-relaxed">
                {getNextUnlock(nextLevel)}
              </p>
              <div className="pt-3 border-t-2 border-[var(--terminal-surface)]">
                <p className="pixel-text-base text-[var(--text-secondary)]">
                  <span className="text-[var(--warning-orange)]">{xpNeededForNextLevel - xpInCurrentLevel} XP</span> REMAINING
                </p>
              </div>
            </div>
          </PixelCardBody>
        </PixelCard>
      )}

      {/* Recent Badges */}
      {profile.badgesEarned.length > 0 && (
        <PixelCard variant="default">
          <PixelCardBody>
            <h3 className="pixel-text-base text-[var(--text-secondary)] mb-3 pb-2 border-b-2 border-[var(--terminal-surface)]">
              RECENT BADGES
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {profile.badgesEarned.slice(0, 4).map((badgeId, index) => (
                <div
                  key={badgeId}
                  className="aspect-square bg-[var(--void-black)] border-4 border-[var(--dao-gold)] flex items-center justify-center animate-badge-glow cursor-pointer hover:scale-110 transition-transform"
                  title={badgeId}
                >
                  <span className="text-2xl">🏆</span>
                </div>
              ))}
            </div>
            <p className="pixel-text-base text-[var(--text-secondary)] text-center mt-3">
              {profile.badgesEarned.length}/12 COLLECTED
            </p>
          </PixelCardBody>
        </PixelCard>
      )}
    </aside>
  );
}
