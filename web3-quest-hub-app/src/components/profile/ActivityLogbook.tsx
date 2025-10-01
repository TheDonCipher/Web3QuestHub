'use client';

import React, { useState } from 'react';
import { PixelCard, PixelCardBody } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { cn } from '@/lib/utils/cn';

type ActivityType = 'mission' | 'achievement' | 'levelup' | 'badge';
type FilterType = 'all' | ActivityType;

interface Activity {
  id: string;
  type: ActivityType;
  timestamp: Date;
  title: string;
  description?: string;
  xpGained?: number;
  icon: string;
}

interface ActivityLogbookProps {
  activities?: Activity[];
  className?: string;
}

// Mock activities for demo
const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'mission',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    title: 'FIAT BRIDGE',
    description: 'Started mission',
    icon: '▶',
  },
  {
    id: '2',
    type: 'achievement',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    title: 'METAMASK MODULE',
    description: 'Mission completed',
    xpGained: 150,
    icon: '+150 XP',
  },
  {
    id: '3',
    type: 'levelup',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    title: 'LEVEL UP!',
    description: 'Now LEVEL 4',
    icon: '⭐',
  },
  {
    id: '4',
    type: 'achievement',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    title: 'EXPEDITION 2',
    description: 'Unlocked',
    icon: '🔓',
  },
  {
    id: '5',
    type: 'achievement',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    title: 'PORTAL ACTIVATION',
    description: 'Mission completed',
    xpGained: 100,
    icon: '+100 XP',
  },
  {
    id: '6',
    type: 'mission',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    title: 'PORTAL ACTIVATION',
    description: 'Started mission',
    icon: '🎯',
  },
  {
    id: '7',
    type: 'badge',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    title: 'PORTAL HOLDER',
    description: 'Badge earned',
    icon: '🏆',
  },
];

export function ActivityLogbook({ activities = MOCK_ACTIVITIES, className }: ActivityLogbookProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [visibleCount, setVisibleCount] = useState(10);

  const filters: Array<{ id: FilterType; label: string; icon: string }> = [
    { id: 'all', label: 'ALL', icon: '📋' },
    { id: 'mission', label: 'MISSIONS', icon: '🎯' },
    { id: 'achievement', label: 'ACHIEVEMENTS', icon: '✓' },
    { id: 'levelup', label: 'LEVEL UPS', icon: '⭐' },
  ];

  const filteredActivities = activities.filter((activity) => {
    if (activeFilter === 'all') return true;
    return activity.type === activeFilter;
  });

  const visibleActivities = filteredActivities.slice(0, visibleCount);
  const hasMore = visibleCount < filteredActivities.length;

  const getTimeAgo = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}D AGO`;
    if (hours > 0) return `${hours}H AGO`;
    return 'JUST NOW';
  };

  const getActivityStyle = (type: ActivityType) => {
    switch (type) {
      case 'levelup':
        return 'border-l-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)]';
      case 'mission':
        return 'border-l-[var(--blockchain-blue)] bg-[rgba(0,217,255,0.05)]';
      case 'achievement':
        return 'border-l-[var(--dao-gold)] bg-[rgba(255,215,0,0.05)]';
      case 'badge':
        return 'border-l-[var(--voxel-purple)] bg-[rgba(168,85,247,0.05)]';
      default:
        return 'border-l-[var(--terminal-surface)]';
    }
  };

  return (
    <PixelCard variant="terminal" className={cn('scanline-overlay', className)}>
      <PixelCardBody>
        {/* Header */}
        <div className="mb-6">
          <h3 className="pixel-text-xl text-glow-cyan mb-2 flex items-center gap-2">
            <span>📖</span>
            <span>THE LOGBOOK</span>
          </h3>
          <p className="pixel-text-sm text-[var(--text-tertiary)]">
            YOUR JOURNEY THROUGH THE DIGITAL FRONTIER
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 border-2 transition-all whitespace-nowrap',
                'pixel-text-sm',
                activeFilter === filter.id
                  ? 'bg-[var(--blockchain-blue)] border-[var(--active-cyan)] text-black'
                  : 'bg-[var(--void-black)] border-[var(--terminal-surface)] text-[var(--text-secondary)] hover:border-[var(--blockchain-blue)]'
              )}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Activity Timeline */}
        <div className="space-y-3 mb-6">
          {visibleActivities.length === 0 ? (
            <div className="text-center py-12 bg-[var(--void-black)] border-2 border-[var(--terminal-surface)]">
              <p className="pixel-text-base text-[var(--text-tertiary)]">
                NO ACTIVITIES YET
              </p>
            </div>
          ) : (
            visibleActivities.map((activity) => (
              <div
                key={activity.id}
                className={cn(
                  'flex gap-3 p-3 border-2 border-l-8 transition-all hover:border-[var(--blockchain-blue)]',
                  getActivityStyle(activity.type)
                )}
              >
                {/* Timestamp */}
                <div className="flex-shrink-0 w-16">
                  <span className="pixel-text-sm text-[var(--text-tertiary)]">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0 w-12 text-center">
                  <span className="pixel-text-base">{activity.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {activity.description && (
                    <p className="pixel-text-sm text-[var(--text-tertiary)] mb-1">
                      {activity.description}
                    </p>
                  )}
                  <p className="pixel-text-base text-[var(--text-primary)]">
                    <strong>{activity.title}</strong>
                  </p>
                  {activity.xpGained && (
                    <p className="pixel-text-sm text-[var(--dao-gold)] mt-1">
                      +{activity.xpGained} XP
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <PixelButton
            variant="secondary"
            size="md"
            onClick={() => setVisibleCount(visibleCount + 10)}
            className="w-full"
          >
            LOAD MORE ENTRIES
          </PixelButton>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t-2 border-[var(--terminal-surface)]">
          <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3 text-center">
            <p className="pixel-text-xl text-[var(--terminal-green)] mb-1">
              {activities.filter((a) => a.type === 'mission').length}
            </p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">MISSIONS</p>
          </div>
          <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3 text-center">
            <p className="pixel-text-xl text-[var(--dao-gold)] mb-1">
              {activities.filter((a) => a.xpGained).reduce((sum, a) => sum + (a.xpGained || 0), 0)}
            </p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">TOTAL XP</p>
          </div>
          <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3 text-center">
            <p className="pixel-text-xl text-[var(--voxel-purple)] mb-1">
              {activities.filter((a) => a.type === 'badge').length}
            </p>
            <p className="pixel-text-sm text-[var(--text-tertiary)]">BADGES</p>
          </div>
        </div>
      </PixelCardBody>
    </PixelCard>
  );
}
