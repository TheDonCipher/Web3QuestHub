'use client';

import React from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';
import type { UserProfile } from '@/types';

interface StatsPanelProps {
  profile: UserProfile | null;
  className?: string;
}

export function StatsPanel({ profile, className }: StatsPanelProps) {
  if (!profile) return null;

  const stats = [
    {
      label: 'MISSIONS COMPLETED',
      value: profile.badgesEarned.length || 0,
      icon: '🎯',
    },
    {
      label: 'TOTAL XP EARNED',
      value: profile.totalXP.toLocaleString(),
      icon: '⚡',
    },
    {
      label: 'BADGES EARNED',
      value: profile.badgesEarned.length,
      icon: '🏆',
    },
    {
      label: 'CURRENT STREAK',
      value: '7 DAYS',
      icon: '🔥',
    },
  ];

  return (
    <PixelCard className={className}>
      <PixelCardBody>
        <h3 className="pixel-text-lg text-[var(--text-primary)] mb-4 font-bold">
          STATS
        </h3>
        
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] hover:border-[var(--terminal-green)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{stat.icon}</span>
                <p className="pixel-text-base text-[var(--text-secondary)]">
                  {stat.label}
                </p>
              </div>
              <p className="pixel-text-base text-[var(--text-primary)] font-bold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </PixelCardBody>
    </PixelCard>
  );
}
