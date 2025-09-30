# Getting Started with Web3 Quest Hub

This guide will help you set up and run the Web3 Quest Hub platform locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and **npm** ([Download](https://nodejs.org/))
- **Firebase CLI**: `npm install -g firebase-tools`
- **Git** ([Download](https://git-scm.com/))
- **Google Chrome** (for extension testing)

You'll also need:
- A Firebase project ([Create one](https://console.firebase.google.com))
- Google Gemini API key ([Get one](https://makersuite.google.com/app/apikey))
- Alchemy API key ([Get one](https://www.alchemy.com/))

## 🚀 Quick Start (5 Steps)

### Step 1: Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" and follow the wizard
3. Enable **Firebase Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" and "Google"
4. Create **Firestore Database**:
   - Go to Firestore Database → Create database
   - Choose "Start in production mode"
   - Select location (e.g., us-central1)
5. Get your Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps" → Add web app
   - Copy the configuration object

### Step 2: Next.js Application Setup

```bash
# Navigate to the app directory
cd Web3QuestHub/web3-quest-hub-app

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your Firebase config
# Open in your preferred editor and paste Firebase values
```

Your `.env.local` should look like:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_EXTENSION_ID=chrome-extension-id-here
```

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Step 3: Firebase Functions Setup

```bash
# Navigate to functions directory
cd ../firebase-functions

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your API keys
```

Your `.env` should contain:
```env
GEMINI_API_KEY=your-gemini-api-key
ALCHEMY_API_KEY=your-alchemy-api-key
```

```bash
# Login to Firebase (if not already)
firebase login

# Initialize Firebase in the root directory
cd ..
firebase init

# When prompted:
# - Select: Firestore, Functions, Hosting
# - Use existing project: Select your Firebase project
# - Firestore rules: firestore.rules
# - Functions language: TypeScript
# - Functions source directory: firebase-functions
# - Hosting directory: web3-quest-hub-app/out

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Test functions locally (optional)
cd firebase-functions
npm run serve

# Deploy functions to production
npm run deploy
```

### Step 4: Populate Initial Data

You need to add sample data to Firestore manually:

#### Create Levels Collection

Go to [Firestore Console](https://console.firebase.google.com/project/_/firestore) and create:

Collection: `levels`

Documents:
- `1`: `{ title: "Newbie", cumulativeXpRequired: 0, unlockDescription: "Welcome, Explorer!" }`
- `2`: `{ title: "Cadet", cumulativeXpRequired: 500, unlockDescription: "You're learning fast!" }`
- `3`: `{ title: "Apprentice", cumulativeXpRequired: 1250, unlockDescription: "The basics are mastered" }`
- Continue for levels 4-10 (see TRD-W3QH-V1.0 Section 4.A)

#### Create Sample Quests

Collection: `quests`

Sample document `wallet-genesis`:
```json
{
  "title": "Wallet Genesis",
  "expeditionId": "digital-frontier",
  "difficulty": "Beginner",
  "xpReward": 100,
  "badge": {
    "id": "wallet-master",
    "name": "Wallet Master",
    "iconUrl": ""
  },
  "lore": "Every explorer needs a secure vessel to carry their digital assets. Your first quest is to create and secure your Web3 wallet.",
  "actionPlan": [
    "Install MetaMask browser extension",
    "Create a new wallet",
    "Securely save your seed phrase",
    "Never share your private keys with anyone"
  ],
  "verification": {
    "type": "balance_check",
    "params": {
      "targetChainId": 1,
      "tokenAddress": "ETH",
      "minAmount": 0
    }
  },
  "whitelistedDomains": ["metamask.io"]
}
```

Create at least 3-5 sample quests following this pattern.

### Step 5: Browser Extension Setup

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `Web3QuestHub/web3-hud-plugin` directory
5. Note the Extension ID that appears
6. Add the Extension ID to `.env.local` in the Next.js app:
   ```env
   NEXT_PUBLIC_EXTENSION_ID=your-extension-id-here
   ```
7. Restart the Next.js dev server

## ✅ Verify Installation

### Test 1: Registration
1. Open `http://localhost:3000`
2. Click "Create Account"
3. Register with email and password
4. Verify you're redirected to the dashboard

### Test 2: Dashboard
1. Check that you see "No quests available" or your sample quests
2. Verify the progress sidebar shows Level 1, 0 XP
3. Click on a quest to open the mission brief

### Test 3: AURA Chat
1. Click the floating chat button (🤖) in bottom-right
2. Type "Hello" and send
3. Verify you get a response from AURA

### Test 4: Extension
1. With the extension loaded, start a quest from the dashboard
2. Navigate to one of the whitelisted domains
3. Check if the HUD appears showing "Verified Portal"

## 📝 Next Steps

After successful setup:

1. **Customize Quests**: Add more quests with different verification types
2. **Test Verification**: Complete a quest and test the verification flow
3. **Explore AURA**: Test different conversation scenarios
4. **Extension Testing**: Test transaction monitoring on dApps

## 🔧 Common Issues

### Issue: "Firebase not initialized"
**Solution**: Check that `.env.local` has correct Firebase config and restart dev server

### Issue: "Functions not found"
**Solution**: Deploy functions with `firebase deploy --only functions`

### Issue: "Extension not communicating"
**Solution**: 
- Verify Extension ID in `.env.local` matches actual extension
- Check extension is loaded in `chrome://extensions/`
- Reload extension after changes

### Issue: "AURA not responding"
**Solution**: 
- Verify GEMINI_API_KEY in functions `.env`
- Check function logs: `firebase functions:log`
- Test function in Firebase Console

### Issue: "Verification failing"
**Solution**:
- Verify ALCHEMY_API_KEY is set
- Check wallet address is set in user profile
- Review function logs for errors

## 📚 Development Workflow

### Making Changes

1. **Frontend Changes**: Edit files in `web3-quest-hub-app/`, hot reload is automatic
2. **Function Changes**: Edit in `firebase-functions/src/`, run `npm run deploy`
3. **Extension Changes**: Edit files in `web3-hud-plugin/`, reload extension in Chrome

### Testing

```bash
# Type checking
cd web3-quest-hub-app
npm run type-check

# Build test
npm run build

# Firebase emulators (optional)
cd ..
firebase emulators:start
```

### Git Workflow

```bash
# After making changes
git status
git add .
git commit -m "Description of changes"
git push
```

## 📖 Additional Resources

- **IMPLEMENTATION_PLAN.md**: Full technical architecture
- **TASKLIST.md**: Detailed development tasks
- **TSD-W3QH-V1.0.txt**: Technical specifications
- **TRD-W3QH-V1.0.txt**: Technical requirements
- **README.md**: Project overview

## 🆘 Getting Help

If you encounter issues:

1. Check the console for error messages
2. Review Firebase Console for auth/firestore errors
3. Check function logs: `firebase functions:log`
4. Verify environment variables are set correctly
5. Try clearing browser cache and restarting servers

## 🎉 You're Ready!

Once everything is working, you have a fully functional Web3 Quest Hub demo with:
- User authentication and profiles
- Quest system with gamification
- AI companion (AURA)
- Browser extension for security
- On-chain verification system

Happy building! 🚀
