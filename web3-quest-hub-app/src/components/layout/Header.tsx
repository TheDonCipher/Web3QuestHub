'use client';

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className={cn('terminal-window sticky top-0 z-50 border-b-8', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--void-black)] border-4 border-[var(--terminal-green)] flex items-center justify-center pixel-shadow hover:animate-icon-float">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <span className="pixel-text-xl text-glow-green">WEB3 QUEST HUB</span>
              <p className="pixel-text-base text-[var(--text-secondary)] mt-1">{'>'} DIGITAL_FRONTIER.EXE</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <a href="#missions" className="pixel-text-base font-bold text-[var(--text-secondary)] hover:text-[var(--blockchain-blue)] transition-colors px-3 py-2 hover:bg-[var(--void-black)] border-2 border-transparent hover:border-[var(--blockchain-blue)]">
              [MISSIONS]
            </a>
            <a href="#profile" className="pixel-text-base font-bold text-[var(--text-secondary)] hover:text-[var(--blockchain-blue)] transition-colors px-3 py-2 hover:bg-[var(--void-black)] border-2 border-transparent hover:border-[var(--blockchain-blue)]">
              [PROFILE]
            </a>
            <a href="#leaderboard" className="pixel-text-base font-bold text-[var(--text-secondary)] hover:text-[var(--blockchain-blue)] transition-colors px-3 py-2 hover:bg-[var(--void-black)] border-2 border-transparent hover:border-[var(--blockchain-blue)]">
              [LEADERBOARD]
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {/* Notifications Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Wallet Button */}
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-emerald-300 rounded-xl shadow-sm">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-emerald-800">{formatAddress(address)}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => disconnect()} className="font-semibold">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const metamask = connectors.find((c) => c.id === 'io.metamask' || c.name.includes('MetaMask'));
                  if (metamask) {
                    connect({ connector: metamask });
                  } else if (connectors[0]) {
                    connect({ connector: connectors[0] });
                  }
                }}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
