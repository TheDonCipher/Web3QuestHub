'use client';

import React, { useState } from 'react';
import { Quest } from '@/lib/types';
import { verifyMissionCompletion } from '@/lib/firebase/functions';
import { sendActiveQuest } from '@/lib/extension/messaging';

interface MissionBriefModalProps {
  quest: Quest;
  isOpen: boolean;
  onClose: () => void;
}

export default function MissionBriefModal({ quest, isOpen, onClose }: MissionBriefModalProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleStartQuest = async () => {
    // Send quest info to browser extension
    await sendActiveQuest({
      questId: quest.questId,
      currentStep: 1,
      whitelistedDomains: quest.whitelistedDomains || [],
    });

    // TODO: Update quest status to in-progress in Firestore
    alert('Quest started! Check the browser extension HUD for guidance.');
  };

  const handleVerifyCompletion = async () => {
    setIsVerifying(true);
    setError('');

    try {
      const result = await verifyMissionCompletion({ questId: quest.questId });
      setVerificationResult(result.data);
      
      if (result.data.success) {
        alert(`Quest completed! You earned ${result.data.xpGained} XP!`);
        // Refresh the page or update state
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="max-w-2xl w-full cyber-border rounded-lg bg-black/90 p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-glow mb-2">{quest.title}</h2>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-cyan-500">{quest.difficulty}</span>
              <span className="text-yellow-500">+{quest.xpReward} XP</span>
              <span className="text-purple-500">{quest.badge?.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">Mission Lore</h3>
            <p className="text-gray-300">{quest.lore}</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Action Plan</h3>
            <ol className="space-y-2">
              {quest.actionPlan.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-6 h-6 rounded-full bg-cyan-600 text-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {quest.whitelistedDomains && quest.whitelistedDomains.length > 0 && (
            <section>
              <h3 className="text-xl font-semibold mb-3">Verified Portals</h3>
              <div className="space-y-2">
                {quest.whitelistedDomains.map((domain, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <a
                      href={`https://${domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-500 hover:underline"
                    >
                      {domain}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {error && (
            <div className="bg-red-900/30 border border-red-500 rounded p-4 text-red-300">
              {error}
            </div>
          )}

          {verificationResult && verificationResult.success && (
            <div className="bg-green-900/30 border border-green-500 rounded p-4 text-green-300">
              Quest completed! You earned {verificationResult.xpGained} XP
              {verificationResult.leveledUp && ` and reached level ${verificationResult.newLevel}!`}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleStartQuest}
              className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-700 rounded font-semibold"
            >
              Start Quest
            </button>
            <button
              onClick={handleVerifyCompletion}
              disabled={isVerifying}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded font-semibold disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : 'Verify Completion'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
