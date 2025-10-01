'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useMissions } from '@/hooks/useMissions';
import { useMissionStatus } from '@/hooks/useMissionStatus';
import { useExpeditions } from '@/hooks/useExpeditions';
import { updateMissionStatus } from '@/lib/firebase/firestore';
import Navbar from '@/components/layout/Navbar';
import type { Mission } from '@/types';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');

  const userId = address || '';
  const { profile, loading: profileLoading } = useUserProfile(isConnected ? userId : undefined);
  const { missions, loading: missionsLoading } = useMissions();
  const { statuses, getStatus } = useMissionStatus(isConnected ? userId : undefined);
  const { expeditions, loading: expeditionsLoading } = useExpeditions();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (isConnected && address && !profileLoading && !profile) {
      const username = `Explorer_${address.slice(2, 8)}`;
      createUserProfile(address, username);
    }
  }, [isConnected, address, profileLoading, profile]);

  const createUserProfile = async (walletAddress: string, username: string) => {
    try {
      await setDoc(doc(db, 'user_profile', walletAddress), {
        userId: walletAddress,
        walletAddress,
        username,
        totalXP: 0,
        explorerLevel: 1,
        badgesEarned: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setShowToast({ type, message });
    setTimeout(() => setShowToast(null), 5000);
  };

  if (!isConnected) {
    return null;
  }

  const currentLevel = profile?.explorerLevel || 1;
  const totalXP = profile?.totalXP || 0;
  const xpForCurrentLevel = currentLevel === 1 ? 0 : (currentLevel - 1) * 500;
  const xpForNextLevel = currentLevel * 500;
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  const isLoading = profileLoading || missionsLoading || expeditionsLoading;

  const expeditionImages = [
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=400&h=400&fit=crop',
  ];

  const profileAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${profile?.walletAddress || 'default'}`;
  
  const mockActivities = [
    { user: 'You', action: 'Started Web3 journey', avatar: profileAvatar },
    { user: 'CryptoNinja', action: 'Completed "DeFi Basics"', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ninja' },
    { user: 'Web3Wizard', action: 'Reached Level 5', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=wizard' },
    { user: 'BlockchainBob', action: 'Earned "Portal Holder" badge', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bob' },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex flex-1">
          <div className="grid w-full grid-cols-12 gap-6 p-6 lg:gap-8 lg:p-10">
            <aside className="col-span-12 flex flex-col gap-6 lg:col-span-3">
              <div className="flex flex-col items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="relative">
                  <div 
                    className="size-32 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${profileAvatar})` }}
                  ></div>
                  <div className="absolute -bottom-2 -right-2 rounded-full border-4 bg-white/10 px-2 py-0.5 text-xs font-bold" style={{ borderColor: 'var(--bg-base)', color: 'var(--primary)' }}>
                    LVL {currentLevel}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-theme-primary">{profile?.username || 'Explorer'}</p>
                  <p className="text-sm text-theme-secondary">{totalXP} XP</p>
                </div>
                <div className="w-full">
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-theme-secondary">Next Level</span>
                    <span className="font-bold" style={{ color: 'var(--primary)' }}>{progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full" style={{ width: `${progressPercentage}%`, backgroundColor: 'var(--primary)' }}></div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="px-2 pb-2 text-lg font-bold text-theme-primary">Stats</h3>
                <div className="divide-y divide-white/10 text-sm">
                  <div className="flex justify-between py-3">
                    <p className="text-theme-secondary">Quests Completed</p>
                    <p className="font-bold text-theme-primary">{profile?.badgesEarned.length || 0}</p>
                  </div>
                  <div className="flex justify-between py-3">
                    <p className="text-theme-secondary">Total XP Earned</p>
                    <p className="font-bold text-theme-primary">{totalXP}</p>
                  </div>
                  <div className="flex justify-between py-3">
                    <p className="text-theme-secondary">Current Level</p>
                    <p className="font-bold text-theme-primary">{currentLevel}</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
              <div>
                <h2 className="text-4xl font-bold text-theme-primary">Expeditions</h2>
                <p className="text-theme-secondary">Choose your path and embark on a new adventure</p>
              </div>

              <div className="border-b border-white/10">
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`border-b-2 py-3 text-sm font-bold transition-colors ${
                      activeTab === 'all'
                        ? ''
                        : 'border-transparent text-theme-secondary hover:text-theme-primary'
                    }`}
                    style={activeTab === 'all' ? { borderBottomColor: 'var(--primary)', color: 'var(--primary)' } : {}}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab('active')}
                    className={`border-b-2 py-3 text-sm font-bold transition-colors ${
                      activeTab === 'active'
                        ? ''
                        : 'border-transparent text-theme-secondary hover:text-theme-primary'
                    }`}
                    style={activeTab === 'active' ? { borderBottomColor: 'var(--primary)', color: 'var(--primary)' } : {}}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`border-b-2 py-3 text-sm font-bold transition-colors ${
                      activeTab === 'completed'
                        ? ''
                        : 'border-transparent text-theme-secondary hover:text-theme-primary'
                    }`}
                    style={activeTab === 'completed' ? { borderBottomColor: 'var(--primary)', color: 'var(--primary)' } : {}}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <section>
                <h3 className="mb-4 text-lg font-bold text-theme-primary">Available Expeditions</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {expeditions.map((expedition, index) => (
                    <div key={expedition.expeditionId} className="group relative cursor-pointer overflow-hidden rounded-lg">
                      <div 
                        className="aspect-square w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${expeditionImages[index % expeditionImages.length]})` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                      <p className="absolute bottom-3 left-3 text-sm font-bold text-white drop-shadow-lg">{expedition.title}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="col-span-12 flex flex-col gap-6 lg:col-span-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="px-2 pb-2 text-lg font-bold text-theme-primary">Activity Feed</h3>
                <div className="flex flex-col gap-2">
                  {mockActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 rounded p-2 transition-colors hover:bg-white/5">
                      <div 
                        className="size-10 flex-shrink-0 rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${activity.avatar})` }}
                      ></div>
                      <div className="text-sm">
                        <p className="font-bold text-theme-primary">{activity.user}</p>
                        <p className="text-theme-secondary">{activity.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="px-2 pb-2 text-lg font-bold text-theme-primary">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-sm text-theme-secondary">Gold</p>
                    <p className="text-2xl font-bold text-theme-primary">0</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-sm text-theme-secondary">Gems</p>
                    <p className="text-2xl font-bold text-theme-primary">0</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-white/10 bg-white/5 p-4 shadow-lg">
          <p className={`font-bold`} style={{ color: showToast.type === 'success' ? 'var(--primary)' : '#ff0055' }}>
            {showToast.message}
          </p>
        </div>
      )}
    </div>
  );
}
