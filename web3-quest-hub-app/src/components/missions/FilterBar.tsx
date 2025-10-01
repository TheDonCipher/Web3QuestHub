'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

type FilterType = 'all' | 'in-progress' | 'completed' | 'available';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
}

export function FilterBar({ activeFilter, onFilterChange, className }: FilterBarProps) {
  const filters: Array<{ id: FilterType; label: string; icon: string }> = [
    { id: 'all', label: 'ALL', icon: '📋' },
    { id: 'available', label: 'AVAILABLE', icon: '▶' },
    { id: 'in-progress', label: 'ACTIVE', icon: '⚡' },
    { id: 'completed', label: 'COMPLETE', icon: '✓' },
  ];

  return (
    <div className={cn('flex gap-3 overflow-x-auto pb-2', className)}>
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 border-4 transition-all whitespace-nowrap',
            'pixel-text-base font-bold',
            activeFilter === filter.id
              ? 'bg-[var(--blockchain-blue)] border-[var(--active-cyan)] text-black pixel-shadow'
              : 'bg-[var(--pixel-dark)] border-[var(--terminal-surface)] text-[var(--text-secondary)] hover:border-[var(--blockchain-blue)]'
          )}
        >
          <span className="text-lg">{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
