'use client';

import React, { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { profile, loading } = useUserProfile(isConnected ? address : undefined);
  const [activeTab, setActiveTab] = useState<'all' | 'quests' | 'rewards'>('all');

  React.useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleLogout = () => {
    disconnect();
    router.push('/');
  };

  if (!isConnected) {
    return null;
  }

  const profileAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${address || 'default'}`;
  const username = profile?.username || `Explorer_${address?.slice(2, 8)}`;
  const level = profile?.explorerLevel || 1;
  const totalQuests = 45; // Mock data - replace with actual data when available
  const totalXP = profile?.totalXP || 0;
  
  // Calculate XP progress
  const xpForCurrentLevel = level === 1 ? 0 : (level - 1) * 500;
  const xpForNextLevel = level * 500;
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercentage = Math.min(Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100), 100);

  // Mock badge images
  const badges = [
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200&h=200&fit=crop',
  ];

  // Mock activity log data
  const activities = [
    {
      id: '1',
      icon: 'check',
      title: 'Quest Completed: The Great Pixel Hunt',
      time: '2 days ago',
    },
    {
      id: '2',
      icon: 'reward',
      title: 'Reward Received: Pixel Sword',
      time: '3 days ago',
    },
    {
      id: '3',
      icon: 'start',
      title: 'Quest Started: The Lost Artifact',
      time: '5 days ago',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⚡</div>
          <p className="text-theme-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-80 flex-col border-r border-[var(--primary)]/20 p-6">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 text-[var(--primary)]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold">Web3 Quest Hub</h1>
        </Link>

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 h-32 w-32 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${profileAvatar})` }}
          ></div>
          <h2 className="text-xl font-bold">{username}</h2>
          <p className="text-sm text-[var(--primary)]/80">@{username.toLowerCase()}</p>
        </div>

        {/* Stats Grid */}
        <div className="my-6 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/10 p-3">
            <p className="text-2xl font-bold">{level}</p>
            <p className="text-sm text-theme-secondary">Level</p>
          </div>
          <div className="rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/10 p-3">
            <p className="text-2xl font-bold">{totalQuests}</p>
            <p className="text-sm text-theme-secondary">Quests</p>
          </div>
        </div>

        {/* Quick Actions */}
        <nav className="flex flex-col gap-2">
          <h3 className="px-3 text-sm font-semibold text-theme-secondary">Quick Actions</h3>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[var(--primary)]/20 transition-colors">
            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
            </svg>
            <span>Edit Profile</span>
          </button>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[var(--primary)]/20 transition-colors">
            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
            </svg>
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-[var(--primary)]/20 transition-colors"
          >
            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header with Navigation */}
        <header className="flex items-center justify-between border-b border-[var(--primary)]/20 px-8 py-4">
          <div className="flex items-center gap-8">
            <Link href="/quests" className="font-medium text-theme-secondary hover:text-theme-primary transition-colors">
              Quests
            </Link>
            <Link href="/marketplace" className="font-medium text-theme-secondary hover:text-theme-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/community" className="font-medium text-theme-secondary hover:text-theme-primary transition-colors">
              Community
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </button>
            <div
              className="h-10 w-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${profileAvatar})` }}
            ></div>
          </div>
        </header>

        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-theme-secondary">View your progress, badges, and activity history.</p>
          </div>

          {/* Profile Banner */}
          <div
            className="relative mb-8 rounded-xl bg-cover bg-center p-6"
            style={{
              backgroundImage: `linear-gradient(rgba(15, 35, 23, 0.7), rgba(15, 35, 23, 0.9)), url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=400&fit=crop)`,
            }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Level {level}</p>
                <p className="text-2xl font-bold">{username}</p>
              </div>
              <button className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-[var(--bg-base)]">
                View Details
              </button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm font-medium">
                <p>XP Progress</p>
                <p>{progressPercentage}%</p>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white/20">
                <div className="h-2 rounded-full bg-[var(--primary)]" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* Badge Collection */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Badge Collection</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${badge})` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Activity Log</h2>
            <div className="border-b border-[var(--primary)]/20">
              <div className="flex gap-6 px-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'all'
                      ? 'border-[var(--primary)] text-[var(--primary)] font-bold'
                      : 'border-transparent text-theme-secondary hover:border-[var(--primary)]/50 hover:text-theme-primary'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('quests')}
                  className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'quests'
                      ? 'border-[var(--primary)] text-[var(--primary)] font-bold'
                      : 'border-transparent text-theme-secondary hover:border-[var(--primary)]/50 hover:text-theme-primary'
                  }`}
                >
                  Quests
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`border-b-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'rewards'
                      ? 'border-[var(--primary)] text-[var(--primary)] font-bold'
                      : 'border-transparent text-theme-secondary hover:border-[var(--primary)]/50 hover:text-theme-primary'
                  }`}
                >
                  Rewards
                </button>
              </div>
            </div>
            <div className="space-y-4 pt-6">
              {activities.map((activity, index) => (
                <div key={activity.id} className="grid grid-cols-[auto_1fr] items-start gap-4">
                  <div className="flex h-full flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/20">
                      {activity.icon === 'check' && (
                        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                          <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                      )}
                      {activity.icon === 'reward' && (
                        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                          <path d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"></path>
                        </svg>
                      )}
                      {activity.icon === 'start' && (
                        <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                          <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"></path>
                        </svg>
                      )}
                    </div>
                    {index < activities.length - 1 && (
                      <div className="h-full w-0.5 bg-[var(--primary)]/20" style={{ minHeight: '1rem' }}></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-theme-secondary">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
