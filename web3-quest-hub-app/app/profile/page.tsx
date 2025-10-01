'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { AvatarConsole } from '@/components/profile/AvatarConsole';
import { PixelButton } from '@/components/ui/PixelButton';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { profile, loading } = useUserProfile(isConnected ? address : undefined);

  // Redirect if not connected
  React.useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="terminal-window p-16 text-center scanline-overlay">
            <div className="inline-block">
              <div className="text-6xl mb-4 animate-pulse">▓</div>
              <p className="pixel-text-base text-[var(--text-secondary)]">
                LOADING AVATAR CONSOLE...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="terminal-window max-w-md p-12 text-center scanline-overlay">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="pixel-text-xl text-[var(--error-red)] mb-4">
              PROFILE NOT FOUND
            </h2>
            <p className="pixel-text-sm text-[var(--text-secondary)] mb-6">
              YOUR PROFILE DATA COULD NOT BE LOADED. PLEASE TRY RECONNECTING YOUR WALLET.
            </p>
            <PixelButton variant="primary" size="lg" onClick={() => router.push('/')}>
              RETURN TO DASHBOARD
            </PixelButton>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <PixelButton
            variant="secondary"
            size="md"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <span>◀</span>
            <span>BACK TO DASHBOARD</span>
          </PixelButton>
        </div>

        {/* Console Header */}
        <div className="terminal-window p-6 mb-6">
          <h1 className="pixel-text-2xl text-glow-green text-center">
            ╔════════════════════════╗
            <br />
            ║ AVATAR CONSOLE ║
            <br />
            ╚════════════════════════╝
          </h1>
        </div>

        {/* Avatar Console */}
        <AvatarConsole profile={profile} />
      </main>
    </div>
  );
}
