'use client';

import React from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';
import { PixelBadge, BadgeGrid } from '@/components/ui/PixelBadge';
import { cn } from '@/lib/utils/cn';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

interface BadgeCollectionProps {
  earnedBadges: string[];
  className?: string;
}

// All possible badges in the system
const ALL_BADGES: Badge[] = [
  {
    id: 'portal_holder',
    name: 'PORTAL HOLDER',
    description: 'Created your first MetaMask wallet',
    icon: '🔑',
    rarity: 'common',
  },
  {
    id: 'hud_ready',
    name: 'HUD READY',
    description: 'Installed the Quest Hub extension',
    icon: '🎮',
    rarity: 'common',
  },
  {
    id: 'refueler',
    name: 'REFUELER',
    description: 'Acquired testnet tokens',
    icon: '⚡',
    rarity: 'common',
  },
  {
    id: 'bridge_operator',
    name: 'BRIDGE OPERATOR',
    description: 'Bridged funds between networks',
    icon: '💰',
    rarity: 'uncommon',
  },
  {
    id: 'gold_prospector',
    name: 'GOLD PROSPECTOR',
    description: 'Purchased cryptocurrency',
    icon: '🌟',
    rarity: 'rare',
  },
  {
    id: 'trader',
    name: 'OUTPOST TRADER',
    description: 'Completed a token swap',
    icon: '💎',
    rarity: 'rare',
  },
  {
    id: 'nft_collector',
    name: 'NFT COLLECTOR',
    description: 'Minted your first NFT',
    icon: '🎨',
    rarity: 'epic',
  },
  {
    id: 'dao_member',
    name: 'DAO CITIZEN',
    description: 'Joined a DAO and voted',
    icon: '🏛️',
    rarity: 'epic',
  },
  {
    id: 'defi_master',
    name: 'DEFI MASTER',
    description: 'Used 5+ DeFi protocols',
    icon: '🚀',
    rarity: 'legendary',
  },
  {
    id: 'pioneer',
    name: 'PIONEER',
    description: 'Completed all expeditions',
    icon: '⭐',
    rarity: 'legendary',
  },
  {
    id: 'mystery_1',
    name: '???',
    description: 'Hidden achievement',
    icon: '❓',
    rarity: 'rare',
  },
  {
    id: 'mystery_2',
    name: '???',
    description: 'Hidden achievement',
    icon: '❓',
    rarity: 'legendary',
  },
];

export function BadgeCollection({ earnedBadges, className }: BadgeCollectionProps) {
  const badgesWithStatus = ALL_BADGES.map((badge) => ({
    ...badge,
    locked: !earnedBadges.includes(badge.id),
  }));

  const earnedCount = earnedBadges.length;
  const totalCount = ALL_BADGES.length;
  const progressPercentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <PixelCard variant="terminal" className={cn('scanline-overlay', className)}>
      <PixelCardBody>
        {/* Header */}
        <div className="mb-6">
          <h3 className="pixel-text-xl text-glow-green mb-2 flex items-center gap-2">
            <span>🏆</span>
            <span>ARTIFACT COLLECTION</span>
          </h3>
          <p className="pixel-text-sm text-[var(--text-tertiary)]">
            COLLECT ALL BADGES TO BECOME A FRONTIER CITIZEN
          </p>
        </div>

        {/* Badge Grid */}
        <BadgeGrid
          badges={badgesWithStatus}
          columns={4}
          onBadgeClick={(badgeId) => {
            console.log('Badge clicked:', badgeId);
          }}
          className="mb-6"
        />

        {/* Collection Progress */}
        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="relative h-6 bg-[var(--void-black)] border-2 border-[var(--terminal-green)]">
            <div
              className="absolute inset-0 bg-[var(--terminal-green)]"
              style={{
                width: `${progressPercentage}%`,
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  currentColor 0px,
                  currentColor 4px,
                  transparent 4px,
                  transparent 8px
                )`,
              }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center">
            <span className="pixel-text-sm text-[var(--text-secondary)]">
              {earnedCount}/{totalCount} BADGES COLLECTED
            </span>
            <span className="pixel-text-sm text-[var(--terminal-green)]">
              {progressPercentage}%
            </span>
          </div>

          {/* Rarity Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-4 border-t-2 border-[var(--terminal-surface)]">
            {['common', 'uncommon', 'rare', 'epic', 'legendary'].map((rarity) => {
              const earned = badgesWithStatus.filter(
                (b) => b.rarity === rarity && !b.locked
              ).length;
              const total = badgesWithStatus.filter((b) => b.rarity === rarity).length;

              return (
                <div
                  key={rarity}
                  className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-2 text-center"
                >
                  <p className="pixel-text-sm text-[var(--text-tertiary)] mb-1">
                    {rarity.toUpperCase()}
                  </p>
                  <p className="pixel-text-base text-[var(--text-primary)]">
                    {earned}/{total}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </PixelCardBody>
    </PixelCard>
  );
}
