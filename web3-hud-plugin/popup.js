// Popup script for Web3 Quest Hub HUD

// Update status display
async function updateStatus() {
  try {
    const response = await chrome.runtime.sendMessage({
      type: 'GET_ACTIVE_QUEST'
    });

    const statusEl = document.getElementById('status');
    const questContainer = document.getElementById('quest-container');

    if (response.success && response.data) {
      // Active quest exists
      statusEl.className = 'status connected';
      statusEl.innerHTML = `
        <div class="status-dot"></div>
        <span>Active Quest Running</span>
      `;

      questContainer.innerHTML = `
        <div class="quest-info">
          <div class="quest-title">Quest: ${response.data.questId}</div>
          <div class="quest-step">Step ${response.data.currentStep}</div>
        </div>
      `;
    } else {
      // No active quest
      statusEl.className = 'status disconnected';
      statusEl.innerHTML = `
        <div class="status-dot"></div>
        <span>No Active Quest</span>
      `;

      questContainer.innerHTML = `
        <div class="no-quest">
          <div class="no-quest-icon">🎯</div>
          <div>No active quest</div>
          <div style="font-size: 11px; margin-top: 8px;">Start a quest from the dashboard</div>
        </div>
      `;
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

// Open dashboard link
document.getElementById('open-dashboard').addEventListener('click', (e) => {
  e.preventDefault();
  // TODO: Replace with actual dashboard URL
  chrome.tabs.create({ url: 'http://localhost:3000/dashboard' });
});

// Initialize
updateStatus();
