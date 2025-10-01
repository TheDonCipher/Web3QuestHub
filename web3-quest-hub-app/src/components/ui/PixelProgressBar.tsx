'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'green' | 'cyan' | 'purple' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PixelProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  variant = 'green',
  size = 'md',
  className,
}: PixelProgressBarProps) {
  const percentage = Math.min(Math.round((current / max) * 100), 100);
  
  const variantStyles = {
    green: 'bg-[var(--terminal-green)] border-[var(--success-green)]',
    cyan: 'bg-[var(--blockchain-blue)] border-[var(--active-cyan)]',
    purple: 'bg-[var(--voxel-purple)] border-[var(--cyber-magenta)]',
    gold: 'bg-[var(--dao-gold)] border-[#ffed4e]',
  };
  
  const sizeStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };
  
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="pixel-text-base text-[var(--text-secondary)] font-bold">{label}</span>
          <span className="pixel-text-base text-[var(--text-primary)] font-bold">
            {current.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      
      <div
        className={cn(
          'relative bg-[var(--terminal-surface)] border-2 border-[var(--text-tertiary)] overflow-hidden',
          sizeStyles[size]
        )}
      >
        {/* Segmented fill */}
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            variantStyles[variant],
            'bg-[length:8px_100%]'
          )}
          style={{
            width: `${percentage}%`,
            backgroundImage: `repeating-linear-gradient(
              90deg,
              currentColor 0px,
              currentColor 4px,
              transparent 4px,
              transparent 8px
            )`,
          }}
        >
          {showPercentage && size !== 'sm' && (
            <div className="absolute inset-0 flex items-center justify-end pr-3">
              <span className="pixel-text-base font-bold text-black" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.8), -1px -1px 0 rgba(255,255,255,0.3)' }}>
                {percentage}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CircularPixelProgressProps {
  level: number;
  current: number;
  max: number;
  size?: number;
  className?: string;
}

export function CircularPixelProgress({
  level,
  current,
  max,
  size = 120,
  className,
}: CircularPixelProgressProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className={cn('relative inline-block', className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--terminal-surface)"
          strokeWidth="8"
        />
        {/* Progress ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--terminal-green)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          transform="rotate(-90 50 50)"
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Level number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="pixel-text-2xl text-[var(--terminal-green)]">{level}</span>
        <span className="pixel-text-base text-[var(--text-secondary)] mt-1">LVL</span>
      </div>
    </div>
  );
}
