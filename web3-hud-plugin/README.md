# Web3 Quest Hub HUD - Browser Extension

A companion browser extension that provides real-time security alerts and quest tracking while users explore Web3 dApps.

## Features

- **Domain Verification**: Real-time verification of websites against quest whitelists
- **Transaction Monitoring**: Detects risky transactions and provides pre-flight warnings
- **Quest Tracking**: Displays current quest progress and step descriptions
- **Security Alerts**: Warns users about unlimited approvals and suspicious contracts
- **Completion Notifications**: Celebrates quest completions with visual feedback

## Installation (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `web3-hud-plugin` directory
5. The extension icon should appear in your browser toolbar

## File Structure

```
web3-hud-plugin/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Service worker for state management
├── content_script.js      # Injected script for HUD and wallet monitoring
├── popup.html             # Extension popup interface
├── popup.js               # Popup functionality
├── styles/
│   └── hud.css           # HUD styling
└── images/
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

## How It Works

### Background Script
- Listens for messages from the Web3 Quest Hub web app
- Stores active quest state in Chrome storage
- Monitors tab navigation to verify domains
- Sends domain verification status to content scripts

### Content Script
- Injects HUD UI into web pages
- Displays domain verification status (verified/unverified)
- Monitors `window.ethereum` for transaction requests
- Analyzes transactions for common risks
- Shows warning modals for risky transactions
- Displays completion toasts when quests are completed

### Communication Flow
1. Web app sends active quest info to extension
2. Background script stores quest state
3. User navigates to a website
4. Background checks domain against whitelist
5. Content script receives status and updates HUD
6. User initiates wallet transaction
7. Content script analyzes and warns if risky
8. User completes quest action
9. Web app notifies extension
10. Content script shows celebration toast

## Permissions

- `storage`: Store active quest state
- `tabs`: Monitor tab navigation
- `scripting`: Inject content scripts
- `<all_urls>`: Access all websites for HUD injection

## Development

### Testing
1. Load the extension in Chrome
2. Open the Web3 Quest Hub web app
3. Start a quest
4. Navigate to a whitelisted site (e.g., app.uniswap.org)
5. Verify HUD shows "Verified Portal"
6. Navigate to a non-whitelisted site
7. Verify HUD shows "Unverified Site" warning

### Debugging
- Open Chrome DevTools on any page to see content script logs
- Right-click extension icon > "Inspect popup" to debug popup
- Go to `chrome://extensions/` and click "Inspect views: service worker" to debug background script

## Production Build

Before publishing:
1. Create actual icon images (16x16, 48x48, 128x128)
2. Update manifest.json with correct URLs and permissions
3. Test on multiple browsers (Chrome, Edge, Firefox)
4. Create privacy policy
5. Submit to Chrome Web Store

## Security Considerations

- Never request or store private keys
- All wallet interactions are monitored, not intercepted
- Users can always cancel risky transactions
- Domain verification is for guidance only
- Regular security audits recommended

## TODO

- [ ] Add actual icon images
- [ ] Implement more sophisticated risk analysis
- [ ] Add support for Firefox and Edge
- [ ] Create settings page for customization
- [ ] Add notification preferences
- [ ] Implement contract verification against known scam database
