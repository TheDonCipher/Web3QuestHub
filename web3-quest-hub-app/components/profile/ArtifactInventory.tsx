'use client';

import React from 'react';
import { UserQuest } from '@/lib/types';

interface ArtifactInventoryProps {
  completedQuests: UserQuest[];
}

export default function ArtifactInventory({ completedQuests }: ArtifactInventoryProps) {
  return (
    <div className="cyber-border rounded-lg p-6 bg-black/50">
      <h2 className="text-2xl font-bold mb-6">Artifact Inventory</h2>

      {completedQuests.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {completedQuests.map((quest, index) => (
            <div
              key={quest.questId}
              className="aspect-square cyber-border rounded-lg flex items-center justify-center bg-gray-900 hover:scale-110 transition-transform cursor-pointer"
              title={quest.questId}
            >
              <span className="text-4xl">🏅</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No badges earned yet</p>
          <p className="text-sm text-gray-500 mt-2">Complete quests to earn badges!</p>
        </div>
      )}
    </div>
  );
}
