# Firebase Quick Start Guide

Your Firebase configuration is complete! Here's what you need to do next.

---

## ✅ What's Already Configured

- **Firebase SDK initialized** with environment variables
- **Authentication helpers created** (Email/Password + Google Sign-In)
- **Firestore, Functions, Analytics** ready to use
- **Security best practices** implemented

---

## 🚀 Next Steps

### 1. Enable Authentication (2 minutes)

Go to Firebase Console → Authentication → Sign-in method:
- Enable **Email/Password**
- Enable **Google** (add support email)

### 2. Create Firestore Database (2 minutes)

Go to Firebase Console → Firestore Database:
- Click "Create database"
- Select "Start in production mode"
- Choose location: **us-east1** (or your region)

### 3. Deploy Security Rules

```bash
cd "C:\Users\Japan\OneDrive\Documents\GitHub\Web3QuestHub"
firebase deploy --only firestore:rules
```

### 4. Get API Keys

**Gemini API Key** (AI Companion):
- Go to: https://aistudio.google.com/apikey
- Create API key
- Add to `.env.local` files

**Alchemy API Key** (On-chain verification):
- Go to: https://dashboard.alchemy.com/
- Create app → Copy API key
- Add to `.env.local` files

### 5. Test Your Setup

```bash
cd web3-quest-hub-app
npm run dev
```

Open http://localhost:3000 - no Firebase errors should appear!

---

## 📁 Environment Variables

Your Firebase config is in **`.env.local`** (gitignored):

```
web3-quest-hub-app/.env.local         ← Firebase config here
firebase-functions/.env                ← API keys here
```

**Important:** These files are NOT in git! Each team member needs their own.

---

## 🔥 Using Firebase in Your Code

### Authentication

```typescript
import { signInWithGoogle, signUpWithEmail } from '@/lib/firebase/auth-setup';

// Google sign-in
const { user, error } = await signInWithGoogle();

// Email sign-up
const result = await signUpWithEmail('email@example.com', 'password123', 'Display Name');
```

### Firestore

```typescript
import { db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Get document
const docRef = doc(db, 'users', userId);
const docSnap = await getDoc(docRef);
const data = docSnap.data();

// Set document
await setDoc(docRef, { name: 'John', xp: 100 });
```

### Cloud Functions

```typescript
import { functions } from '@/lib/firebase/config';
import { httpsCallable } from 'firebase/functions';

// Call function
const verifyMission = httpsCallable(functions, 'verifyMissionCompletion');
const result = await verifyMission({ userId, missionId, walletAddress });
```

---

## 🛠️ Troubleshooting

### "Firebase config is incomplete"
- Check `.env.local` exists in `web3-quest-hub-app/`
- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Restart dev server

### "Analytics not supported"
- Normal on localhost
- Will work in production

### "Permission denied" in Firestore
- Deploy security rules: `firebase deploy --only firestore:rules`
- Check user is authenticated

---

## 📚 Files Created

| File | Description |
|------|-------------|
| `web3-quest-hub-app/lib/firebase/config.ts` | Firebase SDK initialization |
| `web3-quest-hub-app/lib/firebase/auth-setup.ts` | Auth helper functions |
| `web3-quest-hub-app/.env.local` | Your Firebase config (gitignored) |
| `firebase-functions/.env` | Functions environment variables |

---

## ✅ Summary

**Status**: Firebase is configured and ready to use!

**Your next task**: Enable auth methods in Firebase Console, then start development with Linear task WEB-2.

**Questions?** Check `AGENTS.md` for complete development guidelines.

---

**Configuration Date**: 2025-01-20  
**Status**: ✅ Complete
