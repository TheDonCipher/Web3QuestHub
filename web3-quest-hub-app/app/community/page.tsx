'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAccount } from 'wagmi';

interface Discussion {
  id: string;
  title: string;
  comments: number;
  timestamp: string;
  avatar: string;
}

export default function CommunityPage() {
  const { address } = useAccount();
  const [activeNav, setActiveNav] = useState<'discussions'>('discussions');
  const [postContent, setPostContent] = useState('');

  const userAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${address || 'default'}`;

  const trendingDiscussions: Discussion[] = [
    {
      id: '1',
      title: "What's your favorite aspect of the Web3 Quest Hub metaverse?",
      comments: 12,
      timestamp: '2 hours ago',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user1'
    },
    {
      id: '2',
      title: 'Share your recent achievements in the metaverse!',
      comments: 8,
      timestamp: '4 hours ago',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user2'
    },
    {
      id: '3',
      title: 'Tips for beginners in Web3 Quest Hub?',
      comments: 15,
      timestamp: '6 hours ago',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user3'
    }
  ];

  const recentDiscussions: Discussion[] = [
    {
      id: '4',
      title: 'New features in the latest update!',
      comments: 5,
      timestamp: '1 day ago',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user4'
    },
    {
      id: '5',
      title: 'Looking for collaborators for a project',
      comments: 10,
      timestamp: '2 days ago',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user5'
    },
    {
      id: '6',
      title: 'Community feedback on the new quests',
      comments: 7,
      timestamp: '3 days ago',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=user6'
    }
  ];

  const handlePost = () => {
    if (postContent.trim()) {
      console.log('Posting:', postContent);
      setPostContent('');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Left Sidebar - Navigation */}
        <aside className="hidden lg:flex w-64 flex-col gap-4 border-r border-[var(--primary)]/20 p-4">
          <nav className="flex flex-col gap-2">
            <a 
              href="#" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
            >
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
              </svg>
              <p className="text-sm font-medium text-theme-primary">Overview</p>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
            >
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M240,120a48.05,48.05,0,0,0-48-48H152.2c-2.91-.17-53.62-3.74-101.91-44.24A16,16,0,0,0,24,40V200a16,16,0,0,0,26.29,12.25c37.77-31.68,77-40.76,93.71-43.3v31.72A16,16,0,0,0,151.12,214l11,7.33A16,16,0,0,0,186.5,212l11.77-44.36A48.07,48.07,0,0,0,240,120ZM40,199.93V40h0c42.81,35.91,86.63,45,104,47.24v65.48C126.65,155,82.84,164.07,40,199.93Zm131,8,0,.11-11-7.33V168h21.6ZM192,152H160V88h32a32,32,0,1,1,0,64Z"></path>
              </svg>
              <p className="text-sm font-medium text-theme-primary">Announcements</p>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 bg-[var(--primary)] text-black transition-colors"
            >
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"></path>
              </svg>
              <p className="text-sm font-bold">Discussions</p>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
            >
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
              </svg>
              <p className="text-sm font-medium text-theme-primary">Events</p>
            </a>
            
            <a 
              href="#" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
            >
              <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                <path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"></path>
              </svg>
              <p className="text-sm font-medium text-theme-primary">Polls</p>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-theme-primary">Community Discussions</h1>
            
            {/* Post Creation */}
            <div className="flex gap-4 mb-8">
              <div className="flex-shrink-0">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${userAvatar})` }}
                ></div>
              </div>
              <div className="flex-1">
                <textarea 
                  className="w-full resize-none rounded-lg bg-[var(--surface-bg)] border border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] placeholder:text-theme-secondary text-theme-primary p-3 min-h-[100px]"
                  placeholder="Start a discussion..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end items-center mt-2 gap-2">
                  <button className="p-2 rounded-full hover:bg-white/10 text-[var(--primary)] transition-colors">
                    <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={handlePost}
                    className="px-6 py-2 rounded-full bg-[var(--primary)] text-black font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Trending Discussions */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-theme-primary">Trending Discussions</h2>
                <div className="space-y-4">
                  {trendingDiscussions.map((discussion) => (
                    <div 
                      key={discussion.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-[var(--surface-bg)] hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div 
                        className="w-14 h-14 rounded-full bg-cover bg-center flex-shrink-0" 
                        style={{ backgroundImage: `url(${discussion.avatar})` }}
                      ></div>
                      <div className="flex-1">
                        <p className="font-semibold text-theme-primary">{discussion.title}</p>
                        <p className="text-sm text-theme-secondary">
                          {discussion.comments} comments · {discussion.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Discussions */}
              <div>
                <h2 className="text-xl font-bold mb-4 text-theme-primary">Recent Discussions</h2>
                <div className="space-y-4">
                  {recentDiscussions.map((discussion) => (
                    <div 
                      key={discussion.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-[var(--surface-bg)] hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div 
                        className="w-14 h-14 rounded-full bg-cover bg-center flex-shrink-0" 
                        style={{ backgroundImage: `url(${discussion.avatar})` }}
                      ></div>
                      <div className="flex-1">
                        <p className="font-semibold text-theme-primary">{discussion.title}</p>
                        <p className="text-sm text-theme-secondary">
                          {discussion.comments} comments · {discussion.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
