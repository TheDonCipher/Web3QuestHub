import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  color?: 'blue' | 'green' | 'purple';
}

export function ProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  className,
  color = 'blue',
}: ProgressBarProps) {
  const percentage = Math.min(Math.round((current / max) * 100), 100);

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2 text-sm">
          {label && <span className="text-gray-700 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-gray-600">
              {current.toLocaleString()} / {max.toLocaleString()} XP
            </span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={cn('h-full transition-all duration-500 rounded-full', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
