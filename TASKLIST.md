# Web3 Quest Hub - Task List & JIRA Tickets

**Project:** Web3 Quest Hub  
**Version:** 1.0  
**Last Updated:** 2025-01-20  
**Project Management:** Linear / JIRA

---

## Task Organization

Tasks are organized by development phases as outlined in the Implementation Plan. Each task follows JIRA ticket format with:
- **Ticket ID**: Unique identifier (W3QH-###)
- **Type**: Epic, Story, Task, Bug, Sub-task
- **Priority**: Critical, High, Medium, Low
- **Estimate**: Story points (1-13 scale)
- **Dependencies**: Related tickets

---

## Phase 1: Project & Firebase Setup

**Duration:** 2 weeks  
**Sprint:** 1-2  
**Epic:** W3QH-1

### Epic: Project Foundation Setup
**W3QH-1** | Epic | Priority: Critical | Estimate: 21 points

Set up the foundational infrastructure for the Web3 Quest Hub platform including Next.js application, Firebase services, and development environment.

---

### Story: Initialize Next.js Project
**W3QH-2** | Story | Priority: Critical | Estimate: 5 points | Epic: W3QH-1

**Description:**  
Create a new Next.js application using TypeScript with the latest stable version (14.x). Establish the basic project structure including directories for components, pages, styles, and lib.

**Acceptance Criteria:**
- [ ] Next.js 14.x project initialized with TypeScript
- [ ] Project runs successfully with `npm run dev`
- [ ] Basic folder structure created: `src/app`, `src/components`, `src/lib`, `src/styles`, `public`
- [ ] TypeScript configuration optimized for Next.js
- [ ] ESLint and Prettier configured
- [ ] Git repository initialized with appropriate .gitignore

**Technical Notes:**
- Use `npx create-next-app@latest` with TypeScript flag
- Configure App Router (not Pages Router)
- Set up absolute imports with `@/` alias

**Sub-tasks:**
- W3QH-3: Configure TypeScript and tsconfig.json
- W3QH-4: Set up ESLint and Prettier
- W3QH-5: Create directory structure

---

### Task: Configure TypeScript and tsconfig.json
**W3QH-3** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-2

**Description:**  
Configure TypeScript with strict mode and optimized settings for Next.js development.

**Acceptance Criteria:**
- [ ] tsconfig.json configured with strict mode enabled
- [ ] Path aliases configured (`@/*` pointing to `./src/*`)
- [ ] Compiler options optimized for React 18
- [ ] Include/exclude patterns properly set
- [ ] No TypeScript errors on clean build

---

### Task: Set up ESLint and Prettier
**W3QH-4** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-2

**Description:**  
Configure code quality tools with project-specific rules.

**Acceptance Criteria:**
- [ ] ESLint configured with Next.js recommended rules
- [ ] Prettier configured with consistent formatting rules
- [ ] ESLint-Prettier integration working without conflicts
- [ ] Pre-commit hooks configured with Husky (optional)
- [ ] VS Code settings.json added for team consistency

---

### Task: Create Directory Structure
**W3QH-5** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-2

**Description:**  
Create the complete directory structure as defined in the Implementation Plan.

**Acceptance Criteria:**
- [ ] All directories created: components/, lib/, styles/, public/
- [ ] Subdirectories for components: layout/, dashboard/, profile/, modals/, ai/, ui/
- [ ] Lib subdirectories: firebase/, hooks/, types/, utils/
- [ ] Public directories: images/badges/, images/icons/, fonts/
- [ ] README.md added to key directories explaining their purpose

---

### Story: Set Up Firebase Project
**W3QH-6** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-1

**Description:**  
Create and configure a new Firebase project with required services: Authentication, Firestore Database, and Cloud Functions.

**Acceptance Criteria:**
- [ ] Firebase project created in Google Cloud Console
- [ ] Firebase Authentication enabled (Email/Password, Google OAuth)
- [ ] Firestore Database created in Native Mode
- [ ] Cloud Functions initialized
- [ ] Firebase SDK configured in Next.js app
- [ ] Environment variables properly configured
- [ ] Firebase Admin SDK configured for Functions
- [ ] Test connection to Firebase services successful

**Technical Notes:**
- Store Firebase config in environment variables (.env.local)
- Never commit actual keys to version control
- Create .env.local.example template
- Use Firebase Admin SDK for server-side operations

**Sub-tasks:**
- W3QH-7: Create Firebase project and enable services
- W3QH-8: Configure Firebase SDK in Next.js
- W3QH-9: Initialize Firebase Functions directory
- W3QH-10: Set up environment variables and secrets

---

### Task: Create Firebase Project and Enable Services
**W3QH-7** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-6

**Description:**  
Create Firebase project in Google Cloud Console and enable required services.

**Acceptance Criteria:**
- [ ] Firebase project created with appropriate name
- [ ] Project connected to Google Cloud billing account
- [ ] Firebase Authentication enabled
- [ ] Email/Password provider enabled in Authentication
- [ ] Google OAuth provider configured with credentials
- [ ] Firestore Database created in Native Mode
- [ ] Firestore location selected (us-central1 recommended)
- [ ] Cloud Functions enabled

---

### Task: Configure Firebase SDK in Next.js
**W3QH-8** | Task | Priority: Critical | Estimate: 3 points | Parent: W3QH-6

**Description:**  
Install and configure Firebase client SDK in the Next.js application.

**Acceptance Criteria:**
- [ ] Firebase SDK v10.x installed (`npm install firebase`)
- [ ] Firebase config file created at `src/lib/firebase/config.ts`
- [ ] Firebase initialization code implemented
- [ ] Auth, Firestore, and Functions modules imported
- [ ] Environment variables loaded from .env.local
- [ ] Firebase instance exported for use in components
- [ ] Test connection successful (can read Firestore)

**Code Reference:**
```typescript
// src/lib/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
```

---

### Task: Initialize Firebase Functions Directory
**W3QH-9** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-6

**Description:**  
Set up Firebase Cloud Functions project structure with TypeScript.

**Acceptance Criteria:**
- [ ] Functions directory initialized with `firebase init functions`
- [ ] TypeScript selected as language
- [ ] Functions directory structure created
- [ ] package.json configured with necessary dependencies
- [ ] tsconfig.json configured for Functions
- [ ] index.ts created with sample function
- [ ] Firebase Admin SDK installed
- [ ] Local emulator tested successfully

**Directory Structure:**
```
firebase-functions/
├── src/
│   ├── index.ts
│   ├── verifyMissionCompletion.ts
│   └── getAuraResponse.ts
├── package.json
├── tsconfig.json
└── .env (for local secrets)
```

---

### Task: Set Up Environment Variables and Secrets
**W3QH-10** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-6

**Description:**  
Configure environment variables for development and production environments.

**Acceptance Criteria:**
- [ ] .env.local.example created with all required variables
- [ ] .env.local created for local development (in .gitignore)
- [ ] Firebase project config variables added
- [ ] Google Secret Manager configured for production
- [ ] Documentation added for setting up environment variables
- [ ] CI/CD variables configured (if applicable)

**Environment Variables:**
```env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# API Keys (Server-side only, store in Secret Manager)
GEMINI_API_KEY=
ALCHEMY_API_KEY=
```

---

### Story: Implement Basic Component Structure
**W3QH-11** | Story | Priority: High | Estimate: 5 points | Epic: W3QH-1

**Description:**  
Create the basic component structure and layout system for the application.

**Acceptance Criteria:**
- [ ] Root layout component created
- [ ] AuthProvider context created and implemented
- [ ] Header component created
- [ ] Basic routing structure set up
- [ ] Tailwind CSS configured and tested
- [ ] Global styles applied

**Sub-tasks:**
- W3QH-12: Configure Tailwind CSS
- W3QH-13: Create root layout and AuthProvider
- W3QH-14: Create Header component

---

### Task: Configure Tailwind CSS
**W3QH-12** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-11

**Description:**  
Install and configure Tailwind CSS with custom theme settings.

**Acceptance Criteria:**
- [ ] Tailwind CSS v3.x installed
- [ ] tailwind.config.js configured with custom colors
- [ ] postcss.config.js configured
- [ ] globals.css updated with Tailwind directives
- [ ] Custom theme colors defined for Web3 aesthetic
- [ ] Responsive breakpoints configured
- [ ] Test components rendering with Tailwind classes

---

### Task: Create Root Layout and AuthProvider
**W3QH-13** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-11

**Description:**  
Implement root layout component and authentication context provider.

**Acceptance Criteria:**
- [ ] `src/app/layout.tsx` created
- [ ] AuthProvider context created at `src/lib/contexts/AuthContext.tsx`
- [ ] useAuth custom hook created
- [ ] Firebase Auth state listener implemented
- [ ] User state available throughout app
- [ ] Loading state handled during auth initialization

---

### Task: Create Header Component
**W3QH-14** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-11

**Description:**  
Create sticky header component with navigation and user controls.

**Acceptance Criteria:**
- [ ] Header component created at `src/components/layout/Header.tsx`
- [ ] Sticky positioning implemented
- [ ] Navigation links (Dashboard, Profile) added
- [ ] User avatar and display name shown when logged in
- [ ] Logout button functional
- [ ] Responsive design for mobile

---

## Phase 2: Backend & Database Implementation

**Duration:** 1-2 weeks  
**Sprint:** 2-3  
**Epic:** W3QH-15

### Epic: Database Schema & Security
**W3QH-15** | Epic | Priority: Critical | Estimate: 13 points

Implement complete Firestore database schema, populate initial data, and deploy security rules.

---

### Story: Implement Firestore Schema
**W3QH-16** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-15

**Description:**  
Create all Firestore collections and documents according to specifications in TSD-W3QH-V1.0 Section 2.2.

**Acceptance Criteria:**
- [ ] `users` collection structure implemented
- [ ] `quests` collection structure implemented
- [ ] `userQuests` subcollection structure implemented
- [ ] `levels` collection structure implemented
- [ ] TypeScript interfaces created for all document types
- [ ] Firestore helper functions created
- [ ] Data validation functions implemented

**Sub-tasks:**
- W3QH-17: Create TypeScript interfaces for data models
- W3QH-18: Create Firestore helper functions
- W3QH-19: Populate initial quest data
- W3QH-20: Populate levels data

---

### Task: Create TypeScript Interfaces for Data Models
**W3QH-17** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-16

**Description:**  
Define TypeScript interfaces for all Firestore document types.

**Acceptance Criteria:**
- [ ] User interface created at `src/lib/types/user.ts`
- [ ] Quest interface created at `src/lib/types/quest.ts`
- [ ] UserQuest interface created
- [ ] Level interface created
- [ ] Badge interface created
- [ ] Verification criteria interfaces created
- [ ] All interfaces exported from index.ts

**Code Reference:**
```typescript
// src/lib/types/user.ts
export interface User {
  userId: string;
  displayName: string;
  email: string;
  walletAddress: string;
  totalXP: number;
  explorerLevel: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// src/lib/types/quest.ts
export interface Quest {
  questId: string;
  title: string;
  expeditionId: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  badge: Badge;
  lore: string;
  actionPlan: string[];
  verification: VerificationCriteria;
}
```

---

### Task: Create Firestore Helper Functions
**W3QH-18** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-16

**Description:**  
Create utility functions for common Firestore operations.

**Acceptance Criteria:**
- [ ] `src/lib/firebase/firestore.ts` created
- [ ] getUserProfile(userId) function implemented
- [ ] updateUserProfile(userId, data) function implemented
- [ ] getQuests() function implemented
- [ ] getQuestById(questId) function implemented
- [ ] getUserQuests(userId) function implemented
- [ ] updateUserQuest(userId, questId, data) function implemented
- [ ] getLevels() function implemented
- [ ] All functions properly typed
- [ ] Error handling implemented

---

### Task: Populate Initial Quest Data
**W3QH-19** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-16

**Description:**  
Create and upload initial quest data to Firestore.

**Acceptance Criteria:**
- [ ] At least 5 beginner quests created
- [ ] Quest data follows schema from TSD-W3QH-V1.0
- [ ] Verification criteria properly configured
- [ ] Badge data included for each quest
- [ ] Action plans written clearly for beginners
- [ ] Whitelisted domains included
- [ ] Data uploaded to Firestore via script or console

**Sample Quests:**
1. "Wallet Genesis" - Create and secure first wallet
2. "The First Transaction" - Send test tokens
3. "The Simple Swap" - Perform first token swap
4. "NFT Discovery" - View NFTs on OpenSea
5. "DAO Initiation" - Join a DAO and vote

---

### Task: Populate Levels Data
**W3QH-20** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-16

**Description:**  
Create level progression data in Firestore levels collection.

**Acceptance Criteria:**
- [ ] All 10 levels created in Firestore
- [ ] Level data matches table in TRD-W3QH-V1.0 Section 4.A
- [ ] Each level has title, cumulativeXpRequired, unlockDescription
- [ ] Data uploaded via script or Firebase console

**Level Data:**
```
Level 1: Newbie - 0 XP
Level 2: Cadet - 500 XP
Level 3: Apprentice - 1,250 XP
Level 4: Wanderer - 2,250 XP
Level 5: Trader - 3,500 XP
Level 6: Collector - 5,000 XP
Level 7: Guardian - 6,750 XP
Level 8: Architect - 8,750 XP
Level 9: Veteran - 11,000 XP
Level 10: Frontier Citizen - 13,500 XP
```

---

### Story: Deploy Firestore Security Rules
**W3QH-21** | Story | Priority: Critical | Estimate: 5 points | Epic: W3QH-15

**Description:**  
Implement and deploy Firestore Security Rules exactly as specified in TSD-W3QH-V1.0 Section 2.3.

**Acceptance Criteria:**
- [ ] Security rules file created (firestore.rules)
- [ ] Rules match specification exactly
- [ ] Users can only read/write own profile
- [ ] Quests and levels are read-only
- [ ] UserQuests properly secured
- [ ] Rules tested in Firebase emulator
- [ ] Rules deployed to production
- [ ] Rules tested with actual user accounts

**Sub-tasks:**
- W3QH-22: Write Firestore Security Rules
- W3QH-23: Test security rules in emulator
- W3QH-24: Deploy security rules to production

---

### Task: Write Firestore Security Rules
**W3QH-22** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-21

**Description:**  
Write security rules according to specification.

**Acceptance Criteria:**
- [ ] firestore.rules file created
- [ ] Rules for users collection implemented
- [ ] Rules for quests collection implemented
- [ ] Rules for levels collection implemented
- [ ] Rules for userQuests subcollection implemented
- [ ] Comments added explaining each rule

**Security Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, update, create: if request.auth != null && request.auth.uid == userId;
    }
    
    match /quests/{questId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    
    match /levels/{levelNumber} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    
    match /userQuests/{userId}/quests/{questId} {
      allow read, create, update: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

### Task: Test Security Rules in Emulator
**W3QH-23** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-21

**Description:**  
Test security rules thoroughly using Firebase emulator.

**Acceptance Criteria:**
- [ ] Firebase emulator configured and running
- [ ] Test suite created for security rules
- [ ] Authenticated user can read own profile
- [ ] Authenticated user cannot read other profiles
- [ ] Unauthenticated users cannot access any data
- [ ] Quest writes are denied from client
- [ ] All test cases passing

---

### Task: Deploy Security Rules to Production
**W3QH-24** | Task | Priority: Critical | Estimate: 1 point | Parent: W3QH-21

**Description:**  
Deploy security rules to production Firebase project.

**Acceptance Criteria:**
- [ ] Rules deployed using Firebase CLI
- [ ] Deployment successful without errors
- [ ] Rules active in Firebase Console
- [ ] Manual test performed in production

---

### Story: Set Up Firebase Authentication Flows
**W3QH-25** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-15

**Description:**  
Implement complete authentication flows including registration, login, and user profile creation.

**Acceptance Criteria:**
- [ ] Email/Password registration flow implemented
- [ ] Google OAuth login implemented
- [ ] User profile document created on registration
- [ ] Login page created
- [ ] Registration page created
- [ ] Password reset flow implemented
- [ ] Session persistence configured

**Sub-tasks:**
- W3QH-26: Create login page and form
- W3QH-27: Create registration page and form
- W3QH-28: Implement user profile creation on registration
- W3QH-29: Implement Google OAuth login

---

### Task: Create Login Page and Form
**W3QH-26** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-25

**Description:**  
Create login page with email/password authentication.

**Acceptance Criteria:**
- [ ] Login page created at `src/app/login/page.tsx`
- [ ] Form includes email and password fields
- [ ] Form validation implemented
- [ ] signInWithEmailAndPassword function integrated
- [ ] Loading state shown during authentication
- [ ] Error messages displayed properly
- [ ] Redirect to dashboard on success
- [ ] Link to registration page included

---

### Task: Create Registration Page and Form
**W3QH-27** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-25

**Description:**  
Create registration page with user account creation.

**Acceptance Criteria:**
- [ ] Registration page created at `src/app/register/page.tsx`
- [ ] Form includes email, password, confirm password, display name
- [ ] Form validation (password strength, email format)
- [ ] createUserWithEmailAndPassword function integrated
- [ ] Display name set via updateProfile
- [ ] User profile document created in Firestore
- [ ] Error handling for existing accounts
- [ ] Automatic login after registration

---

### Task: Implement User Profile Creation on Registration
**W3QH-28** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-25

**Description:**  
Create Firestore user profile document when new user registers.

**Acceptance Criteria:**
- [ ] Profile creation function in `src/lib/firebase/auth.ts`
- [ ] User document created in `users/{userId}` collection
- [ ] Initial values set: totalXP=0, explorerLevel=1
- [ ] createdAt and updatedAt timestamps added
- [ ] Email and displayName populated from auth
- [ ] walletAddress initialized as empty string
- [ ] Function called after successful registration
- [ ] Error handling if profile creation fails

---

### Task: Implement Google OAuth Login
**W3QH-29** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-25

**Description:**  
Add Google OAuth as authentication provider.

**Acceptance Criteria:**
- [ ] Google OAuth provider configured in Firebase Console
- [ ] "Sign in with Google" button added to login page
- [ ] signInWithPopup function implemented
- [ ] User profile created for first-time Google users
- [ ] Existing users can sign in with Google
- [ ] Error handling for popup blocked scenarios

---

## Phase 3: Core Frontend Development

**Duration:** 2-3 weeks  
**Sprint:** 3-5  
**Epic:** W3QH-30

### Epic: Core UI Components
**W3QH-30** | Epic | Priority: Critical | Estimate: 34 points

Build all core UI components for the Explorer Dashboard and Avatar Console.

---

### Story: Build Explorer Dashboard
**W3QH-31** | Story | Priority: Critical | Estimate: 13 points | Epic: W3QH-30

**Description:**  
Implement the main dashboard view with quest grid and progress sidebar.

**Acceptance Criteria:**
- [ ] Dashboard page created at `src/app/dashboard/page.tsx`
- [ ] ExplorerDashboard component created
- [ ] QuestGrid component created
- [ ] QuestCard component created
- [ ] ProgressSidebar component created
- [ ] Quests fetched from Firestore
- [ ] Quest filtering by expedition implemented
- [ ] Quest selection triggers modal
- [ ] Responsive layout on all devices

**Sub-tasks:**
- W3QH-32: Create ExplorerDashboard component
- W3QH-33: Create QuestGrid component
- W3QH-34: Create QuestCard component
- W3QH-35: Create ProgressSidebar component
- W3QH-36: Implement data fetching hooks

---

### Task: Create ExplorerDashboard Component
**W3QH-32** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-31

**Description:**  
Create main dashboard layout component.

**Acceptance Criteria:**
- [ ] Component created at `src/components/dashboard/ExplorerDashboard.tsx`
- [ ] Layout with sidebar and main content area
- [ ] State management for selected quest
- [ ] State management for filtered quests
- [ ] Props: user, quests, userQuests
- [ ] Integration with QuestGrid and ProgressSidebar
- [ ] Loading states handled

---

### Task: Create QuestGrid Component
**W3QH-33** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-31

**Description:**  
Create quest grid layout organized by expeditions.

**Acceptance Criteria:**
- [ ] Component created at `src/components/dashboard/QuestGrid.tsx`
- [ ] Grid layout with responsive columns
- [ ] Quests grouped by expedition
- [ ] Expedition headers with styling
- [ ] Props: quests, onSelectQuest
- [ ] Empty state when no quests available
- [ ] Smooth animations on quest selection

---

### Task: Create QuestCard Component
**W3QH-34** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-31

**Description:**  
Create individual quest card component with visual indicators.

**Acceptance Criteria:**
- [ ] Component created at `src/components/dashboard/QuestCard.tsx`
- [ ] Card shows quest title, difficulty, XP reward
- [ ] Badge icon displayed
- [ ] Status indicator (locked/available/in-progress/completed)
- [ ] Hover effects and animations
- [ ] Click handler to open mission brief
- [ ] Visual "pathway" connections between sequential quests
- [ ] Locked quests displayed as grayed out

---

### Task: Create ProgressSidebar Component
**W3QH-35** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-31

**Description:**  
Create sidebar showing user progress and wallet connection.

**Acceptance Criteria:**
- [ ] Component created at `src/components/layout/ProgressSidebar.tsx`
- [ ] User level and XP displayed
- [ ] Progress bar to next level
- [ ] Wallet connection status
- [ ] Wallet address display (truncated)
- [ ] "Connect Wallet" button if not connected
- [ ] Responsive: collapses on mobile

---

### Task: Implement Data Fetching Hooks
**W3QH-36** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-31

**Description:**  
Create custom React hooks for fetching quest and user data.

**Acceptance Criteria:**
- [ ] useQuests hook created at `src/lib/hooks/useQuests.ts`
- [ ] useUserQuests hook created
- [ ] useUserProfile hook created
- [ ] Real-time listeners implemented for live updates
- [ ] Loading and error states handled
- [ ] React Query or SWR used for caching (optional)

---

### Story: Build Mission Brief Modal
**W3QH-37** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-30

**Description:**  
Create modal component displaying detailed quest information and verification interface.

**Acceptance Criteria:**
- [ ] Modal component created
- [ ] Quest lore section implemented
- [ ] Step-by-step action plan displayed
- [ ] XP and badge rewards shown
- [ ] External links marked as "Portals"
- [ ] "Start Quest" button updates status to in-progress
- [ ] "Verify Completion" button integrated
- [ ] Modal animations (slide-in, fade)

**Sub-tasks:**
- W3QH-38: Create MissionBriefModal component
- W3QH-39: Implement quest status update logic
- W3QH-40: Add verification trigger button

---

### Task: Create MissionBriefModal Component
**W3QH-38** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-37

**Description:**  
Build the modal component structure and layout.

**Acceptance Criteria:**
- [ ] Component created at `src/components/modals/MissionBriefModal.tsx`
- [ ] Modal overlay with backdrop
- [ ] Close button functionality
- [ ] Props: quest, isOpen, onClose
- [ ] Scrollable content area
- [ ] Responsive design
- [ ] Keyboard accessibility (ESC to close)

---

### Task: Implement Quest Status Update Logic
**W3QH-39** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-37

**Description:**  
Implement logic to update quest status when user starts a quest.

**Acceptance Criteria:**
- [ ] "Start Quest" button updates userQuest status to "in-progress"
- [ ] Firestore userQuests collection updated
- [ ] Button disabled if quest already started
- [ ] Loading state during update
- [ ] Success feedback to user
- [ ] Error handling and user notification

---

### Task: Add Verification Trigger Button
**W3QH-40** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-37

**Description:**  
Add button to trigger verification process (placeholder for Phase 5).

**Acceptance Criteria:**
- [ ] "Verify Completion" button added
- [ ] Button only enabled for in-progress quests
- [ ] Button shows loading state when clicked
- [ ] Placeholder function calls verifyMissionCompletion
- [ ] Success/error states handled
- [ ] Preparation for Phase 5 integration

---

### Story: Build Avatar Console (Profile Page)
**W3QH-41** | Story | Priority: High | Estimate: 13 points | Epic: W3QH-30

**Description:**  
Create user profile page with XP visualization, badge inventory, and activity log.

**Acceptance Criteria:**
- [ ] Profile page created at `src/app/profile/page.tsx`
- [ ] AvatarConsole component created
- [ ] XPCore circular progress chart implemented
- [ ] ArtifactInventory with badge grid created
- [ ] Logbook activity feed created
- [ ] Real-time data updates
- [ ] Responsive design

**Sub-tasks:**
- W3QH-42: Create AvatarConsole component
- W3QH-43: Create XPCore progress visualization
- W3QH-44: Create ArtifactInventory and BadgeGrid
- W3QH-45: Create Logbook component

---

### Task: Create AvatarConsole Component
**W3QH-42** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-41

**Description:**  
Create main profile page layout component.

**Acceptance Criteria:**
- [ ] Component created at `src/components/profile/AvatarConsole.tsx`
- [ ] Three-section layout: XP Core, Artifact Inventory, Logbook
- [ ] Props: user, completedQuests
- [ ] Responsive grid layout
- [ ] Loading skeleton while data fetches

---

### Task: Create XPCore Progress Visualization
**W3QH-43** | Task | Priority: High | Estimate: 4 points | Parent: W3QH-41

**Description:**  
Create circular progress chart showing XP and level progress.

**Acceptance Criteria:**
- [ ] Component created at `src/components/profile/XPCore.tsx`
- [ ] Circular progress indicator (use Recharts or similar)
- [ ] Current level displayed in center
- [ ] Current XP / XP to next level shown
- [ ] Animated progress bar
- [ ] Percentage calculation accurate
- [ ] Visual appeal with gradients

---

### Task: Create ArtifactInventory and BadgeGrid
**W3QH-44** | Task | Priority: Medium | Estimate: 3 points | Parent: W3QH-41

**Description:**  
Create badge display grid showing all earned badges.

**Acceptance Criteria:**
- [ ] ArtifactInventory component created at `src/components/profile/ArtifactInventory.tsx`
- [ ] BadgeGrid subcomponent created
- [ ] Badges displayed in responsive grid
- [ ] Badge images rendered from URLs
- [ ] Badge tooltips showing quest name
- [ ] Locked badges shown as grayed out silhouettes
- [ ] Empty state when no badges earned

---

### Task: Create Logbook Component
**W3QH-45** | Task | Priority: Medium | Estimate: 3 points | Parent: W3QH-41

**Description:**  
Create activity feed showing completed quests and achievements.

**Acceptance Criteria:**
- [ ] Component created at `src/components/profile/Logbook.tsx`
- [ ] Chronological list of completed quests
- [ ] Each entry shows quest name, XP gained, date
- [ ] Filtering options (All, This Week, This Month)
- [ ] Scrollable with pagination or infinite scroll
- [ ] Empty state when no activities

---

## Phase 4: AI Companion Integration (AURA)

**Duration:** 1-2 weeks  
**Sprint:** 5-6  
**Epic:** W3QH-46

### Epic: AURA AI Integration
**W3QH-46** | Epic | Priority: High | Estimate: 21 points

Integrate Google Gemini API for the AURA AI companion with contextual intelligence and safety guardrails.

---

### Story: Develop getAuraResponse Firebase Function
**W3QH-47** | Story | Priority: Critical | Estimate: 13 points | Epic: W3QH-46

**Description:**  
Create Firebase Function that acts as secure backend proxy for Gemini API with context enrichment and safety measures.

**Acceptance Criteria:**
- [ ] Function created and deployed
- [ ] Gemini API key stored in Secret Manager
- [ ] Context enrichment logic implemented
- [ ] AURA persona system prompt defined
- [ ] Safety guardrails enforced
- [ ] Response sanitization implemented
- [ ] Error handling comprehensive
- [ ] Function callable from frontend

**Sub-tasks:**
- W3QH-48: Set up Gemini API credentials
- W3QH-49: Implement getAuraResponse function logic
- W3QH-50: Add context enrichment from Firestore
- W3QH-51: Implement safety guardrails and content filtering
- W3QH-52: Test function with various scenarios

---

### Task: Set Up Gemini API Credentials
**W3QH-48** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-47

**Description:**  
Configure Gemini API access and store credentials securely.

**Acceptance Criteria:**
- [ ] Gemini API key obtained from Google AI Studio
- [ ] Key stored in Google Secret Manager
- [ ] Firebase Functions configured to access Secret Manager
- [ ] Local development .env configured
- [ ] Test API call successful

---

### Task: Implement getAuraResponse Function Logic
**W3QH-49** | Task | Priority: High | Estimate: 4 points | Parent: W3QH-47

**Description:**  
Write the core Firebase Function for AURA responses.

**Acceptance Criteria:**
- [ ] Function created at `firebase-functions/src/getAuraResponse.ts`
- [ ] HTTPS Callable function properly configured
- [ ] Request validation (prompt, context)
- [ ] Gemini API integration using @google/generative-ai SDK
- [ ] System prompt construction
- [ ] API call with proper parameters
- [ ] Response extraction and formatting
- [ ] Export from index.ts

**Function Signature:**
```typescript
export const getAuraResponse = onCall(async (request) => {
  const { prompt, context } = request.data;
  // Validation
  // Context enrichment
  // Gemini API call
  // Return response
});
```

---

### Task: Add Context Enrichment from Firestore
**W3QH-50** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-47

**Description:**  
Fetch user context from Firestore to enrich AI prompts.

**Acceptance Criteria:**
- [ ] Fetch user profile (level, XP)
- [ ] Fetch active quest details if context.questId provided
- [ ] Fetch quest step information
- [ ] Construct enriched prompt with context
- [ ] Handle missing or invalid context gracefully
- [ ] Log context for debugging (without sensitive data)

**Context Structure:**
```
User Context:
- Explorer Level: {level}
- Total XP: {xp}
- Active Quest: {questTitle}
- Current Step: {stepNumber} - {stepDescription}

User asks: {prompt}
```

---

### Task: Implement Safety Guardrails and Content Filtering
**W3QH-51** | Task | Priority: Critical | Estimate: 3 points | Parent: W3QH-47

**Description:**  
Implement safety measures to prevent harmful responses.

**Acceptance Criteria:**
- [ ] System prompt includes strict safety instructions
- [ ] AURA persona instructions clear (friendly, security-focused)
- [ ] Prohibited topics list enforced (private keys, financial advice)
- [ ] Response content filtering for sensitive patterns
- [ ] Automatic risk warnings added to transaction discussions
- [ ] Sanitization function to remove potential vulnerabilities
- [ ] Test cases for safety violations

**Safety Rules:**
- Never ask for or handle private keys or seed phrases
- Never provide specific financial advice or price predictions
- Always include risk warnings for transaction-related queries
- Refuse requests that violate safety protocols politely

---

### Task: Test getAuraResponse with Various Scenarios
**W3QH-52** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-47

**Description:**  
Comprehensive testing of AURA function.

**Acceptance Criteria:**
- [ ] Test basic greeting response
- [ ] Test quest-specific help
- [ ] Test transaction security query
- [ ] Test safety rule violations (private key request)
- [ ] Test with invalid context
- [ ] Test error handling (API failure)
- [ ] Performance testing (response time < 3s)

---

### Story: Integrate AURA into Frontend
**W3QH-53** | Story | Priority: High | Estimate: 8 points | Epic: W3QH-46

**Description:**  
Create chat widget component and integrate with getAuraResponse function.

**Acceptance Criteria:**
- [ ] AuraChatWidget component created
- [ ] Floating chat interface with toggle
- [ ] Message history maintained
- [ ] Real-time message sending and receiving
- [ ] Typing indicator while waiting for response
- [ ] Context automatically sent with each message
- [ ] Smooth animations and transitions

**Sub-tasks:**
- W3QH-54: Create AuraChatWidget component
- W3QH-55: Implement chat UI and message display
- W3QH-56: Integrate with getAuraResponse function
- W3QH-57: Add context tracking and enrichment

---

### Task: Create AuraChatWidget Component
**W3QH-54** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-53

**Description:**  
Build the floating chat widget component.

**Acceptance Criteria:**
- [ ] Component created at `src/components/ai/AuraChatWidget.tsx`
- [ ] Floating button in bottom-right corner
- [ ] Click to expand/collapse chat interface
- [ ] Chat window with header, messages, and input
- [ ] Responsive: full screen on mobile, overlay on desktop
- [ ] Close button functional
- [ ] Z-index appropriate to float above content

---

### Task: Implement Chat UI and Message Display
**W3QH-55** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-53

**Description:**  
Build the message display area with user and AURA messages.

**Acceptance Criteria:**
- [ ] Message list with auto-scroll to bottom
- [ ] User messages aligned right, AURA messages left
- [ ] Avatar icons for each message
- [ ] Timestamp display
- [ ] Markdown formatting support for AURA responses
- [ ] Message input field with send button
- [ ] Character limit or input validation
- [ ] Loading indicator (typing dots) while awaiting response

---

### Task: Integrate with getAuraResponse Function
**W3QH-56** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-53

**Description:**  
Connect chat widget to Firebase Function.

**Acceptance Criteria:**
- [ ] Firebase Functions client imported
- [ ] Message send triggers function call
- [ ] Request includes prompt and context
- [ ] Response displayed as new message
- [ ] Error handling for failed API calls
- [ ] Retry mechanism on timeout
- [ ] Loading state managed properly

---

### Task: Add Context Tracking and Enrichment
**W3QH-57** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-53

**Description:**  
Automatically include user context with each AURA query.

**Acceptance Criteria:**
- [ ] Current quest ID tracked from dashboard state
- [ ] Current step tracked from mission brief
- [ ] Context object constructed and sent with each message
- [ ] Context updated when user changes quests
- [ ] Fallback to empty context if no active quest

---

## Phase 5: On-Chain Verification Service

**Duration:** 1-2 weeks  
**Sprint:** 6-7  
**Epic:** W3QH-58

### Epic: On-Chain Verification System
**W3QH-58** | Epic | Priority: Critical | Estimate: 21 points

Implement the verification service that checks on-chain actions and awards XP/badges.

---

### Story: Develop verifyMissionCompletion Firebase Function
**W3QH-59** | Story | Priority: Critical | Estimate: 13 points | Epic: W3QH-58

**Description:**  
Create Firebase Function that verifies on-chain actions using Web3 API and updates user progress atomically.

**Acceptance Criteria:**
- [ ] Function created and deployed
- [ ] Web3 API provider (Alchemy) integrated
- [ ] Dynamic verification based on quest criteria
- [ ] Support for all verification types: balance_check, tx_history_check, event_check
- [ ] Atomic Firestore transaction for all updates
- [ ] XP and level calculation accurate
- [ ] Badge awarding implemented
- [ ] Comprehensive error handling

**Sub-tasks:**
- W3QH-60: Set up Web3 API provider credentials
- W3QH-61: Implement verifyMissionCompletion function structure
- W3QH-62: Implement balance_check verification
- W3QH-63: Implement tx_history_check verification
- W3QH-64: Implement event_check verification
- W3QH-65: Implement atomic Firestore transaction logic
- W3QH-66: Add XP calculation and level progression
- W3QH-67: Test verification with various quest types

---

### Task: Set Up Web3 API Provider Credentials
**W3QH-60** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-59

**Description:**  
Configure Alchemy or Infura API access.

**Acceptance Criteria:**
- [ ] Alchemy API key obtained (or Infura as backup)
- [ ] Key stored in Google Secret Manager
- [ ] Firebase Functions configured to access key
- [ ] Alchemy SDK installed in functions project
- [ ] Test API call successful
- [ ] Multiple networks supported (mainnet, testnets)

---

### Task: Implement verifyMissionCompletion Function Structure
**W3QH-61** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-59

**Description:**  
Create function scaffold and request handling.

**Acceptance Criteria:**
- [ ] Function created at `firebase-functions/src/verifyMissionCompletion.ts`
- [ ] HTTPS Callable function configured
- [ ] Request validation (questId)
- [ ] Fetch user wallet address from Firestore
- [ ] Fetch quest verification criteria from Firestore
- [ ] Error handling for missing data
- [ ] Export from index.ts

**Function Signature:**
```typescript
export const verifyMissionCompletion = onCall(async (request) => {
  const { questId } = request.data;
  const userId = request.auth.uid;
  // Fetch user wallet
  // Fetch quest criteria
  // Route to appropriate verification function
  // Perform atomic update
  // Return result
});
```

---

### Task: Implement balance_check Verification
**W3QH-62** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-59

**Description:**  
Implement token balance verification logic.

**Acceptance Criteria:**
- [ ] Function checks wallet balance for specified token
- [ ] Support for native ETH balance
- [ ] Support for ERC-20 token balances
- [ ] Comparison against minAmount threshold
- [ ] Return true/false based on balance
- [ ] Handle errors (invalid address, network issues)

**Verification Parameters:**
```typescript
{
  type: 'balance_check',
  params: {
    targetChainId: 1,
    tokenAddress: '0x...' | 'ETH',
    minAmount: 0.01
  }
}
```

---

### Task: Implement tx_history_check Verification
**W3QH-63** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-59

**Description:**  
Implement transaction history verification logic.

**Acceptance Criteria:**
- [ ] Query transaction history for user wallet
- [ ] Filter by to/from addresses
- [ ] Filter by transaction value or token
- [ ] Verify transaction success status
- [ ] Time window consideration (recent transactions)
- [ ] Return true if matching transaction found

**Verification Parameters:**
```typescript
{
  type: 'tx_history_check',
  params: {
    targetChainId: 1,
    toAddress?: '0x...',
    fromAddress?: '0x...',
    minValue?: 0.01,
    tokenAddress?: '0x...'
  }
}
```

---

### Task: Implement event_check Verification
**W3QH-64** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-59

**Description:**  
Implement smart contract event verification logic.

**Acceptance Criteria:**
- [ ] Query contract event logs
- [ ] Filter by contract address and event signature
- [ ] Check if user address is in event parameters
- [ ] Time window consideration
- [ ] Return true if matching event found
- [ ] Handle multiple event formats

**Verification Parameters:**
```typescript
{
  type: 'event_check',
  params: {
    targetChainId: 1,
    contractAddress: '0x...',
    eventSignature: 'Transfer(address,address,uint256)',
    userAddressParam: 'to' // or 'from'
  }
}
```

---

### Task: Implement Atomic Firestore Transaction Logic
**W3QH-65** | Task | Priority: Critical | Estimate: 3 points | Parent: W3QH-59

**Description:**  
Implement atomic updates to user profile and quest status.

**Acceptance Criteria:**
- [ ] Firestore transaction used for all updates
- [ ] User totalXP incremented by quest xpReward
- [ ] explorerLevel updated if threshold crossed
- [ ] userQuest status set to 'completed'
- [ ] completedAt timestamp set
- [ ] earnedBadgeId set
- [ ] Transaction rollback on any failure
- [ ] All updates atomic (all or nothing)

**Transaction Flow:**
```typescript
await db.runTransaction(async (transaction) => {
  // Read current user data
  // Calculate new XP and level
  // Update users/{userId}
  // Update userQuests/{userId}/quests/{questId}
});
```

---

### Task: Add XP Calculation and Level Progression
**W3QH-66** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-59

**Description:**  
Implement XP calculation and level-up logic.

**Acceptance Criteria:**
- [ ] Calculate new totalXP (current + reward)
- [ ] Query levels collection for thresholds
- [ ] Determine new explorerLevel based on cumulative XP
- [ ] Return leveledUp boolean
- [ ] Return newLevel if leveled up
- [ ] Handle multiple level jumps (edge case)

**Level Thresholds:**
Use table from TRD-W3QH-V1.0 Section 4.A

---

### Task: Test Verification with Various Quest Types
**W3QH-67** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-59

**Description:**  
Comprehensive testing of verification system.

**Acceptance Criteria:**
- [ ] Test balance_check with ETH balance
- [ ] Test balance_check with ERC-20 token
- [ ] Test tx_history_check with swap transaction
- [ ] Test event_check with Transfer event
- [ ] Test XP awarding and level up
- [ ] Test transaction atomicity (simulate failure)
- [ ] Test error handling for invalid wallet
- [ ] Performance testing (response time < 5s)

---

### Story: Integrate Verification into Frontend
**W3QH-68** | Story | Priority: High | Estimate: 8 points | Epic: W3QH-58

**Description:**  
Connect verification system to Mission Brief modal and add success feedback.

**Acceptance Criteria:**
- [ ] "Verify Completion" button calls function
- [ ] Loading state during verification
- [ ] Success response updates local state
- [ ] XP and level displayed in success message
- [ ] Level-up celebration animation
- [ ] Badge awarded shown in modal
- [ ] Dashboard refreshes to show completion
- [ ] Error messages shown for failed verification

**Sub-tasks:**
- W3QH-69: Connect verification button to function
- W3QH-70: Add success feedback and animations
- W3QH-71: Implement level-up celebration modal
- W3QH-72: Refresh dashboard data after verification

---

### Task: Connect Verification Button to Function
**W3QH-69** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-68

**Description:**  
Integrate verification button with Firebase Function.

**Acceptance Criteria:**
- [ ] Button onClick handler calls verifyMissionCompletion
- [ ] Function called with questId parameter
- [ ] Loading state shown during function execution
- [ ] Response handled (success/failure)
- [ ] Error toast shown on failure
- [ ] Button disabled after successful verification

---

### Task: Add Success Feedback and Animations
**W3QH-70** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-68

**Description:**  
Create visual feedback for successful verification.

**Acceptance Criteria:**
- [ ] Success toast notification with XP gained
- [ ] Badge icon shown in notification
- [ ] Confetti animation or celebration effect
- [ ] Sound effect (optional)
- [ ] Quest card updates to show completion
- [ ] Progress sidebar updates XP in real-time

---

### Task: Implement Level-Up Celebration Modal
**W3QH-71** | Task | Priority: Medium | Estimate: 3 points | Parent: W3QH-68

**Description:**  
Create special modal for level-up events.

**Acceptance Criteria:**
- [ ] Modal automatically opens on level up
- [ ] Shows new level number and title
- [ ] Animated transition effect
- [ ] Displays unlocked features or rewards
- [ ] "Continue" button to close modal
- [ ] Only shown when leveledUp is true

---

### Task: Refresh Dashboard Data After Verification
**W3QH-72** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-68

**Description:**  
Ensure dashboard reflects updated data after verification.

**Acceptance Criteria:**
- [ ] User profile data refetched
- [ ] UserQuests data refetched
- [ ] Quest completion status updated in UI
- [ ] XP and level updated in sidebar
- [ ] No full page reload required
- [ ] Smooth transition without flicker

---

## Phase 6: Browser Plugin Development

**Duration:** 2-3 weeks  
**Sprint:** 7-9  
**Epic:** W3QH-73

### Epic: Web3 HUD Browser Extension
**W3QH-73** | Epic | Priority: High | Estimate: 34 points

Develop browser extension with domain verification, transaction monitoring, and quest tracking.

---

### Story: Create Extension Scaffold
**W3QH-74** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-73

**Description:**  
Set up browser extension project structure with Manifest V3.

**Acceptance Criteria:**
- [ ] Extension directory created
- [ ] manifest.json created with proper configuration
- [ ] Basic extension loads in Chrome
- [ ] Icons and images added
- [ ] Popup HTML and JS created
- [ ] Directory structure organized

**Sub-tasks:**
- W3QH-75: Create manifest.json with Manifest V3
- W3QH-76: Create extension directory structure
- W3QH-77: Add icons and branding assets
- W3QH-78: Create popup interface

---

### Task: Create manifest.json with Manifest V3
**W3QH-75** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-74

**Description:**  
Create manifest file according to specification.

**Acceptance Criteria:**
- [ ] Manifest version 3 specified
- [ ] Permissions declared: storage, tabs, scripting
- [ ] Background service worker configured
- [ ] Content scripts registered for all URLs
- [ ] Action popup configured
- [ ] Host permissions set appropriately
- [ ] Manifest passes validation

**Manifest Template:**
```json
{
  "manifest_version": 3,
  "name": "Web3 Quest Hub HUD",
  "version": "1.0.0",
  "description": "Your Web3 learning companion",
  "permissions": ["storage", "tabs", "scripting"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content_script.js"],
    "css": ["styles/hud.css"]
  }],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/icon-16.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  }
}
```

---

### Task: Create Extension Directory Structure
**W3QH-76** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-74

**Description:**  
Organize extension files and folders.

**Acceptance Criteria:**
- [ ] Root files: manifest.json, background.js, content_script.js
- [ ] popup.html and popup.js created
- [ ] styles/ directory with hud.css
- [ ] images/ directory with icons
- [ ] scripts/ directory for shared utilities
- [ ] README.md with development instructions

---

### Task: Add Icons and Branding Assets
**W3QH-77** | Task | Priority: Low | Estimate: 2 points | Parent: W3QH-74

**Description:**  
Create or source extension icons and images.

**Acceptance Criteria:**
- [ ] Icon created in 16x16, 48x48, 128x128 sizes
- [ ] Icon represents Web3 Quest Hub brand
- [ ] Status icons created (verified, unverified)
- [ ] Badge icons for achievements
- [ ] All images optimized for size

---

### Task: Create Popup Interface
**W3QH-78** | Task | Priority: Medium | Estimate: 3 points | Parent: W3QH-74

**Description:**  
Build extension popup UI for quick access.

**Acceptance Criteria:**
- [ ] popup.html created with clean layout
- [ ] Shows current active quest
- [ ] Shows current step description
- [ ] Link to open main web app
- [ ] Status indicator (connected/disconnected)
- [ ] Styled with CSS matching main app
- [ ] Responsive to different popup sizes

---

### Story: Implement Background Script
**W3QH-79** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-73

**Description:**  
Develop service worker to manage state and communicate with web app and content scripts.

**Acceptance Criteria:**
- [ ] background.js created as service worker
- [ ] Listens for messages from web app
- [ ] Stores active quest state
- [ ] Monitors tab URL changes
- [ ] Domain verification logic implemented
- [ ] Sends messages to content scripts
- [ ] Handles completion events from web app

**Sub-tasks:**
- W3QH-80: Set up message listener for web app
- W3QH-81: Implement quest state storage
- W3QH-82: Implement tab monitoring and domain verification
- W3QH-83: Implement content script communication

---

### Task: Set Up Message Listener for Web App
**W3QH-80** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-79

**Description:**  
Listen for messages from the Next.js web app.

**Acceptance Criteria:**
- [ ] chrome.runtime.onMessage listener added
- [ ] Message types defined (SET_ACTIVE_QUEST, QUEST_COMPLETED)
- [ ] Quest data extracted from messages
- [ ] Validation of message structure
- [ ] Response sent back to web app confirming receipt

**Message Format:**
```javascript
{
  type: 'SET_ACTIVE_QUEST',
  data: {
    questId: 'simple-swap',
    currentStep: 2,
    whitelistedDomains: ['app.uniswap.org', 'etherscan.io']
  }
}
```

---

### Task: Implement Quest State Storage
**W3QH-81** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-79

**Description:**  
Store active quest state using chrome.storage.local.

**Acceptance Criteria:**
- [ ] Active quest data saved to chrome.storage.local
- [ ] Data structure defined and documented
- [ ] Storage cleared when quest completed
- [ ] Retrieval functions created
- [ ] Error handling for storage failures

---

### Task: Implement Tab Monitoring and Domain Verification
**W3QH-82** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-79

**Description:**  
Monitor tab navigation and verify domains against whitelist.

**Acceptance Criteria:**
- [ ] chrome.tabs.onUpdated listener added
- [ ] Extract domain from tab URL
- [ ] Compare domain against whitelisted domains
- [ ] Determine verification status (VERIFIED/UNVERIFIED/NONE)
- [ ] Handle edge cases (localhost, file://, etc.)
- [ ] Only process tabs with active quest

**Domain Verification Logic:**
```javascript
if (whitelistedDomains.includes(domain)) {
  status = 'VERIFIED';
} else {
  status = 'UNVERIFIED';
}
```

---

### Task: Implement Content Script Communication
**W3QH-83** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-79

**Description:**  
Send verification status and quest info to content scripts.

**Acceptance Criteria:**
- [ ] chrome.tabs.sendMessage used to communicate
- [ ] Message includes verification status
- [ ] Message includes current step description
- [ ] Sent to active tab on URL change
- [ ] Error handling for non-responsive tabs

---

### Story: Implement Content Script
**W3QH-84** | Story | Priority: Critical | Estimate: 13 points | Epic: W3QH-73

**Description:**  
Develop content script that injects HUD UI and monitors wallet interactions.

**Acceptance Criteria:**
- [ ] content_script.js created and injected on all pages
- [ ] HUD UI injected into pages
- [ ] Domain verification status displayed
- [ ] Current quest step displayed
- [ ] Wallet interaction monitoring implemented
- [ ] Transaction risk analysis implemented
- [ ] Pre-flight warning system implemented
- [ ] Success toasts shown on completion

**Sub-tasks:**
- W3QH-85: Create HUD UI injection
- W3QH-86: Display domain verification status
- W3QH-87: Implement wallet interaction monitoring
- W3QH-88: Implement transaction risk analysis
- W3QH-89: Create pre-flight warning modal
- W3QH-90: Implement completion toast notifications

---

### Task: Create HUD UI Injection
**W3QH-85** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-84

**Description:**  
Inject HUD overlay into web pages.

**Acceptance Criteria:**
- [ ] HUD container div created and appended to body
- [ ] Fixed position in corner of page
- [ ] Styled with CSS to stand out but not intrude
- [ ] Z-index set high to overlay content
- [ ] Minimize/expand functionality
- [ ] Does not interfere with page functionality
- [ ] Removed when no active quest

---

### Task: Display Domain Verification Status
**W3QH-86** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-84

**Description:**  
Show verification status in HUD based on messages from background script.

**Acceptance Criteria:**
- [ ] Receive messages from background script
- [ ] VERIFIED status shows green checkmark and border
- [ ] UNVERIFIED status shows red/amber warning
- [ ] Warning message explains risk
- [ ] Current step description displayed
- [ ] Smooth transitions between states
- [ ] NONE status hides HUD or shows neutral state

---

### Task: Implement Wallet Interaction Monitoring
**W3QH-87** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-84

**Description:**  
Monitor window.ethereum for transaction requests.

**Acceptance Criteria:**
- [ ] Check if window.ethereum exists
- [ ] Wrap ethereum.request method safely
- [ ] Intercept eth_sendTransaction calls
- [ ] Intercept eth_signTypedData_v4 calls
- [ ] Extract transaction data
- [ ] Allow original call to proceed after checks
- [ ] Handle errors in wrapping gracefully

**Monitoring Approach:**
```javascript
const originalRequest = window.ethereum.request;
window.ethereum.request = async function(args) {
  if (args.method === 'eth_sendTransaction') {
    // Analyze transaction
    // Show warning if needed
  }
  return originalRequest.call(this, args);
};
```

---

### Task: Implement Transaction Risk Analysis
**W3QH-88** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-84

**Description:**  
Analyze transaction data for common risks.

**Acceptance Criteria:**
- [ ] Check for unlimited token approvals (max uint256)
- [ ] Check for setApprovalForAll calls
- [ ] Check for large token approval amounts
- [ ] Identify contract interactions vs simple transfers
- [ ] Risk level assigned (low/medium/high)
- [ ] Risk explanation generated
- [ ] Known scam contracts flagged (optional)

**Risk Patterns:**
- Unlimited approval: value === '0xffffffffffffffff...'
- SetApprovalForAll: function signature in data
- Unknown contract: not on whitelist

---

### Task: Create Pre-Flight Warning Modal
**W3QH-89** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-84

**Description:**  
Display warning modal before risky transactions.

**Acceptance Criteria:**
- [ ] Modal overlays page when risk detected
- [ ] Clear explanation of risk
- [ ] "Proceed Anyway" and "Cancel" buttons
- [ ] Cancel button stops transaction
- [ ] Proceed allows transaction to continue
- [ ] Modal styled clearly and prominently
- [ ] Cannot be accidentally dismissed

---

### Task: Implement Completion Toast Notifications
**W3QH-90** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-84

**Description:**  
Show success notification when quest completed.

**Acceptance Criteria:**
- [ ] Listen for QUEST_COMPLETED message from background
- [ ] Toast notification injected into page
- [ ] Shows XP gained and badge earned
- [ ] Celebration animation (confetti, fade-in)
- [ ] Auto-dismiss after 5 seconds
- [ ] Click to dismiss
- [ ] Does not block page interaction

---

### Story: Implement Web App ↔ Extension Communication
**W3QH-91** | Story | Priority: High | Estimate: 5 points | Epic: W3QH-73

**Description:**  
Establish messaging between Next.js app and browser extension.

**Acceptance Criteria:**
- [ ] Web app can send messages to extension
- [ ] Extension confirms receipt
- [ ] Active quest synced on quest start
- [ ] Completion events sent to extension
- [ ] Error handling for extension not installed
- [ ] Graceful degradation if extension unavailable

**Sub-tasks:**
- W3QH-92: Implement message sending from Next.js app
- W3QH-93: Handle extension not installed scenario
- W3QH-94: Test end-to-end communication

---

### Task: Implement Message Sending from Next.js App
**W3QH-92** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-91

**Description:**  
Add logic to send messages to extension from web app.

**Acceptance Criteria:**
- [ ] Function created to send messages to extension
- [ ] chrome.runtime.sendMessage used (check if exists)
- [ ] Message sent when user starts quest
- [ ] Message sent when quest verified complete
- [ ] Extension ID hardcoded or configurable
- [ ] Promise handling for response

**Code Reference:**
```typescript
// src/lib/extension/messaging.ts
export const sendToExtension = async (message: any) => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    try {
      await chrome.runtime.sendMessage(EXTENSION_ID, message);
    } catch (error) {
      console.warn('Extension not available:', error);
    }
  }
};
```

---

### Task: Handle Extension Not Installed Scenario
**W3QH-93** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-91

**Description:**  
Gracefully handle when extension is not installed.

**Acceptance Criteria:**
- [ ] Check for chrome.runtime availability
- [ ] Show optional banner suggesting extension install
- [ ] Main app functionality not affected
- [ ] No console errors from failed messaging
- [ ] Link to Chrome Web Store for installation

---

### Task: Test End-to-End Communication
**W3QH-94** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-91

**Description:**  
Test complete messaging flow between app and extension.

**Acceptance Criteria:**
- [ ] Start quest in app, verify HUD updates
- [ ] Complete quest, verify extension shows success
- [ ] Test on multiple tabs simultaneously
- [ ] Test with extension disabled
- [ ] No memory leaks or hanging listeners

---

## Phase 7: System Integration & Testing

**Duration:** 1-2 weeks  
**Sprint:** 9-10  
**Epic:** W3QH-95

### Epic: Integration, Testing, and Deployment
**W3QH-95** | Epic | Priority: Critical | Estimate: 34 points

Comprehensive testing, performance optimization, and production deployment preparation.

---

### Story: End-to-End Integration Testing
**W3QH-96** | Story | Priority: Critical | Estimate: 13 points | Epic: W3QH-95

**Description:**  
Test complete user journeys from registration to quest completion.

**Acceptance Criteria:**
- [ ] Complete user flow tested end-to-end
- [ ] All integrations working smoothly
- [ ] No critical bugs identified
- [ ] Edge cases handled properly
- [ ] Error scenarios tested
- [ ] Performance acceptable

**Sub-tasks:**
- W3QH-97: Test complete user registration and onboarding flow
- W3QH-98: Test quest browsing, selection, and mission brief
- W3QH-99: Test AURA AI interaction throughout journey
- W3QH-100: Test extension HUD on external dApps
- W3QH-101: Test on-chain verification and XP awarding
- W3QH-102: Test level-up and badge awarding
- W3QH-103: Test profile page and data display

---

### Task: Test Complete User Registration and Onboarding Flow
**W3QH-97** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-96

**Description:**  
Test new user registration and initial experience.

**Acceptance Criteria:**
- [ ] Email/password registration successful
- [ ] Google OAuth registration successful
- [ ] User profile created in Firestore
- [ ] Initial XP and level set correctly
- [ ] User redirected to dashboard
- [ ] Welcome message or tutorial shown
- [ ] All data persists after refresh

---

### Task: Test Quest Browsing, Selection, and Mission Brief
**W3QH-98** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-96

**Description:**  
Test quest discovery and viewing experience.

**Acceptance Criteria:**
- [ ] Quests load and display correctly
- [ ] Quest cards show proper information
- [ ] Quest selection opens mission brief modal
- [ ] Mission brief displays all required information
- [ ] "Start Quest" updates status correctly
- [ ] External links open in new tabs
- [ ] Modal closes properly

---

### Task: Test AURA AI Interaction Throughout Journey
**W3QH-99** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-96

**Description:**  
Test AI companion functionality in various scenarios.

**Acceptance Criteria:**
- [ ] Chat widget opens and closes smoothly
- [ ] Messages sent and responses received
- [ ] Context correctly included in queries
- [ ] Responses relevant to user state
- [ ] Safety guardrails working (test private key query)
- [ ] Error handling for API failures
- [ ] Message history persists during session

---

### Task: Test Extension HUD on External dApps
**W3QH-100** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-96

**Description:**  
Test browser extension on various Web3 websites.

**Acceptance Criteria:**
- [ ] Extension loads on external sites
- [ ] Domain verification status correct
- [ ] Whitelisted sites show VERIFIED status
- [ ] Non-whitelisted sites show UNVERIFIED warning
- [ ] HUD displays current quest step
- [ ] Transaction monitoring intercepts wallet calls
- [ ] Warning modal shows for risky transactions
- [ ] Extension works on Uniswap, OpenSea, etc.

---

### Task: Test On-Chain Verification and XP Awarding
**W3QH-101** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-96

**Description:**  
Test verification system with real on-chain data.

**Acceptance Criteria:**
- [ ] Verification button triggers function call
- [ ] Loading state shown during verification
- [ ] Successful verification awards XP
- [ ] Failed verification shows error message
- [ ] UserQuest status updated to completed
- [ ] Dashboard reflects completion immediately
- [ ] Test all verification types (balance, tx, event)

---

### Task: Test Level-Up and Badge Awarding
**W3QH-102** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-96

**Description:**  
Test leveling system and badge awards.

**Acceptance Criteria:**
- [ ] User levels up when XP threshold crossed
- [ ] Level-up modal displays correctly
- [ ] New level shown in UI immediately
- [ ] Badge awarded and visible in profile
- [ ] Multiple level jumps handled (edge case)
- [ ] XP calculation accurate

---

### Task: Test Profile Page and Data Display
**W3QH-103** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-96

**Description:**  
Test user profile page functionality.

**Acceptance Criteria:**
- [ ] Profile page loads with user data
- [ ] XP Core shows accurate progress
- [ ] Badges displayed correctly
- [ ] Logbook shows completed quests
- [ ] Real-time updates when new quest completed
- [ ] Responsive design works on mobile

---

### Story: Performance Optimization
**W3QH-104** | Story | Priority: High | Estimate: 8 points | Epic: W3QH-95

**Description:**  
Optimize application performance for production.

**Acceptance Criteria:**
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5 seconds
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Firebase Function response times < 500ms
- [ ] Bundle size optimized

**Sub-tasks:**
- W3QH-105: Optimize Next.js build and bundle size
- W3QH-106: Optimize Firebase queries with indexes
- W3QH-107: Optimize images and assets
- W3QH-108: Add caching strategies

---

### Task: Optimize Next.js Build and Bundle Size
**W3QH-105** | Task | Priority: High | Estimate: 3 points | Parent: W3QH-104

**Description:**  
Reduce bundle size and improve load times.

**Acceptance Criteria:**
- [ ] Dynamic imports for heavy components
- [ ] Code splitting configured
- [ ] Tree shaking enabled
- [ ] Unused dependencies removed
- [ ] Bundle analyzer run and optimized
- [ ] Initial bundle < 250KB

---

### Task: Optimize Firebase Queries with Indexes
**W3QH-106** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-104

**Description:**  
Create Firestore indexes for complex queries.

**Acceptance Criteria:**
- [ ] All composite queries indexed
- [ ] Index creation commands documented
- [ ] Query performance measured
- [ ] No unindexed query warnings
- [ ] Query response times < 200ms

---

### Task: Optimize Images and Assets
**W3QH-107** | Task | Priority: Medium | Estimate: 2 points | Parent: W3QH-104

**Description:**  
Optimize all images for web delivery.

**Acceptance Criteria:**
- [ ] next/image used for all images
- [ ] Images compressed and resized
- [ ] WebP format used where supported
- [ ] Lazy loading enabled
- [ ] Badge icons optimized
- [ ] Total image size minimized

---

### Task: Add Caching Strategies
**W3QH-108** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-104

**Description:**  
Implement caching for static data.

**Acceptance Criteria:**
- [ ] Quest data cached (read-only)
- [ ] Level data cached (read-only)
- [ ] React Query configured for data caching
- [ ] Stale-while-revalidate strategy
- [ ] Cache invalidation on updates

---

### Story: Security Audit and Testing
**W3QH-109** | Story | Priority: Critical | Estimate: 8 points | Epic: W3QH-95

**Description:**  
Comprehensive security review and testing.

**Acceptance Criteria:**
- [ ] No API keys exposed in client code
- [ ] Firestore rules tested thoroughly
- [ ] XSS vulnerabilities tested
- [ ] CSRF protections verified
- [ ] Extension security reviewed
- [ ] Third-party dependencies audited

**Sub-tasks:**
- W3QH-110: Audit API key management
- W3QH-111: Test Firestore security rules comprehensively
- W3QH-112: Test for XSS and injection vulnerabilities
- W3QH-113: Audit npm dependencies for vulnerabilities

---

### Task: Audit API Key Management
**W3QH-110** | Task | Priority: Critical | Estimate: 2 points | Parent: W3QH-109

**Description:**  
Verify all API keys are properly secured.

**Acceptance Criteria:**
- [ ] No sensitive keys in client code
- [ ] All keys in Secret Manager or env vars
- [ ] .env files not committed to git
- [ ] Production keys separate from development
- [ ] Access logs reviewed for key exposure

---

### Task: Test Firestore Security Rules Comprehensively
**W3QH-111** | Task | Priority: Critical | Estimate: 3 points | Parent: W3QH-109

**Description:**  
Thorough testing of database security rules.

**Acceptance Criteria:**
- [ ] Users cannot read others' profiles
- [ ] Users cannot write to quests collection
- [ ] Unauthenticated access denied
- [ ] UserQuests properly isolated
- [ ] Admin operations blocked from client
- [ ] Automated test suite for rules

---

### Task: Test for XSS and Injection Vulnerabilities
**W3QH-112** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-109

**Description:**  
Test for common web vulnerabilities.

**Acceptance Criteria:**
- [ ] User inputs sanitized
- [ ] XSS attempts blocked
- [ ] SQL injection not applicable (NoSQL)
- [ ] AI prompt injection tested
- [ ] Markdown rendering safe
- [ ] No eval() or dangerous patterns

---

### Task: Audit npm Dependencies for Vulnerabilities
**W3QH-113** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-109

**Description:**  
Check for known vulnerabilities in dependencies.

**Acceptance Criteria:**
- [ ] npm audit run and reviewed
- [ ] Critical vulnerabilities fixed
- [ ] Dependencies updated to latest stable
- [ ] Automated dependency scanning configured
- [ ] No high/critical issues remaining

---

### Story: Documentation and Deployment
**W3QH-114** | Story | Priority: High | Estimate: 5 points | Epic: W3QH-95

**Description:**  
Prepare documentation and deploy to production.

**Acceptance Criteria:**
- [ ] README.md comprehensive
- [ ] Developer setup guide created
- [ ] User guide created
- [ ] API documentation complete
- [ ] Deployment runbook created
- [ ] Production environment configured
- [ ] Application deployed and tested

**Sub-tasks:**
- W3QH-115: Write comprehensive documentation
- W3QH-116: Deploy Next.js app to production
- W3QH-117: Deploy Firebase Functions
- W3QH-118: Publish browser extension
- W3QH-119: Set up monitoring and alerts

---

### Task: Write Comprehensive Documentation
**W3QH-115** | Task | Priority: High | Estimate: 2 points | Parent: W3QH-114

**Description:**  
Create all necessary documentation.

**Acceptance Criteria:**
- [ ] README.md with project overview
- [ ] CONTRIBUTING.md for developers
- [ ] Setup guide for local development
- [ ] User guide with screenshots
- [ ] API documentation for Firebase Functions
- [ ] Extension user guide
- [ ] Deployment guide

---

### Task: Deploy Next.js App to Production
**W3QH-116** | Task | Priority: Critical | Estimate: 1 point | Parent: W3QH-114

**Description:**  
Deploy web application to hosting platform.

**Acceptance Criteria:**
- [ ] Production build successful
- [ ] Deployed to Vercel or Firebase Hosting
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Environment variables configured
- [ ] Application accessible and functional

---

### Task: Deploy Firebase Functions
**W3QH-117** | Task | Priority: Critical | Estimate: 1 point | Parent: W3QH-114

**Description:**  
Deploy Cloud Functions to production.

**Acceptance Criteria:**
- [ ] Functions deployed using Firebase CLI
- [ ] Environment variables/secrets configured
- [ ] Minimum instances set for low latency
- [ ] Function URLs documented
- [ ] Test calls successful from production app

---

### Task: Publish Browser Extension
**W3QH-118** | Task | Priority: High | Estimate: 1 point | Parent: W3QH-114

**Description:**  
Submit extension to Chrome Web Store.

**Acceptance Criteria:**
- [ ] Production build created
- [ ] Extension tested thoroughly
- [ ] Store listing created with screenshots
- [ ] Privacy policy created
- [ ] Submitted to Chrome Web Store
- [ ] Firefox Add-ons (optional)
- [ ] Review process tracked

---

### Task: Set Up Monitoring and Alerts
**W3QH-119** | Task | Priority: Medium | Estimate: 1 point | Parent: W3QH-114

**Description:**  
Configure production monitoring.

**Acceptance Criteria:**
- [ ] Firebase Analytics enabled
- [ ] Error tracking configured (Sentry/Crashlytics)
- [ ] Performance monitoring enabled
- [ ] Alerts set for critical errors
- [ ] Function logs monitored
- [ ] Uptime monitoring configured

---

## Summary Statistics

### Total Tickets by Type
- **Epics:** 7
- **Stories:** 18
- **Tasks:** 94
- **Total Tickets:** 119

### Total Story Points by Phase
- **Phase 1:** 21 points (Foundation)
- **Phase 2:** 21 points (Backend & Database)
- **Phase 3:** 34 points (Core Frontend)
- **Phase 4:** 21 points (AI Integration)
- **Phase 5:** 21 points (On-Chain Verification)
- **Phase 6:** 34 points (Browser Extension)
- **Phase 7:** 34 points (Integration & Testing)
- **Total:** 186 story points

### Estimated Timeline
- **Total Duration:** 10 weeks
- **Sprint Length:** 2 weeks
- **Total Sprints:** 5 sprints
- **Team Size:** Assumes 2-3 developers

---

## Linear/JIRA Import Format

For importing into Linear or JIRA, use the following CSV format:

```csv
Ticket ID,Type,Summary,Description,Priority,Estimate,Epic,Parent,Status
W3QH-1,Epic,Project Foundation Setup,"Set up the foundational infrastructure...",Critical,21,,,"To Do"
W3QH-2,Story,Initialize Next.js Project,"Create a new Next.js application...",Critical,5,W3QH-1,,"To Do"
...
```

---

## Notes for Project Management

### Sprint Planning Recommendations
1. **Sprint 1-2:** Focus on foundational setup and getting development environment ready
2. **Sprint 3:** Complete database implementation and security rules
3. **Sprint 4-5:** Build core UI components and dashboard
4. **Sprint 6:** Integrate AI companion
5. **Sprint 7:** Implement verification system
6. **Sprint 8-9:** Develop browser extension
7. **Sprint 10:** Integration testing and production deployment

### Risk Mitigation
- Front-load risky items (Firebase setup, Gemini API)
- Build vertical slices where possible
- Test integrations early and often
- Keep stakeholders updated weekly

### Definition of Done
Each ticket must meet these criteria:
- [ ] Code reviewed by peer
- [ ] Unit tests written (where applicable)
- [ ] Integration tested
- [ ] Documentation updated
- [ ] No TypeScript errors
- [ ] No security vulnerabilities
- [ ] Merged to main branch

---

**Document Maintenance:**  
This task list should be updated regularly as work progresses. Mark tickets as In Progress, In Review, and Done. Add new tickets as needed based on discoveries during implementation.
