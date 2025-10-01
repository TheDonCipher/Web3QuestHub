'use client';

import React, { useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LandingPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const router = useRouter();

  const handleConnect = () => {
    const injectedConnector = connectors.find((c) => c.id === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const handleStartLearning = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--primary)]/20 bg-[var(--bg-base)]/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-6 w-6 text-[var(--primary)]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-theme-primary">Web3 Quest Hub</h2>
          </div>
          <div className="flex items-center gap-2">
            {!isConnected ? (
              <>
                <button
                  onClick={handleConnect}
                  className="flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)] px-4 text-sm font-bold text-[var(--bg-base)] shadow-sm transition-transform hover:scale-105"
                >
                  <span>Connect Wallet</span>
                </button>
                <button className="flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)]/20 px-4 text-sm font-bold text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/30">
                  <span>Install Plugin</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleStartLearning}
                className="flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)] px-4 text-sm font-bold text-[var(--bg-base)] shadow-sm transition-transform hover:scale-105"
              >
                <span>Start Learning</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[70vh] items-center justify-center py-20 text-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(15, 35, 23, 0.7), rgba(15, 35, 23, 1)), url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&h=1080&fit=crop)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-[var(--bg-base)]/30"></div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Unlock the Metaverse. One Quest at a Time.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Web3 Quest Hub is a gamified educational platform that guides you through the world of Web3 with interactive quests and real-world interactions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {!isConnected ? (
                <>
                  <button
                    onClick={handleConnect}
                    className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)] px-6 text-base font-bold text-[var(--bg-base)] shadow-lg transition-transform hover:scale-105"
                  >
                    <span>Connect Wallet</span>
                  </button>
                  <button className="flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-[var(--primary)]/50 bg-[var(--primary)]/20 px-6 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-[var(--primary)]/30">
                    <span>Install Plugin</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleStartLearning}
                  className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)] px-6 text-base font-bold text-[var(--bg-base)] shadow-lg transition-transform hover:scale-105"
                >
                  <span>Start Learning</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 bg-[var(--bg-base)]/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-theme-primary sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-theme-secondary">Our gamified learning loop makes mastering Web3 simple and fun.</p>
            </div>
            <div className="mt-12 flex flex-col items-center gap-8 md:flex-row md:justify-center">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--primary)]/20 p-4">
                  <svg className="h-12 w-12 text-[var(--primary)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-theme-primary">1. Start a Quest</h3>
                <p className="mt-1 text-theme-secondary">Choose from a variety of quests designed to teach you core Web3 concepts.</p>
              </div>
              <div className="h-12 w-px bg-[var(--primary)]/50 md:h-px md:w-24"></div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--primary)]/20 p-4">
                  <svg className="h-12 w-12 text-[var(--primary)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m12 14 4-4-4-4-4 4 4 4z"></path>
                    <path d="M12 2v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="m4.93 19.07 1.41-1.41"></path>
                    <path d="M12 20v2"></path>
                    <path d="m19.07 19.07-1.41-1.41"></path>
                    <path d="M22 12h-2"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-theme-primary">2. Interact & Learn</h3>
                <p className="mt-1 text-theme-secondary">Engage with real dApps and protocols with guidance from AURA AI.</p>
              </div>
              <div className="h-12 w-px bg-[var(--primary)]/50 md:h-px md:w-24"></div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-[var(--primary)]/20 p-4">
                  <svg className="h-12 w-12 text-[var(--primary)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-theme-primary">3. Verify On-Chain</h3>
                <p className="mt-1 text-theme-secondary">Your completed actions are verified on the blockchain, creating your on-chain resume.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey to Web3 Mastery */}
        <section className="py-16 sm:py-24 bg-[var(--bg-base)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-theme-primary sm:text-4xl">Your Journey to Web3 Mastery</h2>
              <p className="mt-4 text-lg text-theme-secondary">
                Level up your skills, earn XP for every quest, and rise through the ranks from Newbie to Frontier Citizen. Your progression is your reputation.
              </p>
            </div>
            <div className="mt-12">
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-[var(--primary)]/20"></div>
                <div className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-[var(--primary)]" style={{ width: '20%' }}></div>
                <div className="relative flex justify-between">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center ring-4 ring-[var(--primary)]/30">
                      <svg className="w-5 h-5 text-[var(--bg-base)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <p className="mt-3 font-bold text-theme-primary">Newbie</p>
                    <p className="text-sm text-theme-secondary">LVL 1</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/30 flex items-center justify-center ring-4 ring-[var(--primary)]/10"></div>
                    <p className="mt-3 font-bold text-theme-primary">Explorer</p>
                    <p className="text-sm text-theme-secondary">LVL 10</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/30 flex items-center justify-center ring-4 ring-[var(--primary)]/10"></div>
                    <p className="mt-3 font-bold text-theme-primary">Adept</p>
                    <p className="text-sm text-theme-secondary">LVL 25</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/30 flex items-center justify-center ring-4 ring-[var(--primary)]/10"></div>
                    <p className="mt-3 font-bold text-theme-primary">Pioneer</p>
                    <p className="text-sm text-theme-secondary">LVL 50</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)]/30 flex items-center justify-center ring-4 ring-[var(--primary)]/10"></div>
                    <p className="mt-3 font-bold text-theme-primary">Frontier Citizen</p>
                    <p className="text-sm text-theme-secondary">LVL 100</p>
                  </div>
                </div>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-[var(--primary)]/20 bg-[var(--bg-base)]/50">
                  <div className="p-2 bg-[var(--primary)]/20 rounded-lg">
                    <svg className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 24H14V44H4V24Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                      <path d="M24 14H34V44H24V14Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                      <path d="M44 4H34V44H44V4Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-theme-primary">Earn XP & Level Up</h4>
                  <p className="mt-1 text-theme-secondary">Complete quests to gain Experience Points (XP). The more complex the quest, the more XP you earn, fueling your journey through the Explorer Levels.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-[var(--primary)]/20 bg-[var(--bg-base)]/50">
                  <div className="p-2 bg-[var(--primary)]/20 rounded-lg">
                    <svg className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L9 11.5V21C9 30.3333 15 44 24 44C33 44 39 30.3333 39 21V11.5L24 4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      <path d="M19 22L23 26L30 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-theme-primary">Unlock Badges</h4>
                  <p className="mt-1 text-theme-secondary">Hitting milestones and completing specific questlines rewards you with unique, on-chain badges that showcase your specialized skills.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-[var(--primary)]/20 bg-[var(--bg-base)]/50">
                  <div className="p-2 bg-[var(--primary)]/20 rounded-lg">
                    <svg className="h-10 w-10 text-[var(--primary)]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <rect fill="currentColor" height="36" rx="3" stroke="currentColor" strokeWidth="2" width="36" x="6" y="6"></rect>
                      <path d="M14 26L20 32L34 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-theme-primary">Access New Content</h4>
                  <p className="mt-1 text-theme-secondary">As you level up, you'll unlock more advanced quests, exclusive communities, and new features within the Web3 Quest Hub ecosystem.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-theme-primary sm:text-4xl">Core Features</h2>
              <p className="mt-4 text-lg text-theme-secondary">Web3 Quest Hub is packed with tools to accelerate your Web3 education.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4 rounded-xl border border-[var(--primary)]/10 bg-[var(--bg-base)] p-6 shadow-sm transition-all hover:shadow-lg hover:border-[var(--primary)]/20">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img alt="AURA AI Companion" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop" />
                </div>
                <h3 className="text-xl font-bold text-theme-primary">AURA AI Companion</h3>
                <p className="text-theme-secondary">Your personal AI guide, providing contextual help and real-time feedback as you navigate Web3.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-[var(--primary)]/10 bg-[var(--bg-base)] p-6 shadow-sm transition-all hover:shadow-lg hover:border-[var(--primary)]/20">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img alt="Web3 HUD Plugin" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop" />
                </div>
                <h3 className="text-xl font-bold text-theme-primary">Web3 HUD</h3>
                <p className="text-theme-secondary">Our browser plugin overlays critical information and quest steps directly onto websites and dApps.</p>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-[var(--primary)]/10 bg-[var(--bg-base)] p-6 shadow-sm transition-all hover:shadow-lg hover:border-[var(--primary)]/20">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img alt="On-Chain Verification" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=600&h=400&fit=crop" />
                </div>
                <h3 className="text-xl font-bold text-theme-primary">On-Chain Verification</h3>
                <p className="text-theme-secondary">Completed quests are recorded on-chain, building your reputation and a verifiable portfolio of skills.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 sm:py-24 bg-[var(--bg-base)]/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-theme-primary sm:text-4xl">Trusted by the Community</h2>
              <p className="mt-4 text-lg text-theme-secondary">Join thousands of learners building their future in the metaverse.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--bg-base)]/70 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[var(--primary)]/20"></div>
                  <div>
                    <h4 className="font-bold text-theme-primary">0xdegen.eth</h4>
                    <p className="text-sm text-theme-secondary">Early Adopter</p>
                  </div>
                </div>
                <p className="mt-4 text-theme-secondary">"Web3 Quest Hub made Web3 click for me. The quests are actually fun, and I've learned more in a week than I did in months of reading articles."</p>
              </div>
              <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--bg-base)]/70 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[var(--primary)]/20"></div>
                  <div>
                    <h4 className="font-bold text-theme-primary">CryptoJane</h4>
                    <p className="text-sm text-theme-secondary">DeFi Enthusiast</p>
                  </div>
                </div>
                <p className="mt-4 text-theme-secondary">"The AURA AI is a game-changer. It's like having a senior dev guiding you 24/7. Highly recommend the plugin for anyone serious about Web3."</p>
              </div>
              <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--bg-base)]/70 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[var(--primary)]/20"></div>
                  <div>
                    <h4 className="font-bold text-theme-primary">NFT_Wizard</h4>
                    <p className="text-sm text-theme-secondary">Digital Artist</p>
                  </div>
                </div>
                <p className="mt-4 text-theme-secondary">"Finally, a platform that doesn't just talk theory. I actually deployed my first smart contract through a Web3 Quest Hub quest!"</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg-base)]/50 border-t border-[var(--primary)]/10">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link className="text-sm text-theme-secondary hover:text-[var(--primary)]" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm text-theme-secondary hover:text-[var(--primary)]" href="#">
                Privacy Policy
              </Link>
              <Link className="text-sm text-theme-secondary hover:text-[var(--primary)]" href="#">
                Contact Us
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link className="text-theme-secondary hover:text-[var(--primary)]" href="#">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </Link>
              <Link className="text-theme-secondary hover:text-[var(--primary)]" href="#">
                <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-6 border-t border-[var(--primary)]/10 pt-6 text-center text-sm text-theme-secondary">
            <p>© 2024 Web3 Quest Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
