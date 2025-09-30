'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md cyber-border border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-glow">
            Web3 Quest Hub
          </Link>

          <nav className="flex items-center space-x-6">
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-cyan-500 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-cyan-500 transition-colors"
                >
                  Profile
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{userProfile?.displayName}</p>
                    <p className="text-xs text-gray-400">
                      Level {userProfile?.explorerLevel || 1}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
