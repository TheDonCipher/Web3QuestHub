'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useQuests } from '@/lib/hooks/useQuests';
import { useUserQuests } from '@/lib/hooks/useUserQuests';
import Layout from '@/components/layout/Layout';
import ExplorerDashboard from '@/components/dashboard/ExplorerDashboard';
import AuraChatWidget from '@/components/ai/AuraChatWidget';

export default function DashboardPage() {
  const { userProfile } = useAuth();
  const { quests, loading: questsLoading } = useQuests();
  const { userQuests, loading: userQuestsLoading } = useUserQuests();

  if (questsLoading || userQuestsLoading || !userProfile) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-400">Loading your quests...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ExplorerDashboard
        user={userProfile}
        quests={quests}
        userQuests={userQuests}
      />
      <AuraChatWidget />
    </Layout>
  );
}
