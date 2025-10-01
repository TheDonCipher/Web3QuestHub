'use client';

import React, { useState, useMemo } from 'react';
import { QuestCard } from './QuestCard';
import { FilterBar } from './FilterBar';
import { ExpeditionSelector } from './ExpeditionSelector';
import { cn } from '@/lib/utils/cn';
import type { Mission, MissionStatus, Expedition } from '@/types';

interface QuestGridProps {
  missions: Mission[];
  expeditions: Expedition[];
  missionStatuses: Record<string, MissionStatus>;
  userLevel: number;
  onMissionClick: (mission: Mission) => void;
  className?: string;
}

type FilterType = 'all' | 'in-progress' | 'completed' | 'available';

export function QuestGrid({
  missions,
  expeditions,
  missionStatuses,
  userLevel,
  onMissionClick,
  className,
}: QuestGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeExpeditionId, setActiveExpeditionId] = useState<string>(
    expeditions[0]?.expeditionId || 'digital_frontier'
  );

  const groupedMissions = useMemo(() => {
    const grouped: Record<string, Mission[]> = {};

    expeditions.forEach((expedition) => {
      grouped[expedition.expeditionId] = [];
    });

    missions.forEach((mission) => {
      if (grouped[mission.expeditionId]) {
        grouped[mission.expeditionId].push(mission);
      }
    });

    return grouped;
  }, [missions, expeditions]);

  const getFilteredMissions = (missions: Mission[]) => {
    if (activeFilter === 'all') return missions;

    return missions.filter((mission) => {
      const status = missionStatuses[mission.missionId]?.status || 'available';
      
      if (activeFilter === 'available') {
        return status === 'available' && userLevel >= mission.requiredLevel;
      }
      
      return status === activeFilter;
    });
  };

  const getMissionStatus = (mission: Mission): MissionStatus['status'] => {
    if (userLevel < mission.requiredLevel) return 'locked';
    return missionStatuses[mission.missionId]?.status || 'available';
  };

  // Filter missions by active expedition
  const activeExpeditionMissions = useMemo(() => {
    const expeditionMissions = groupedMissions[activeExpeditionId] || [];
    return getFilteredMissions(expeditionMissions);
  }, [groupedMissions, activeExpeditionId, activeFilter]);

  const activeExpedition = expeditions.find((e) => e.expeditionId === activeExpeditionId);
  const isExpeditionLocked = activeExpedition ? userLevel < activeExpedition.requiredLevel : false;

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Expedition Selector */}
      <ExpeditionSelector
        expeditions={expeditions}
        activeExpeditionId={activeExpeditionId}
        userLevel={userLevel}
        onSelectExpedition={setActiveExpeditionId}
      />

      {/* Filter Bar */}
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Active Expedition Section */}
      {activeExpedition && (
        <section className="space-y-6">
          {/* Expedition Header */}
          <div className="terminal-window p-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="pixel-text-2xl text-glow-green">
                {activeExpedition.title.toUpperCase()}
              </h2>
              {isExpeditionLocked && (
                <span className="pixel-text-sm text-[var(--error-red)]">
                  🔒 LEVEL {activeExpedition.requiredLevel} REQUIRED
                </span>
              )}
            </div>
            <p className="pixel-text-base text-[var(--text-secondary)] leading-relaxed">
              {activeExpedition.description}
            </p>
          </div>

          {/* Mission Grid */}
          {activeExpeditionMissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeExpeditionMissions.map((mission) => (
                <QuestCard
                  key={mission.missionId}
                  mission={mission}
                  status={getMissionStatus(mission)}
                  onClick={() => onMissionClick(mission)}
                />
              ))}
            </div>
          ) : (
            <div className="terminal-window p-12 text-center">
              <div className="text-6xl mb-4">
                {isExpeditionLocked ? '🔒' : '🎯'}
              </div>
              <p className="pixel-text-base text-[var(--text-secondary)]">
                {isExpeditionLocked
                  ? `UNLOCK THIS EXPEDITION BY REACHING LEVEL ${activeExpedition.requiredLevel}`
                  : activeFilter !== 'all'
                  ? `NO ${activeFilter.toUpperCase().replace('-', ' ')} MISSIONS`
                  : 'NO MISSIONS AVAILABLE YET'}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Empty State (No Expeditions) */}
      {expeditions.length === 0 && (
        <div className="terminal-window p-16 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="pixel-text-xl text-[var(--text-primary)] mb-3">NO MISSIONS AVAILABLE</h3>
          <p className="pixel-text-base text-[var(--text-secondary)]">CHECK BACK SOON FOR NEW ADVENTURES!</p>
        </div>
      )}
    </div>
  );
}
