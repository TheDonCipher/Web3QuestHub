'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import type { Expedition } from '@/types';

interface ExpeditionSelectorProps {
  expeditions: Expedition[];
  activeExpeditionId: string;
  userLevel: number;
  onSelectExpedition: (expeditionId: string) => void;
  className?: string;
}

export function ExpeditionSelector({
  expeditions,
  activeExpeditionId,
  userLevel,
  onSelectExpedition,
  className,
}: ExpeditionSelectorProps) {
  const getExpeditionIcon = (expeditionId: string) => {
    const icons: Record<string, string> = {
      'digital_frontier': '🚀',
      'trading_outpost': '💰',
      'artifact_quarter': '🎨',
    };
    return icons[expeditionId] || '🌐';
  };

  return (
    <nav className={cn('flex gap-4 overflow-x-auto pb-2', className)}>
      {expeditions.map((expedition) => {
        const isActive = expedition.expeditionId === activeExpeditionId;
        const isLocked = userLevel < expedition.requiredLevel;

        return (
          <button
            key={expedition.expeditionId}
            onClick={() => !isLocked && onSelectExpedition(expedition.expeditionId)}
            disabled={isLocked}
            className={cn(
              'flex-1 min-w-[200px] md:min-w-0',
              'flex flex-col items-center gap-3',
              'p-4 border-4 transition-all',
              'bg-[var(--pixel-dark)]',
              isActive && !isLocked && 'border-[var(--terminal-green)] pixel-shadow-glow-green',
              !isActive && !isLocked && 'border-[var(--terminal-surface)] hover:border-[var(--blockchain-blue)]',
              isLocked && 'border-[var(--terminal-surface)] opacity-50 cursor-not-allowed',
              !isLocked && 'cursor-pointer'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'text-4xl transition-transform',
                isActive && !isLocked && 'animate-icon-float',
                isLocked && 'grayscale'
              )}
            >
              {isLocked ? '🔒' : getExpeditionIcon(expedition.expeditionId)}
            </div>

            {/* Title */}
            <div className="text-center">
              <h3
                className={cn(
                  'pixel-text-base',
                  isActive && !isLocked && 'text-[var(--terminal-green)]',
                  !isActive && !isLocked && 'text-[var(--text-secondary)]',
                  isLocked && 'text-[var(--text-tertiary)]'
                )}
              >
                {expedition.title.toUpperCase()}
              </h3>
              {isLocked && (
                <p className="pixel-text-sm text-[var(--error-red)] mt-1">
                  LVL {expedition.requiredLevel}
                </p>
              )}
            </div>

            {/* Active Indicator */}
            {isActive && !isLocked && (
              <div className="w-full h-1 bg-[var(--terminal-green)]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
