'use client';

import React from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  avatar?: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
  className?: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    user: 'You',
    action: "Completed 'MetaMask Setup' mission",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    avatar: '🎯',
  },
  {
    id: '2',
    user: 'Explorer_7a4f',
    action: 'Reached Level 5',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    avatar: '⭐',
  },
  {
    id: '3',
    user: 'CryptoNinja',
    action: 'Earned Portal Holder badge',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    avatar: '🏆',
  },
  {
    id: '4',
    user: 'Web3Wizard',
    action: "Completed 'DeFi Basics' expedition",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    avatar: '✨',
  },
];

export function ActivityFeed({ activities = MOCK_ACTIVITIES, className }: ActivityFeedProps) {
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <PixelCard className={className}>
      <PixelCardBody>
        <h3 className="pixel-text-lg text-[var(--text-primary)] mb-4">
          ACTIVITY FEED
        </h3>
        
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] hover:border-[var(--blockchain-blue)] transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 flex-shrink-0 bg-[var(--void-black)] border-2 border-[var(--terminal-green)] flex items-center justify-center">
                <span className="text-xl">{activity.avatar}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="pixel-text-base text-[var(--text-primary)] font-bold truncate">
                  {activity.user}
                </p>
                <p className="pixel-text-base text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {activity.action}
                </p>
                <p className="pixel-text-sm text-[var(--text-tertiary)] mt-1">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PixelCardBody>
    </PixelCard>
  );
}
