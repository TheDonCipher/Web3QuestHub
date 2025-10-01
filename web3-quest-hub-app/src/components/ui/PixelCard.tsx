'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelCardProps {
  variant?: 'default' | 'terminal' | 'holographic';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PixelCard({
  variant = 'default',
  hover = false,
  children,
  className,
  onClick,
}: PixelCardProps) {
  const baseStyles = 'relative';
  
  const variantStyles = {
    default: 'bg-[var(--pixel-dark)] pixel-border',
    terminal: 'terminal-window',
    holographic: 'holographic-card',
  };
  
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hover && !onClick && 'transition-transform hover:scale-[1.02]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface PixelCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function PixelCardHeader({ children, className }: PixelCardHeaderProps) {
  return (
    <div
      className={cn(
        'p-4 bg-[var(--void-black)] border-b-4 border-[var(--terminal-surface)]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface PixelCardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function PixelCardBody({ children, className }: PixelCardBodyProps) {
  return (
    <div className={cn('p-4', className)}>
      {children}
    </div>
  );
}

interface PixelCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function PixelCardFooter({ children, className }: PixelCardFooterProps) {
  return (
    <div
      className={cn(
        'p-4 border-t-4 border-[var(--terminal-surface)]',
        className
      )}
    >
      {children}
    </div>
  );
}
