// Web3 Quest Hub HUD - Content Script
// Injects HUD UI, monitors wallet interactions, and provides security alerts

console.log('Web3 Quest Hub HUD - Content Script Loaded');

// HUD state
let hudElement = null;
let currentStatus = 'NONE';
let currentQuestData = null;

// Initialize HUD
function initializeHUD() {
  if (hudElement) return;

  hudElement = document.createElement('div');
  hudElement.id = 'web3-quest-hub-hud';
  hudElement.className = 'w3qh-hud-container';
  document.body.appendChild(hudElement);

  console.log('HUD initialized');
}

// Update HUD display
function updateHUD(status, data = {}) {
  if (!hudElement) initializeHUD();

  currentStatus = status;
  currentQuestData = data;

  let content = '';
  let className = 'w3qh-hud-container';

  switch (status) {
    case 'VERIFIED':
      className += ' w3qh-verified';
      content = `
        <div class="w3qh-hud-content">
          <div class="w3qh-status-icon">✓</div>
          <div class="w3qh-status-text">
            <div class="w3qh-title">Verified Portal</div>
            <div class="w3qh-subtitle">This site is safe for your quest</div>
          </div>
        </div>
      `;
      break;

    case 'UNVERIFIED':
      className += ' w3qh-unverified';
      content = `
        <div class="w3qh-hud-content">
          <div class="w3qh-status-icon">⚠️</div>
          <div class="w3qh-status-text">
            <div class="w3qh-title">Unverified Site</div>
            <div class="w3qh-subtitle">Not on quest whitelist - proceed with caution</div>
          </div>
        </div>
      `;
      break;

    case 'NONE':
    default:
      // Hide HUD when no active quest
      hudElement.style.display = 'none';
      return;
  }

  hudElement.className = className;
  hudElement.innerHTML = content;
  hudElement.style.display = 'block';

  console.log('HUD updated:', status);
}

// Show completion toast
function showCompletionToast(questId, xpGained) {
  const toast = document.createElement('div');
  toast.className = 'w3qh-completion-toast';
  toast.innerHTML = `
    <div class="w3qh-toast-content">
      <div class="w3qh-toast-icon">🎉</div>
      <div class="w3qh-toast-text">
        <div class="w3qh-toast-title">Quest Completed!</div>
        <div class="w3qh-toast-subtitle">+${xpGained} XP Earned</div>
      </div>
    </div>
  `;

  document.body.appendChild(toast);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('w3qh-toast-fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 5000);

  console.log('Completion toast shown');
}

// Monitor wallet interactions
function monitorWalletInteractions() {
  if (typeof window.ethereum === 'undefined') {
    console.log('No wallet detected on this page');
    return;
  }

  console.log('Wallet detected, monitoring transactions...');

  // Wrap ethereum.request to intercept calls
  const originalRequest = window.ethereum.request;

  window.ethereum.request = async function (args) {
    console.log('Wallet request intercepted:', args);

    // Check for transaction requests
    if (args.method === 'eth_sendTransaction') {
      const shouldProceed = await analyzeTransaction(args.params[0]);
      if (!shouldProceed) {
        throw new Error('Transaction cancelled by user');
      }
    }

    // Call original method
    return originalRequest.call(this, args);
  };
}

// Analyze transaction for risks
async function analyzeTransaction(txParams) {
  console.log('Analyzing transaction:', txParams);

  const risks = [];

  // Check for unlimited approvals
  if (txParams.data) {
    const dataStr = txParams.data.toLowerCase();
    
    // Check for max uint256 (unlimited approval)
    if (dataStr.includes('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')) {
      risks.push({
        level: 'high',
        message: 'This transaction requests UNLIMITED token approval. This allows the contract to spend all your tokens.',
      });
    }

    // Check for setApprovalForAll
    if (dataStr.startsWith('0xa22cb465')) {
      risks.push({
        level: 'high',
        message: 'This transaction uses setApprovalForAll. The contract will have full control over your NFTs.',
      });
    }
  }

  // Show warning if risks detected
  if (risks.length > 0) {
    return await showTransactionWarning(risks, txParams);
  }

  return true; // Proceed with transaction
}

// Show transaction warning modal
function showTransactionWarning(risks, txParams) {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.className = 'w3qh-warning-modal';
    modal.innerHTML = `
      <div class="w3qh-modal-backdrop"></div>
      <div class="w3qh-modal-content">
        <div class="w3qh-modal-header">
          <div class="w3qh-modal-icon">⚠️</div>
          <h2>Transaction Risk Detected</h2>
        </div>
        <div class="w3qh-modal-body">
          ${risks.map(risk => `
            <div class="w3qh-risk-item w3qh-risk-${risk.level}">
              <strong>${risk.level.toUpperCase()} RISK:</strong> ${risk.message}
            </div>
          `).join('')}
          <p class="w3qh-modal-advice">
            Only proceed if you trust this website and understand the risks.
          </p>
        </div>
        <div class="w3qh-modal-footer">
          <button class="w3qh-btn w3qh-btn-cancel" id="w3qh-cancel-tx">Cancel Transaction</button>
          <button class="w3qh-btn w3qh-btn-proceed" id="w3qh-proceed-tx">Proceed Anyway</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Handle button clicks
    document.getElementById('w3qh-cancel-tx').addEventListener('click', () => {
      modal.remove();
      resolve(false);
    });

    document.getElementById('w3qh-proceed-tx').addEventListener('click', () => {
      modal.remove();
      resolve(true);
    });
  });
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message);

  switch (message.type) {
    case 'DOMAIN_STATUS':
      updateHUD(message.data.status, message.data);
      sendResponse({ success: true });
      break;

    case 'SHOW_COMPLETION':
      showCompletionToast(message.data.questId, message.data.xpGained);
      sendResponse({ success: true });
      break;

    default:
      console.warn('Unknown message type:', message.type);
  }
});

// Initialize on page load
function initialize() {
  initializeHUD();
  monitorWalletInteractions();

  // Request current status from background
  chrome.runtime.sendMessage(
    { type: 'GET_ACTIVE_QUEST' },
    (response) => {
      if (response && response.success && response.data) {
        console.log('Active quest retrieved:', response.data);
        // Background will send domain status via onUpdated listener
      }
    }
  );
}

// Run initialization
initialize();
