'use client';

import React, { useState } from 'react';
import { User, Quest, UserQuest } from '@/lib/types';
import ProgressSidebar from '../layout/ProgressSidebar';
import QuestGrid from './QuestGrid';
import MissionBriefModal from '../modals/MissionBriefModal';

interface ExplorerDashboardProps {
  user: User;
  quests: Quest[];
  userQuests: UserQuest[];
}

export default function ExplorerDashboard({ user, quests, userQuests }: ExplorerDashboardProps) {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [isMissionBriefOpen, setIsMissionBriefOpen] = useState(false);

  const handleSelectQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    setIsMissionBriefOpen(true);
  };

  const handleCloseModal = () => {
    setIsMissionBriefOpen(false);
    setSelectedQuest(null);
  };

  return (
    <div className="flex gap-6">
      <ProgressSidebar user={user} />
      
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-glow mb-2">
            Welcome back, {user.displayName}!
          </h1>
          <p className="text-gray-400">
            Choose your next quest and continue your Web3 journey
          </p>
        </div>

        <QuestGrid
          quests={quests}
          userQuests={userQuests}
          onSelectQuest={handleSelectQuest}
        />
      </div>

      {selectedQuest && (
        <MissionBriefModal
          quest={selectedQuest}
          isOpen={isMissionBriefOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
