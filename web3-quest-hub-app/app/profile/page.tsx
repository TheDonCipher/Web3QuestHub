'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { useUserQuests } from '@/lib/hooks/useUserQuests';
import Layout from '@/components/layout/Layout';
import AvatarConsole from '@/components/profile/AvatarConsole';

export default function ProfilePage() {
  const { userProfile } = useAuth();
  const { userQuests, loading } = useUserQuests();

  if (loading || !userProfile) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-xl text-gray-400">Loading your profile...</p>
        </div>
      </Layout>
    );
  }

  const completedQuests = userQuests.filter(uq => uq.status === 'completed');

  return (
    <Layout>
      <AvatarConsole user={userProfile} completedQuests={completedQuests} />
    </Layout>
  );
}
