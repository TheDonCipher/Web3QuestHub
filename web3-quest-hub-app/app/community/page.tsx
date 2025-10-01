'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function CommunityPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-[var(--primary)] sm:text-5xl">Community</h1>
            <p className="mt-2 text-theme-secondary">Connect with other Web3 explorers and share your journey</p>
          </div>

          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 text-6xl">👥</div>
              <h2 className="text-2xl font-bold text-theme-primary mb-2">Coming Soon</h2>
              <p className="text-theme-secondary">Community features are under development</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[var(--primary)]/20 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center text-theme-secondary sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a className="text-sm hover:text-[var(--primary)]" href="#">About</a>
            <a className="text-sm hover:text-[var(--primary)]" href="#">Contact</a>
            <a className="text-sm hover:text-[var(--primary)]" href="#">Terms of Service</a>
            <a className="text-sm hover:text-[var(--primary)]" href="#">Privacy Policy</a>
          </div>
          <p className="text-sm">© 2024 Web3 Quest Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
