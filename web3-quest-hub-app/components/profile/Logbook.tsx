'use client';

import React from 'react';
import { UserQuest } from '@/lib/types';

interface LogbookProps {
  completedQuests: UserQuest[];
}

export default function Logbook({ completedQuests }: LogbookProps) {
  const sortedQuests = [...completedQuests].sort((a, b) => {
    if (!a.completedAt || !b.completedAt) return 0;
    return b.completedAt.toMillis() - a.completedAt.toMillis();
  });

  return (
    <div className="cyber-border rounded-lg p-6 bg-black/50">
      <h2 className="text-2xl font-bold mb-6">Logbook</h2>

      {sortedQuests.length > 0 ? (
        <div className="space-y-4">
          {sortedQuests.map((quest) => (
            <div
              key={quest.questId}
              className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <p className="font-semibold">{quest.questId}</p>
                  <p className="text-sm text-gray-400">
                    {quest.completedAt?.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>
              {quest.earnedBadgeId && (
                <div className="text-2xl">🏅</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No activities yet</p>
          <p className="text-sm text-gray-500 mt-2">Complete quests to build your logbook!</p>
        </div>
      )}
    </div>
  );
}
