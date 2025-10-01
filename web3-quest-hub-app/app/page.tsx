'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useMissions } from '@/hooks/useMissions';
import { useMissionStatus } from '@/hooks/useMissionStatus';
import { useExpeditions } from '@/hooks/useExpeditions';
import { updateMissionStatus } from '@/lib/firebase/firestore';
import type { Mission } from '@/types';

type Theme = 'dark' | 'light';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const [showToast, setShowToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [theme, setTheme] = useState<Theme>('dark');

  const userId = address || '';
  const { profile, loading: profileLoading } = useUserProfile(isConnected ? userId : undefined);
  const { missions, loading: missionsLoading } = useMissions();
  const { statuses, getStatus } = useMissionStatus(isConnected ? userId : undefined);
  const { expeditions, loading: expeditionsLoading } = useExpeditions();

  useEffect(() => {
    // Sync theme with localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    const currentTheme = savedTheme || 'dark';
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

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

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-theme-primary">Connect Your Wallet</h1>
          <p className="text-theme-secondary">Please connect your wallet to start your Web3 journey</p>
        </div>
      </div>
    );
  }

  const currentLevel = profile?.explorerLevel || 1;
  const totalXP = profile?.totalXP || 0;
  const xpForCurrentLevel = currentLevel === 1 ? 0 : (currentLevel - 1) * 500;
  const xpForNextLevel = currentLevel * 500;
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  const isLoading = profileLoading || missionsLoading || expeditionsLoading;

  // Mock images for expeditions (Web3/blockchain/crypto themed)
  const expeditionImages = [
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop', // Crypto/blockchain
    'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=400&fit=crop', // NFT art
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop', // Blockchain network
    'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=400&h=400&fit=crop', // Metaverse
    'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=400&fit=crop', // DeFi
    'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=400&h=400&fit=crop', // Web3
  ];

  // Mock avatar for profile
  const profileAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${profile?.walletAddress || 'default'}`;
  
  // Mock activity data
  const mockActivities = [
    { user: 'You', action: 'Started Web3 journey', avatar: profileAvatar },
    { user: 'CryptoNinja', action: 'Completed "DeFi Basics"', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ninja' },
    { user: 'Web3Wizard', action: 'Reached Level 5', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=wizard' },
    { user: 'BlockchainBob', action: 'Earned "Portal Holder" badge', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bob' },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-white/10 px-6 py-3 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="size-6" style={{ color: 'var(--primary)' }}>
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-theme-primary">Web3 Quest Hub</h1>
          </div>
          
          <nav className="hidden items-center gap-8 lg:flex">
            <a className="text-sm font-medium text-theme-primary transition-colors" style={{ ['--hover-color' as any]: 'var(--primary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''} href="#">Home</a>
            <a className="text-sm font-medium" style={{ color: 'var(--primary)' }} href="#">Expeditions</a>
            <a className="text-sm font-medium text-theme-primary transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''} href="#">Marketplace</a>
            <a className="text-sm font-medium text-theme-primary transition-colors" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = ''} href="#">Community</a>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-theme-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            <button className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10">
              <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg" className="text-theme-primary">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
              </svg>
            </button>
            <div 
              className="size-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profileAvatar})` }}
            ></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1">
          <div className="grid w-full grid-cols-12 gap-6 p-6 lg:gap-8 lg:p-10">
            {/* Left Sidebar - Profile */}
            <aside className="col-span-12 flex flex-col gap-6 lg:col-span-3">
              {/* Profile Card */}
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

              {/* Stats Card */}
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

            {/* Main Content - Expeditions */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
              <div>
                <h2 className="text-4xl font-bold text-theme-primary">Expeditions</h2>
                <p className="text-theme-secondary">Choose your path and embark on a new adventure</p>
              </div>

              {/* Tabs */}
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

              {/* Available Expeditions */}
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

            {/* Right Sidebar */}
            <aside className="col-span-12 flex flex-col gap-6 lg:col-span-3">
              {/* Activity Feed */}
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

              {/* Quick Stats */}
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

      {/* Toast Notification */}
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
