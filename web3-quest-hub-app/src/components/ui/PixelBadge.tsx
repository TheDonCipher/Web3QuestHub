'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelBadgeProps {
  icon: string;
  name: string;
  description?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function PixelBadge({
  icon,
  name,
  description,
  rarity = 'common',
  locked = false,
  size = 'md',
  onClick,
  className,
}: PixelBadgeProps) {
  const rarityColors = {
    common: 'border-[var(--terminal-surface)]',
    uncommon: 'border-[var(--terminal-green)]',
    rare: 'border-[var(--blockchain-blue)]',
    epic: 'border-[var(--voxel-purple)] animate-badge-glow',
    legendary: 'border-[var(--dao-gold)] animate-badge-glow',
  };
  
  const sizeStyles = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };
  
  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };
  
  return (
    <div
      className={cn(
        'relative group',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      title={description}
    >
      {/* Badge Container */}
      <div
        className={cn(
          'bg-[var(--void-black)] border-4 flex items-center justify-center transition-all',
          sizeStyles[size],
          locked ? 'opacity-30 grayscale' : rarityColors[rarity],
          onClick && !locked && 'hover:scale-110 hover:z-10'
        )}
      >
        {locked ? (
          <span className={cn(iconSizes[size])}>🔒</span>
        ) : (
          <span className={cn(iconSizes[size], 'animate-icon-float')}>{icon}</span>
        )}
      </div>
      
      {/* Badge Name */}
      {name && (
        <div className="mt-1 text-center">
          <span className={cn(
            'pixel-text-sm',
            locked ? 'text-[var(--text-tertiary)]' : 'text-[var(--text-secondary)]'
          )}>
            {locked ? '???' : name}
          </span>
        </div>
      )}
      
      {/* Tooltip on hover */}
      {!locked && description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
          <div className="bg-[var(--pixel-dark)] border-4 border-[var(--terminal-green)] p-3 min-w-[200px] pixel-shadow-lg">
            <p className="pixel-text-sm text-[var(--text-primary)] mb-1">{name}</p>
            <p className="pixel-text-sm text-[var(--text-secondary)]">{description}</p>
            <div className="mt-2 flex items-center gap-1">
              <span className="pixel-text-sm text-[var(--text-tertiary)]">RARITY:</span>
              <span className={cn(
                'pixel-text-sm uppercase',
                rarity === 'legendary' && 'text-[var(--dao-gold)]',
                rarity === 'epic' && 'text-[var(--voxel-purple)]',
                rarity === 'rare' && 'text-[var(--blockchain-blue)]',
                rarity === 'uncommon' && 'text-[var(--terminal-green)]',
                rarity === 'common' && 'text-[var(--text-secondary)]'
              )}>
                {rarity}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface BadgeGridProps {
  badges: Array<{
    id: string;
    icon: string;
    name: string;
    description?: string;
    rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    locked?: boolean;
  }>;
  columns?: 3 | 4 | 6;
  onBadgeClick?: (badgeId: string) => void;
  className?: string;
}

export function BadgeGrid({
  badges,
  columns = 6,
  onBadgeClick,
  className,
}: BadgeGridProps) {
  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
  };
  
  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {badges.map((badge) => (
        <PixelBadge
          key={badge.id}
          icon={badge.icon}
          name={badge.name}
          description={badge.description}
          rarity={badge.rarity}
          locked={badge.locked}
          onClick={onBadgeClick ? () => onBadgeClick(badge.id) : undefined}
        />
      ))}
    </div>
  );
}
