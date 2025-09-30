// Web3 Quest Hub HUD - Background Service Worker
// Manages quest state and communicates with web app and content scripts

console.log('Web3 Quest Hub HUD - Background Service Worker Initialized');

// Storage keys
const STORAGE_KEYS = {
  ACTIVE_QUEST: 'activeQuest',
  USER_STATE: 'userState',
};

// Message types
const MESSAGE_TYPES = {
  SET_ACTIVE_QUEST: 'SET_ACTIVE_QUEST',
  QUEST_COMPLETED: 'QUEST_COMPLETED',
  GET_ACTIVE_QUEST: 'GET_ACTIVE_QUEST',
  DOMAIN_CHECK: 'DOMAIN_CHECK',
};

// Listen for messages from web app
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);

  switch (message.type) {
    case MESSAGE_TYPES.SET_ACTIVE_QUEST:
      handleSetActiveQuest(message.data, sendResponse);
      return true; // Will respond asynchronously

    case MESSAGE_TYPES.QUEST_COMPLETED:
      handleQuestCompleted(message.data, sendResponse);
      return true;

    case MESSAGE_TYPES.GET_ACTIVE_QUEST:
      handleGetActiveQuest(sendResponse);
      return true;

    default:
      console.warn('Unknown message type:', message.type);
      sendResponse({ success: false, error: 'Unknown message type' });
  }
});

// Handle setting active quest
async function handleSetActiveQuest(data, sendResponse) {
  try {
    await chrome.storage.local.set({
      [STORAGE_KEYS.ACTIVE_QUEST]: {
        questId: data.questId,
        currentStep: data.currentStep,
        whitelistedDomains: data.whitelistedDomains,
        timestamp: Date.now(),
      },
    });

    console.log('Active quest set:', data);
    sendResponse({ success: true });
  } catch (error) {
    console.error('Error setting active quest:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Handle quest completion
async function handleQuestCompleted(data, sendResponse) {
  try {
    // Clear active quest
    await chrome.storage.local.remove(STORAGE_KEYS.ACTIVE_QUEST);

    // Notify all content scripts about completion
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHOW_COMPLETION',
          data: {
            questId: data.questId,
            xpGained: data.xpGained,
          },
        }).catch(() => {
          // Tab may not have content script, ignore error
        });
      }
    }

    console.log('Quest completed:', data);
    sendResponse({ success: true });
  } catch (error) {
    console.error('Error handling quest completion:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Handle getting active quest
async function handleGetActiveQuest(sendResponse) {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_QUEST);
    sendResponse({ success: true, data: result[STORAGE_KEYS.ACTIVE_QUEST] || null });
  } catch (error) {
    console.error('Error getting active quest:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Monitor tab updates to check domains
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only process when the page has loaded
  if (changeInfo.status !== 'complete' || !tab.url) {
    return;
  }

  try {
    const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_QUEST);
    const activeQuest = result[STORAGE_KEYS.ACTIVE_QUEST];

    if (!activeQuest) {
      // No active quest, send NONE status
      chrome.tabs.sendMessage(tabId, {
        type: 'DOMAIN_STATUS',
        data: { status: 'NONE' },
      }).catch(() => {
        // Content script may not be ready, ignore
      });
      return;
    }

    // Extract domain from URL
    const url = new URL(tab.url);
    const domain = url.hostname;

    // Check if domain is whitelisted
    const isWhitelisted = activeQuest.whitelistedDomains.some(whitelisted =>
      domain.includes(whitelisted) || whitelisted.includes(domain)
    );

    const status = isWhitelisted ? 'VERIFIED' : 'UNVERIFIED';

    // Send status to content script
    chrome.tabs.sendMessage(tabId, {
      type: 'DOMAIN_STATUS',
      data: {
        status,
        questId: activeQuest.questId,
        currentStep: activeQuest.currentStep,
        domain,
      },
    }).catch(() => {
      // Content script may not be ready, ignore
    });

    console.log(`Domain check for ${domain}: ${status}`);
  } catch (error) {
    console.error('Error checking domain:', error);
  }
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Web3 Quest Hub HUD installed:', details.reason);
  
  if (details.reason === 'install') {
    // Open welcome page or show notification
    console.log('Welcome to Web3 Quest Hub HUD!');
  }
});
