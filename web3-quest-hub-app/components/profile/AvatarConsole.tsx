'use client';

import React from 'react';
import { User, UserQuest } from '@/lib/types';
import XPCore from './XPCore';
import ArtifactInventory from './ArtifactInventory';
import Logbook from './Logbook';

interface AvatarConsoleProps {
  user: User;
  completedQuests: UserQuest[];
}

export default function AvatarConsole({ user, completedQuests }: AvatarConsoleProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-glow mb-8">
        Explorer Console
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <XPCore user={user} />
        </div>

        <div className="lg:col-span-2">
          <ArtifactInventory completedQuests={completedQuests} />
        </div>

        <div className="lg:col-span-3">
          <Logbook completedQuests={completedQuests} />
        </div>
      </div>
    </div>
  );
}
