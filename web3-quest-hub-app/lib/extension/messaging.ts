/**
 * Utility functions for communicating with the Web3 HUD browser extension
 */

const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || '';

export const sendToExtension = async (message: any): Promise<void> => {
  // Check if chrome runtime is available (browser extension APIs)
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    console.warn('Browser extension API not available');
    return;
  }

  try {
    await chrome.runtime.sendMessage(EXTENSION_ID, message);
  } catch (error) {
    console.warn('Failed to send message to extension:', error);
  }
};

export const sendActiveQuest = async (questData: {
  questId: string;
  currentStep: number;
  whitelistedDomains: string[];
}) => {
  await sendToExtension({
    type: 'SET_ACTIVE_QUEST',
    data: questData,
  });
};

export const sendQuestCompleted = async (questId: string, xpGained: number) => {
  await sendToExtension({
    type: 'QUEST_COMPLETED',
    data: { questId, xpGained },
  });
};
