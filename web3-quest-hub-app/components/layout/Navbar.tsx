'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAccount } from 'wagmi';

type Theme = 'dark' | 'light';

export default function Navbar() {
  const pathname = usePathname();
  const { address } = useAccount();
  const [theme, setTheme] = useState<Theme>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const currentTheme = savedTheme || 'dark';
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const profileAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${address || 'default'}`;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/quests', label: 'Quests' },
    { href: '/learn', label: 'Learn' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/community', label: 'Community' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-[var(--primary)]/20 bg-[var(--bg-base)]/80 px-6 py-4 backdrop-blur-sm lg:px-10">
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 text-[var(--primary)]">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <Link href="/">
          <h2 className="text-xl font-bold text-theme-primary hover:text-[var(--primary)] transition-colors">
            Web3 Quest Hub
          </h2>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              isActive(link.href)
                ? 'text-[var(--primary)] font-bold'
                : 'text-theme-primary hover:text-[var(--primary)]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[var(--primary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[var(--primary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>
        
        {/* Notifications */}
        <button className="hidden md:flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[var(--primary)]">notifications</span>
        </button>
        
        {/* Profile Avatar */}
        <Link href="/profile">
          <div 
            className="h-10 w-10 rounded-full bg-cover bg-center cursor-pointer hover:ring-2 hover:ring-[var(--primary)] transition-all" 
            style={{ backgroundImage: `url(${profileAvatar})` }}
          ></div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-[var(--primary)]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-[var(--primary)]/20 bg-[var(--bg-base)]/95 backdrop-blur-sm md:hidden">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-4 text-sm font-medium transition-colors rounded ${
                  isActive(link.href)
                    ? 'text-[var(--primary)] font-bold bg-white/5'
                    : 'text-theme-primary hover:text-[var(--primary)] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
