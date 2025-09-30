# 🚀 Deploy Now - Quick Start

Complete deployment in 5 simple steps.

---

## Before You Start

- ✅ Firebase CLI installed: `npm install -g firebase-tools`
- ✅ Logged in: `firebase login`
- ✅ Firebase project created (web3questhub)

---

## Step 1: Deploy Firestore Rules (1 minute)

```powershell
cd "C:\Users\Japan\OneDrive\Documents\GitHub\Web3QuestHub"
firebase deploy --only firestore:rules
```

**What this does:**
- Deploys security rules for all 12 collections
- Protects user data (users can only access their own data)
- Makes quest/badge catalogs read-only
- Enables HUD sync and AURA conversations

**Verify:** https://console.firebase.google.com/project/web3questhub/firestore/rules

---

## Step 2: Deploy Firestore Indexes (2 minutes)

```powershell
firebase deploy --only firestore:indexes
```

**What this does:**
- Creates database indexes for efficient queries
- Indexes will build in background (watch console)

**Verify:** https://console.firebase.google.com/project/web3questhub/firestore/indexes

---

## Step 3: Populate Firestore Database (5 minutes)

### Option A: Using Admin SDK Script (Recommended)

**1. Get Service Account Key:**
- Go to: https://console.firebase.google.com/project/web3questhub/settings/serviceaccounts
- Click "Generate new private key"
- Save as `firebase-service-account.json` in project root
- **IMPORTANT**: This file is gitignored, never commit it!

**2. Run population script:**
```powershell
cd scripts
npm install
node populate-firestore.js
```

**Expected output:**
```
🚀 Starting Firestore population...
Project ID: web3questhub

📦 Uploading user_profile...
   ✅ user_profile: 3 documents uploaded

📦 Uploading mission_catalog...
   ✅ mission_catalog: 15 documents uploaded

[... more collections ...]

✅ COMPLETE: 150+ total documents uploaded
🎉 Firestore database populated successfully!
```

### Option B: Manual Import via Console

If the script doesn't work, import manually:
1. Go to: https://console.firebase.google.com/project/web3questhub/firestore
2. For each collection in `firestore_sample_data.json`:
   - Click "Start collection"
   - Add collection name
   - Add documents one by one

---

## Step 4: Deploy Cloud Functions (10 minutes)

### 4a. Set Environment Variables

```powershell
cd "C:\Users\Japan\OneDrive\Documents\GitHub\Web3QuestHub"

# Set Gemini API key (get from https://aistudio.google.com/apikey)
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY_HERE"

# Set Alchemy API key (get from https://dashboard.alchemy.com/)
firebase functions:config:set alchemy.api_key="YOUR_ALCHEMY_API_KEY_HERE"

# View config
firebase functions:config:get
```

### 4b. Build and Deploy Functions

```powershell
cd firebase-functions

# Install dependencies
npm install

# Build TypeScript
npm run build

# Deploy functions
firebase deploy --only functions
```

**Functions deployed:**
- `verifyMissionCompletion` - On-chain verification
- `getAuraResponse` - AI companion responses

**Verify:** https://console.firebase.google.com/project/web3questhub/functions

---

## Step 5: Test Everything (5 minutes)

### Test Firestore Data

Open Firebase Console → Firestore Database:
- ✅ Should see 12 collections
- ✅ user_profile: 3 users (alice, bob, charlie)
- ✅ mission_catalog: 15+ missions
- ✅ expedition_catalog: 3 expeditions

### Test Security Rules

In your Next.js app console:
```javascript
// Should WORK (public read)
const missions = await getDocs(collection(db, 'mission_catalog'));
console.log('Missions:', missions.size); // ✅ Should show count

// Should FAIL (not authenticated)
const users = await getDocs(collection(db, 'user_profile'));
console.log('Users:', users.size); // ❌ Should error: Permission denied
```

### Test Cloud Functions

```javascript
import { functions } from '@/lib/firebase/config';
import { httpsCallable } from 'firebase/functions';

// Test AURA
const getAura = httpsCallable(functions, 'getAuraResponse');
const result = await getAura({
  userId: 'user_001_alice',
  message: 'What is DeFi?'
});
console.log('AURA Response:', result.data.response);

// Test verification
const verify = httpsCallable(functions, 'verifyMissionCompletion');
const verifyResult = await verify({
  userId: 'user_001_alice',
  missionId: 'mission_001',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1'
});
console.log('Verification:', verifyResult.data);
```

---

## ✅ Deployment Complete!

Your Web3 Quest Hub backend is now live with:

**Firestore Database:**
- 12 collections with sample data
- 3 sample users (alice, bob, charlie)
- 15+ missions across 3 expeditions
- Security rules protecting user data
- Efficient indexes for queries

**Cloud Functions:**
- AI companion (AURA) powered by Gemini
- On-chain verification using Alchemy
- Secure backend for sensitive operations

**Next Steps:**
1. Enable Authentication in Firebase Console
2. Test user registration and login
3. Test quest completion flow
4. Build and deploy Next.js app
5. Load browser extension

---

## 🐛 Troubleshooting

### Rules deployment failed
```powershell
# Check Firebase project
firebase use web3questhub

# Re-authenticate
firebase login --reauth

# Try again
firebase deploy --only firestore:rules
```

### Data import failed
```powershell
# Check service account key exists
ls firebase-service-account.json

# Check file has correct permissions
# Make sure it's in project root

# Check script dependencies
cd scripts
npm install
```

### Functions deployment failed
```powershell
# Check TypeScript compiles
cd firebase-functions
npm run build

# Check for errors in build output
# Fix any TypeScript errors

# Try deploying one function at a time
firebase deploy --only functions:getAuraResponse
firebase deploy --only functions:verifyMissionCompletion
```

### Can't set environment variables
```powershell
# Make sure you're in project root
cd "C:\Users\Japan\OneDrive\Documents\GitHub\Web3QuestHub"

# Check Firebase project
firebase use

# Set variables one at a time
firebase functions:config:set gemini.api_key="YOUR_KEY"
```

---

## 📊 What Got Deployed

| Component | Status | URL |
|-----------|--------|-----|
| Firestore Rules | ✅ Deployed | [View](https://console.firebase.google.com/project/web3questhub/firestore/rules) |
| Firestore Indexes | ✅ Deployed | [View](https://console.firebase.google.com/project/web3questhub/firestore/indexes) |
| Sample Data | ✅ Imported | [View](https://console.firebase.google.com/project/web3questhub/firestore/data) |
| Cloud Functions | ✅ Deployed | [View](https://console.firebase.google.com/project/web3questhub/functions) |

**Functions Endpoints:**
- `https://us-central1-web3questhub.cloudfunctions.net/getAuraResponse`
- `https://us-central1-web3questhub.cloudfunctions.net/verifyMissionCompletion`

---

## 🎉 You're Ready!

All backend services are live and ready for your Next.js app to connect!

**Start developing:**
```powershell
cd web3-quest-hub-app
npm run dev
```

Open http://localhost:3000 and start building! 🚀
