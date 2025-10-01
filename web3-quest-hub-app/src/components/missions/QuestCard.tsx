'use client';

import React from 'react';
import { PixelCard, PixelCardHeader, PixelCardBody, PixelCardFooter } from '@/components/ui/PixelCard';
import { cn } from '@/lib/utils/cn';
import type { Mission, MissionStatus } from '@/types';

interface QuestCardProps {
  mission: Mission;
  status: MissionStatus['status'];
  onClick: () => void;
  className?: string;
}

export function QuestCard({ mission, status, onClick, className }: QuestCardProps) {
  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(Math.min(difficulty, 3));
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty === 1) return 'BEGINNER';
    if (difficulty === 2) return 'INTERMEDIATE';
    return 'ADVANCED';
  };

  const getMissionIcon = (platform: string) => {
    const icons: Record<string, string> = {
      'MetaMask': '🔑',
      'Faucet': '⚡',
      'Bridge': '💰',
      'Swap': '🔄',
      'NFT': '🎨',
      'DAO': '🏛️',
      'Base': '🌐',
      'Testnet': '⚡',
    };
    return icons[platform] || '🎯';
  };

  // Card states styling
  const getCardStyles = () => {
    switch (status) {
      case 'completed':
        return {
          card: 'border-[var(--terminal-green)] opacity-80',
          header: 'bg-[var(--void-black)] border-b-4 border-[var(--terminal-green)]',
          badge: 'bg-[var(--terminal-green)] text-black',
          statusText: '✓ COMPLETE',
        };
      case 'in-progress':
        return {
          card: 'border-[var(--blockchain-blue)] animate-pixel-pulse',
          header: 'bg-[var(--void-black)] border-b-4 border-[var(--blockchain-blue)]',
          badge: 'bg-[var(--blockchain-blue)] text-black',
          statusText: '⚡ ACTIVE',
        };
      case 'locked':
        return {
          card: 'border-[var(--terminal-surface)] opacity-50 grayscale',
          header: 'bg-[var(--void-black)] border-b-4 border-[var(--terminal-surface)]',
          badge: 'bg-[var(--terminal-surface)] text-[var(--text-tertiary)]',
          statusText: '🔒 LOCKED',
        };
      default:
        return {
          card: 'border-[var(--terminal-surface)]',
          header: 'bg-[var(--void-black)] border-b-4 border-[var(--terminal-surface)]',
          badge: 'bg-[var(--blockchain-blue)] text-black',
          statusText: '▶ START',
        };
    }
  };

  const styles = getCardStyles();
  const isLocked = status === 'locked';

  return (
    <div
      className={cn(
        'holographic-card',
        styles.card,
        isLocked && 'cursor-not-allowed hover:transform-none',
        className
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Card Header with Icon */}
      <PixelCardHeader className={cn(styles.header, 'flex items-center justify-center h-32')}>
        <div className="text-6xl animate-icon-float">
          {isLocked ? '🔒' : getMissionIcon(mission.platform)}
        </div>
      </PixelCardHeader>

      {/* Card Body */}
      <PixelCardBody className="space-y-3">
        {/* Mission Title */}
        <h3 className="pixel-text-lg text-[var(--text-primary)] text-shadow-pixel leading-tight">
          {mission.title.toUpperCase()}
        </h3>

        {/* Mission Meta */}
        <div className="flex items-center justify-between pixel-text-base font-bold">
          <span className="text-[var(--text-secondary)]">
            {getDifficultyStars(mission.difficulty)} {getDifficultyLabel(mission.difficulty)}
          </span>
          <span className="text-[var(--dao-gold)]">
            +{mission.xpReward} XP
          </span>
        </div>

        {/* Time Estimate */}
        {mission.timeEstimate && (
          <div className="flex items-center gap-2 pixel-text-base text-[var(--text-secondary)]">
            <span>⏱️</span>
            <span>{mission.timeEstimate}</span>
          </div>
        )}

        {/* Badge Reward */}
        {mission.badge && (
          <div className="flex items-center gap-2 pixel-text-base text-[var(--voxel-purple)] font-bold">
            <span>🏆</span>
            <span>{mission.badge.name}</span>
          </div>
        )}
      </PixelCardBody>

      {/* Card Footer */}
      <PixelCardFooter>
        {isLocked ? (
          <div className="text-center pixel-text-base text-[var(--error-red)] font-bold">
            LEVEL {mission.requiredLevel} REQUIRED
          </div>
        ) : (
          <div className={cn(
            'pixel-text-base font-bold text-center py-2',
            styles.badge
          )}>
            {styles.statusText}
          </div>
        )}
      </PixelCardFooter>

      {/* Scanline overlay for active missions */}
      {status === 'in-progress' && (
        <div className="scanline-overlay pointer-events-none" />
      )}
    </div>
  );
}
