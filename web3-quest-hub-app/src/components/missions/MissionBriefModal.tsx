'use client';

import React, { useState } from 'react';
import { PixelButton } from '@/components/ui/PixelButton';
import { cn } from '@/lib/utils/cn';
import type { Mission } from '@/types';

interface MissionBriefModalProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (missionId: string) => Promise<void>;
  isVerifying?: boolean;
}

export function MissionBriefModal({
  mission,
  isOpen,
  onClose,
  onVerify,
  isVerifying = false,
}: MissionBriefModalProps) {
  const [showExternalLinkWarning, setShowExternalLinkWarning] = useState(false);
  const [pendingExternalLink, setPendingExternalLink] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  if (!mission) return null;
  if (!isOpen) return null;

  const handleExternalLinkClick = (url: string) => {
    setPendingExternalLink(url);
    setShowExternalLinkWarning(true);
  };

  const confirmExternalLink = () => {
    if (pendingExternalLink) {
      window.open(pendingExternalLink, '_blank', 'noopener,noreferrer');
    }
    setShowExternalLinkWarning(false);
    setPendingExternalLink(null);
  };

  const cancelExternalLink = () => {
    setShowExternalLinkWarning(false);
    setPendingExternalLink(null);
  };

  const handleVerify = async () => {
    await onVerify(mission.missionId);
  };

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(Math.min(difficulty, 3));
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty === 1) return 'BEGINNER';
    if (difficulty === 2) return 'INTERMEDIATE';
    return 'ADVANCED';
  };

  const getMissionIcon = (platform: string) => {
    const icons: Record<string, string> = {
      'MetaMask': '🔑',
      'Faucet': '⚡',
      'Bridge': '💰',
      'Swap': '🔄',
      'NFT': '🎨',
      'DAO': '🏛️',
      'Base': '🌐',
      'Testnet': '⚡',
    };
    return icons[platform] || '🎯';
  };

  return (
    <>
      {/* Main Mission Modal */}
      {!showExternalLinkWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <div
            className="terminal-window max-w-4xl w-full max-h-[90vh] overflow-hidden scanline-overlay"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[var(--void-black)] border-b-8 border-[var(--terminal-green)] p-6 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-[var(--error-red)] border-4 border-[var(--burn-red)] pixel-shadow hover:scale-110 transition-transform"
                aria-label="Close"
              >
                <span className="pixel-text-base text-white">X</span>
              </button>

              {/* Mission Icon */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-[var(--void-black)] border-4 border-[var(--terminal-green)] flex items-center justify-center pixel-shadow-lg mb-4">
                  <span className="text-7xl animate-icon-float">{getMissionIcon(mission.platform)}</span>
                </div>
                <h2 className="pixel-text-2xl text-glow-green text-center mb-3">
                  {mission.title.toUpperCase()}
                </h2>
              </div>

              {/* Metadata Bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 pixel-text-base font-bold">
                <span className="text-[var(--text-secondary)]">
                  {getDifficultyStars(mission.difficulty)} {getDifficultyLabel(mission.difficulty)}
                </span>
                <span className="text-[var(--text-tertiary)]">|</span>
                <span className="text-[var(--text-secondary)]">
                  ⏱️ {mission.timeEstimate}
                </span>
                <span className="text-[var(--text-tertiary)]">|</span>
                <span className="text-[var(--dao-gold)]">
                  ⚡ +{mission.xpReward} XP
                </span>
                {mission.badge && (
                  <>
                    <span className="text-[var(--text-tertiary)]">|</span>
                    <span className="text-[var(--voxel-purple)]">
                      🏆 {mission.badge.name}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto max-h-[calc(90vh-300px)] p-6 space-y-6">
              {/* Mission Lore Section */}
              <section className="bg-[var(--void-black)] border-4 border-[var(--blockchain-blue)] p-4">
                <h3 className="pixel-text-base text-[var(--blockchain-blue)] mb-3 flex items-center gap-2">
                  <span>📜</span>
                  <span>MISSION LORE</span>
                </h3>
                <p className="pixel-text-base text-[var(--text-secondary)] leading-relaxed italic">
                  {mission.lore}
                </p>
              </section>

              {/* Mission Objectives Section */}
              <section className="bg-[var(--void-black)] border-4 border-[var(--terminal-green)] p-4">
                <h3 className="pixel-text-base text-[var(--terminal-green)] mb-4 flex items-center gap-2">
                  <span>🎯</span>
                  <span>MISSION OBJECTIVES</span>
                </h3>

                <div className="space-y-3">
                  {mission.actionPlan.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;
                    const isLocked = index > currentStep;

                    return (
                      <div
                        key={index}
                        className={cn(
                          'flex gap-3 p-3 border-4 border-l-8',
                          isCompleted && 'border-[var(--terminal-green)] bg-[rgba(0,255,65,0.05)]',
                          isActive && 'border-[var(--blockchain-blue)] bg-[rgba(0,217,255,0.05)] animate-pixel-pulse',
                          isLocked && 'border-[var(--terminal-surface)] opacity-50'
                        )}
                      >
                        {/* Step Number/Status */}
                        <div
                          className={cn(
                            'w-10 h-10 flex-shrink-0 border-4 flex items-center justify-center pixel-text-base',
                            isCompleted && 'bg-[var(--terminal-green)] border-[var(--success-green)] text-black',
                            isActive && 'bg-[var(--blockchain-blue)] border-[var(--active-cyan)] text-black',
                            isLocked && 'bg-[var(--void-black)] border-[var(--terminal-surface)] text-[var(--text-tertiary)]'
                          )}
                        >
                          {isCompleted ? '✓' : isActive ? '▶' : index + 1}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <p className="pixel-text-base text-[var(--text-primary)] leading-relaxed">
                            {step}
                          </p>
                          
                          {/* External Link Button */}
                          {isActive && mission.externalLink && index === 0 && (
                            <PixelButton
                              variant="primary"
                              size="sm"
                              className="mt-3"
                              onClick={() => handleExternalLinkClick(mission.externalLink!)}
                            >
                              OPEN PORTAL →
                            </PixelButton>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Security Notes Section */}
              <section className="bg-[var(--void-black)] border-4 border-[var(--warning-orange)] p-4">
                <h3 className="pixel-text-base text-[var(--warning-orange)] mb-3 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>SECURITY NOTES</span>
                </h3>
                <ul className="space-y-2 pixel-text-base text-[var(--warning-orange)] font-bold">
                  <li>• NEVER SHARE YOUR SEED PHRASE WITH ANYONE</li>
                  <li>• STORE YOUR SEED PHRASE OFFLINE IN A SECURE LOCATION</li>
                  <li>• QUEST HUB WILL NEVER ASK FOR YOUR SEED PHRASE</li>
                  <li>• ALWAYS VERIFY URLS BEFORE CONNECTING YOUR WALLET</li>
                </ul>
              </section>

              {/* Rewards Preview */}
              {mission.badge && (
                <section className="bg-gradient-to-br from-[var(--void-black)] to-[var(--pixel-dark)] border-4 border-[var(--dao-gold)] p-4">
                  <h3 className="pixel-text-base text-[var(--dao-gold)] mb-4 flex items-center gap-2">
                    <span>🎁</span>
                    <span>REWARDS</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">⚡</span>
                      <div>
                        <p className="pixel-text-base text-[var(--text-primary)]">+{mission.xpReward} XP</p>
                        <p className="pixel-text-base text-[var(--text-secondary)]">EXPERIENCE POINTS</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🏆</span>
                      <div>
                        <p className="pixel-text-base text-[var(--text-primary)]">{mission.badge.name}</p>
                        <p className="pixel-text-base text-[var(--text-secondary)]">{mission.badge.description}</p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* AURA Tip */}
              <section className="bg-[var(--void-black)] border-4 border-[var(--voxel-purple)] p-4">
                <h3 className="pixel-text-base text-[var(--voxel-purple)] mb-2 flex items-center gap-2">
                  <span>🤖</span>
                  <span>AURA'S TIP</span>
                </h3>
                <p className="pixel-text-base text-[var(--text-secondary)] leading-relaxed">
                  NEED HELP? CLICK THE AURA.EXE BUTTON TO TALK WITH YOUR PERSONAL WEB3 GUIDE.
                </p>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="bg-[var(--void-black)] border-t-8 border-[var(--terminal-green)] p-6 flex gap-4">
              <PixelButton
                variant="secondary"
                size="lg"
                onClick={onClose}
                className="flex-1"
              >
                CLOSE
              </PixelButton>
              <PixelButton
                variant="success"
                size="lg"
                onClick={handleVerify}
                loading={isVerifying}
                disabled={isVerifying}
                className="flex-1"
              >
                {isVerifying ? 'SCANNING...' : '▶ START MISSION'}
              </PixelButton>
            </div>
          </div>
        </div>
      )}

      {/* External Link Warning Modal */}
      {showExternalLinkWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={cancelExternalLink}
        >
          <div
            className="terminal-window max-w-md w-full scanline-overlay"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning Header */}
            <div className="bg-[var(--void-black)] border-b-4 border-[var(--warning-orange)] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 bg-[var(--void-black)] border-4 border-[var(--warning-orange)] flex items-center justify-center">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="pixel-text-xl text-[var(--warning-orange)]">
                  LEAVING<br/>QUEST HUB
                </h3>
              </div>
            </div>

            {/* Warning Content */}
            <div className="p-6 space-y-4">
              <p className="pixel-text-base text-[var(--text-secondary)] leading-relaxed">
                YOU ARE ABOUT TO VISIT AN EXTERNAL WEBSITE. ALWAYS ENSURE THE URL IS CORRECT AND MATCHES THE EXPECTED DESTINATION.
              </p>

              {/* URL Display */}
              <div className="bg-[var(--void-black)] border-2 border-[var(--terminal-surface)] p-3">
                <p className="font-mono text-[12px] text-[var(--text-secondary)] break-all font-bold">
                  {pendingExternalLink}
                </p>
              </div>

              {/* Security Checklist */}
              <div className="bg-[var(--void-black)] border-2 border-[var(--warning-orange)] p-3">
                <p className="pixel-text-base text-[var(--warning-orange)] mb-2 font-bold">SECURITY CHECKLIST:</p>
                <ul className="space-y-1 pixel-text-base text-[var(--text-secondary)]">
                  <li>✓ VERIFY THE URL ABOVE</li>
                  <li>✓ CHECK FOR HTTPS://</li>
                  <li>✓ NEVER SHARE PRIVATE KEYS</li>
                </ul>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="bg-[var(--void-black)] border-t-4 border-[var(--warning-orange)] p-6 flex gap-4">
              <PixelButton
                variant="secondary"
                size="lg"
                onClick={cancelExternalLink}
                className="flex-1"
              >
                CANCEL
              </PixelButton>
              <PixelButton
                variant="warning"
                size="lg"
                onClick={confirmExternalLink}
                className="flex-1"
              >
                CONTINUE →
              </PixelButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
