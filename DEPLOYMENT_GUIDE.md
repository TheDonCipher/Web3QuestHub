# 🚀 Deployment Guide - Web3 Quest Hub

Complete guide to deploy Firestore data, security rules, and Cloud Functions.

---

## Prerequisites

Before deploying, ensure you have:
- ✅ Firebase project created (`web3questhub`)
- ✅ Firebase CLI installed (`npm install -g firebase-tools`)
- ✅ Logged into Firebase (`firebase login`)
- ✅ Firebase initialized in project directory

---

## 📦 Step 1: Populate Firestore Database

### Option A: Using Firebase Admin SDK (Recommended)

**1. Get Service Account Key:**
```bash
# Go to: https://console.firebase.google.com/project/web3questhub/settings/serviceaccounts
# Click "Generate new private key"
# Save as: firebase-service-account.json (DO NOT commit this!)
```

**2. Add to .gitignore:**
```bash
echo "firebase-service-account.json" >> .gitignore
```

**3. Install dependencies and run script:**
```bash
cd scripts
npm install
node populate-firestore.js
```

### Option B: Manual Upload via Firebase Console

1. Go to: https://console.firebase.google.com/project/web3questhub/firestore
2. Create each collection manually
3. Add documents one by one (tedious but works for small datasets)

---

## 🔒 Step 2: Deploy Firestore Security Rules

Your security rules are already defined in `firestore.rules` per TSD specifications.

**Deploy rules:**
```bash
cd "C:\Users\Japan\OneDrive\Documents\GitHub\Web3QuestHub"
firebase deploy --only firestore:rules
```

**Verify deployment:**
1. Go to: https://console.firebase.google.com/project/web3questhub/firestore/rules
2. Check that rules match `firestore.rules` file
3. Test rules with the Firebase Rules Playground

---

## 📊 Step 3: Deploy Firestore Indexes

**Deploy indexes:**
```bash
firebase deploy --only firestore:indexes
```

**Verify indexes:**
- Go to: https://console.firebase.google.com/project/web3questhub/firestore/indexes
- Wait for indexes to build (can take a few minutes)
- Status should show "Enabled" when ready

---

## ⚡ Step 4: Deploy Cloud Functions

### Prerequisites

**1. Set environment variables for Cloud Functions:**
```bash
cd firebase-functions

# Set Gemini API key
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"

# Set Alchemy API key
firebase functions:config:set alchemy.api_key="YOUR_ALCHEMY_API_KEY"

# View current config
firebase functions:config:get
```

**2. Install dependencies:**
```bash
cd firebase-functions
npm install
```

**3. Build TypeScript:**
```bash
npm run build
```

### Deploy Functions

**Deploy all functions:**
```bash
firebase deploy --only functions
```

**Deploy specific function:**
```bash
# Deploy only verifyMissionCompletion
firebase deploy --only functions:verifyMissionCompletion

# Deploy only getAuraResponse
firebase deploy --only functions:getAuraResponse
```

**Verify deployment:**
1. Go to: https://console.firebase.google.com/project/web3questhub/functions
2. Check that functions are listed and status is "Healthy"
3. View logs: `firebase functions:log`

---

## 🌐 Step 5: Deploy Hosting (Optional)

If you want to deploy the Next.js app to Firebase Hosting:

**1. Build the Next.js app:**
```bash
cd web3-quest-hub-app
npm run build
```

**2. Configure firebase.json hosting:**
Make sure `firebase.json` has the correct hosting config pointing to Next.js output.

**3. Deploy hosting:**
```bash
cd ..
firebase deploy --only hosting
```

**Your app will be available at:**
- https://web3questhub.web.app
- https://web3questhub.firebaseapp.com

---

## 🧪 Step 6: Verify Everything Works

### Test Firestore Data

```javascript
// In your Next.js app or Firebase console
import { db } from '@/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const missionsSnap = await getDocs(collection(db, 'mission_catalog'));
console.log(`✅ Missions: ${missionsSnap.size} documents`);

const usersSnap = await getDocs(collection(db, 'user_profile'));
console.log(`✅ Users: ${usersSnap.size} documents`);
```

### Test Security Rules

Try accessing data without authentication - should be denied:
```javascript
// Should FAIL (user not authenticated)
const userRef = doc(db, 'user_profile', 'user_001_alice');
await getDoc(userRef); // ❌ Permission denied
```

Try accessing your own data after auth - should work:
```javascript
// Should SUCCEED (user authenticated and accessing own data)
await signInWithEmail('alice@example.com', 'password');
const userRef = doc(db, 'user_profile', auth.currentUser.uid);
await getDoc(userRef); // ✅ Success
```

### Test Cloud Functions

```javascript
import { functions } from '@/lib/firebase/config';
import { httpsCallable } from 'firebase/functions';

// Test AURA response
const getAuraResponse = httpsCallable(functions, 'getAuraResponse');
const result = await getAuraResponse({
  userId: 'user_001_alice',
  message: 'What is DeFi?',
  currentContext: {}
});
console.log('AURA:', result.data.response);

// Test mission verification
const verifyMission = httpsCallable(functions, 'verifyMissionCompletion');
const verifyResult = await verifyMission({
  userId: 'user_001_alice',
  missionId: 'mission_001',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1'
});
console.log('Verification:', verifyResult.data);
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Firebase project created
- [ ] Firebase CLI installed and authenticated
- [ ] Service account key downloaded (for data import)
- [ ] Gemini API key obtained
- [ ] Alchemy API key obtained
- [ ] All environment variables configured

### Firestore
- [ ] Sample data uploaded
- [ ] Security rules deployed
- [ ] Indexes deployed and built
- [ ] Data verified in console
- [ ] Security rules tested

### Functions
- [ ] Dependencies installed
- [ ] TypeScript compiled successfully
- [ ] Environment variables set
- [ ] Functions deployed
- [ ] Functions tested and working
- [ ] Logs checked for errors

### Hosting (Optional)
- [ ] Next.js app built
- [ ] Hosting deployed
- [ ] App accessible at web.app URL
- [ ] No errors in browser console

---

## 🔄 Update Workflow

When you need to update after deployment:

### Update Firestore Data
```bash
# Re-run the population script (will overwrite existing data)
cd scripts
node populate-firestore.js
```

### Update Security Rules
```bash
# Edit firestore.rules
# Then deploy
firebase deploy --only firestore:rules
```

### Update Cloud Functions
```bash
# Make changes to functions
cd firebase-functions
npm run build
cd ..
firebase deploy --only functions
```

### Update Hosting
```bash
cd web3-quest-hub-app
npm run build
cd ..
firebase deploy --only hosting
```

---

## 🐛 Troubleshooting

### "Permission denied" during deployment
```bash
# Re-authenticate
firebase login --reauth

# Check project is set correctly
firebase use web3questhub
```

### Functions deployment fails
```bash
# Check TypeScript compiles
cd firebase-functions
npm run build

# Check for syntax errors
npm run lint

# View deployment logs
firebase deploy --only functions --debug
```

### Data import fails
```bash
# Verify service account key is correct
# Check firestore_sample_data.json is valid JSON (after removing comments)

# Try manual approach via Firebase console
```

### Rules deployment overwrites data
**Note:** Deploying rules does NOT affect existing data, only access permissions.

---

## 📊 Monitoring & Logs

### View Function Logs
```bash
# Real-time logs
firebase functions:log

# Filter by function
firebase functions:log --only verifyMissionCompletion

# Last 100 lines
firebase functions:log --lines 100
```

### Firebase Console Monitoring
- **Firestore**: https://console.firebase.google.com/project/web3questhub/firestore
- **Functions**: https://console.firebase.google.com/project/web3questhub/functions
- **Authentication**: https://console.firebase.google.com/project/web3questhub/authentication
- **Usage & Billing**: https://console.firebase.google.com/project/web3questhub/usage

---

## 💰 Cost Considerations

### Free Tier Limits (Spark Plan)
- Firestore: 50K reads, 20K writes, 20K deletes per day
- Functions: 125K invocations, 40K GB-seconds, 40K CPU-seconds per month
- Hosting: 10 GB storage, 360 MB/day transfer

### Blaze Plan (Pay-as-you-go)
- Required for: Cloud Functions (if exceeding free tier)
- Recommended for: Production deployment
- Costs: Very reasonable for small-medium apps

**Monitor usage**: https://console.firebase.google.com/project/web3questhub/usage

---

## 🔐 Security Reminders

### Before Deploying to Production:
1. **Never commit secrets**:
   - `firebase-service-account.json`
   - `.env` files
   - API keys

2. **Use Google Secret Manager** for production:
   ```bash
   # Store secrets securely
   gcloud secrets create gemini-api-key --data-file=-
   ```

3. **Enable App Check** (recommended for production):
   - Go to Firebase Console → App Check
   - Register your app
   - Add reCAPTCHA for web

4. **Review security rules** before deploying:
   - Test in Firebase Rules Playground
   - Ensure users can only access their own data

5. **Set up API key restrictions**:
   - Google Cloud Console → Credentials
   - Restrict Firebase API key to your domains

---

## ✅ Post-Deployment Verification

Run this checklist after deployment:

```bash
# 1. Check Firestore data
firebase firestore:get user_profile user_001_alice

# 2. Check security rules
# Try accessing data without auth - should fail

# 3. Test functions
# Call from your app or use curl
curl -X POST https://us-central1-web3questhub.cloudfunctions.net/getAuraResponse \
  -H "Content-Type: application/json" \
  -d '{"data":{"userId":"user_001_alice","message":"Hello AURA"}}'

# 4. Check logs
firebase functions:log --lines 20

# 5. Verify hosting (if deployed)
# Visit https://web3questhub.web.app
```

---

## 📚 Resources

- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Cloud Functions Docs](https://firebase.google.com/docs/functions)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firebase Console](https://console.firebase.google.com/)

---

**Deployment Guide Version**: 1.0  
**Last Updated**: 2025-01-20  
**Project**: Web3 Quest Hub
