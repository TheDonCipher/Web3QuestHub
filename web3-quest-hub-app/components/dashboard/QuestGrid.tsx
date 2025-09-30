'use client';

import React from 'react';
import { Quest, UserQuest } from '@/lib/types';
import QuestCard from './QuestCard';

interface QuestGridProps {
  quests: Quest[];
  userQuests: UserQuest[];
  onSelectQuest: (quest: Quest) => void;
}

export default function QuestGrid({ quests, userQuests, onSelectQuest }: QuestGridProps) {
  // Group quests by expedition
  const expeditions = quests.reduce((acc, quest) => {
    if (!acc[quest.expeditionId]) {
      acc[quest.expeditionId] = [];
    }
    acc[quest.expeditionId].push(quest);
    return acc;
  }, {} as Record<string, Quest[]>);

  const getUserQuestStatus = (questId: string) => {
    const userQuest = userQuests.find(uq => uq.questId === questId);
    return userQuest?.status || 'available';
  };

  return (
    <div className="space-y-8">
      {Object.entries(expeditions).map(([expeditionId, expeditionQuests]) => (
        <div key={expeditionId}>
          <h2 className="text-2xl font-bold text-cyan-500 mb-4 capitalize">
            {expeditionId.replace('-', ' ')} Expedition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expeditionQuests.map(quest => (
              <QuestCard
                key={quest.questId}
                quest={quest}
                status={getUserQuestStatus(quest.questId)}
                onClick={() => onSelectQuest(quest)}
              />
            ))}
          </div>
        </div>
      ))}

      {quests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No quests available yet</p>
          <p className="text-sm text-gray-500 mt-2">Check back soon for new adventures!</p>
        </div>
      )}
    </div>
  );
}
