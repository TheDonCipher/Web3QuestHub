'use client';

import React from 'react';
import { Quest } from '@/lib/types';

interface QuestCardProps {
  quest: Quest;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  onClick: () => void;
}

export default function QuestCard({ quest, status, onClick }: QuestCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-yellow-500';
      case 'locked':
        return 'border-gray-700';
      default:
        return 'border-cyan-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'locked':
        return 'Locked';
      default:
        return 'Available';
    }
  };

  return (
    <div
      onClick={status !== 'locked' ? onClick : undefined}
      className={`
        relative cyber-border rounded-lg p-6 bg-black/50 transition-all duration-300
        ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${getStatusColor()}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{quest.title}</h3>
          <p className="text-sm text-gray-400">{quest.difficulty}</p>
        </div>
        <div className="text-right">
          <p className="text-cyan-500 font-bold">+{quest.xpReward} XP</p>
          <p className="text-xs text-gray-400">{getStatusText()}</p>
        </div>
      </div>

      <p className="text-sm text-gray-300 line-clamp-3 mb-4">
        {quest.lore}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {quest.badge && (
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-xs">🏅</span>
            </div>
          )}
          <span className="text-xs text-gray-400">{quest.badge?.name}</span>
        </div>
        
        {status === 'completed' && (
          <div className="text-green-500">✓</div>
        )}
      </div>
    </div>
  );
}
