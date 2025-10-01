'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

type ExpeditionStatus = 'available' | 'active' | 'completed' | 'locked';

interface ExpeditionCardProps {
  title: string;
  status: ExpeditionStatus;
  imageUrl?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export function ExpeditionCard({
  title,
  status,
  imageUrl,
  icon = '🎯',
  onClick,
  className,
}: ExpeditionCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return {
          border: 'border-[var(--blockchain-blue)]',
          badge: 'bg-[var(--blockchain-blue)] text-black',
          label: 'ACTIVE',
          opacity: 'opacity-100',
        };
      case 'completed':
        return {
          border: 'border-[var(--terminal-surface)]',
          badge: 'bg-[var(--terminal-surface)] text-[var(--text-secondary)]',
          label: 'DONE',
          opacity: 'opacity-60',
        };
      case 'locked':
        return {
          border: 'border-[var(--terminal-surface)]',
          badge: 'bg-[var(--terminal-surface)] text-[var(--text-tertiary)]',
          label: 'LOCKED',
          opacity: 'opacity-40 grayscale',
        };
      default:
        return {
          border: 'border-[var(--terminal-surface)]',
          badge: '',
          label: '',
          opacity: 'opacity-100',
        };
    }
  };

  const styles = getStatusStyles();
  const isLocked = status === 'locked';

  return (
    <div
      className={cn(
        'group relative cursor-pointer overflow-hidden border-4 transition-all duration-300',
        styles.border,
        styles.opacity,
        isLocked && 'cursor-not-allowed',
        !isLocked && 'hover:scale-105 hover:pixel-shadow',
        className
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      {/* Background Image or Icon */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-[var(--pixel-dark)] to-[var(--void-black)] p-8 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ) : (
          <span className="text-6xl relative z-10 animate-icon-float">
            {isLocked ? '🔒' : icon}
          </span>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Scanline Effect */}
        {status === 'active' && (
          <div className="scanline-overlay" />
        )}
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-[var(--void-black)]/80 backdrop-blur-sm border-t-4 border-[var(--terminal-surface)]">
        <p className="pixel-text-base text-[var(--text-primary)] font-bold truncate">
          {title.toUpperCase()}
        </p>
      </div>

      {/* Status Badge */}
      {styles.label && (
        <div className={cn(
          'absolute top-2 right-2 px-3 py-1 border-2 border-black backdrop-blur-sm',
          'pixel-text-sm font-bold',
          styles.badge
        )}>
          {styles.label}
        </div>
      )}

      {/* Active Border Glow */}
      {status === 'active' && (
        <div className="absolute inset-0 pointer-events-none animate-pixel-pulse">
          <div className="absolute inset-0 border-4 border-[var(--blockchain-blue)]" />
        </div>
      )}
    </div>
  );
}
