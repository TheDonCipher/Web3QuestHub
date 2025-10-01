'use client';

import React from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';

interface QuickStatsProps {
  className?: string;
}

export function QuickStats({ className }: QuickStatsProps) {
  const stats = [
    { label: 'GOLD', value: '1500', icon: '💰', color: 'var(--dao-gold)' },
    { label: 'GEMS', value: '50', icon: '💎', color: 'var(--blockchain-blue)' },
  ];

  return (
    <PixelCard className={className}>
      <PixelCardBody>
        <h3 className="pixel-text-lg text-[var(--text-primary)] mb-4 font-bold">
          QUICK STATS
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--void-black)] border-4 border-[var(--terminal-surface)] p-4 text-center hover:border-[var(--terminal-green)] transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="pixel-text-sm text-[var(--text-secondary)] mb-2">
                {stat.label}
              </p>
              <p className="pixel-text-xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </PixelCardBody>
    </PixelCard>
  );
}
