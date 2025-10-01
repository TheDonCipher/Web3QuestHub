'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function PixelButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: PixelButtonProps) {
  const baseStyles = 'pixel-button font-bold uppercase';
  
  const variantStyles = {
    primary: 'bg-[var(--blockchain-blue)] border-[var(--active-cyan)] text-black hover:bg-[var(--active-cyan)]',
    secondary: 'bg-[var(--terminal-surface)] border-[var(--text-tertiary)] text-white hover:border-[var(--blockchain-blue)]',
    success: 'bg-[var(--terminal-green)] border-[var(--success-green)] text-black hover:bg-[var(--success-green)]',
    danger: 'bg-[var(--error-red)] border-[var(--burn-red)] text-white hover:bg-[var(--burn-red)]',
    warning: 'bg-[var(--warning-orange)] border-[var(--dao-gold)] text-black hover:bg-[var(--dao-gold)]',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-3 text-[10px]',
    md: 'px-6 py-3 text-[12px]',
    lg: 'px-8 py-4 text-[14px]',
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        'pixel-shadow',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-pulse">▓</span>
          <span>LOADING...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
