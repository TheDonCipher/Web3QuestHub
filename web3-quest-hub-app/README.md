# Web3 Quest Hub - Next.js Application

The main web application for the Web3 Quest Hub platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Authentication**: Email/Password and Google OAuth via Firebase
- **Dashboard**: Browse and select quests organized by expeditions
- **Profile**: View XP progress, level, badges, and activity log
- **Mission Briefs**: Detailed quest information with action plans
- **AURA AI Chat**: Floating chat widget with contextual assistance
- **Real-time Updates**: Live data synchronization with Firestore
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Firebase SDK (Auth, Firestore, Functions)
- React Query (data fetching)
- Framer Motion (animations)

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_EXTENSION_ID=your-extension-id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Type Check

```bash
npm run type-check
```

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Landing page
├── login/                  # Login page
├── register/               # Registration page
├── dashboard/              # Main dashboard
├── profile/                # User profile
└── globals.css             # Global styles

components/
├── layout/                 # Header, Layout, ProgressSidebar
├── dashboard/              # ExplorerDashboard, QuestGrid, QuestCard
├── profile/                # AvatarConsole, XPCore, ArtifactInventory, Logbook
├── modals/                 # MissionBriefModal
└── ai/                     # AuraChatWidget

lib/
├── firebase/               # Firebase configuration and helpers
├── contexts/               # React contexts (AuthContext)
├── hooks/                  # Custom hooks (useQuests, useUserQuests)
├── types/                  # TypeScript types
├── utils/                  # Utility functions (XP calculator)
└── extension/              # Extension messaging utilities
```

## Key Components

### Authentication

- `lib/contexts/AuthContext.tsx` - Manages Firebase Auth state
- `lib/firebase/auth.ts` - Auth helper functions
- `app/login/page.tsx` - Login interface
- `app/register/page.tsx` - Registration interface

### Dashboard

- `app/dashboard/page.tsx` - Main dashboard page
- `components/dashboard/ExplorerDashboard.tsx` - Dashboard container
- `components/dashboard/QuestGrid.tsx` - Quest grid layout
- `components/dashboard/QuestCard.tsx` - Individual quest card
- `components/layout/ProgressSidebar.tsx` - User progress display

### Profile

- `app/profile/page.tsx` - Profile page
- `components/profile/AvatarConsole.tsx` - Profile container
- `components/profile/XPCore.tsx` - Circular XP progress chart
- `components/profile/ArtifactInventory.tsx` - Badge collection
- `components/profile/Logbook.tsx` - Activity feed

### Mission Brief

- `components/modals/MissionBriefModal.tsx` - Quest details modal
  - Displays quest lore, action plan, rewards
  - "Start Quest" button (sends to extension)
  - "Verify Completion" button (triggers Firebase Function)

### AI Chat

- `components/ai/AuraChatWidget.tsx` - Floating chat widget
  - Calls `getAuraResponse` Firebase Function
  - Maintains conversation history
  - Context-aware responses

## Firebase Integration

### Firestore Collections

- `users/{userId}` - User profiles
- `quests/{questId}` - Quest definitions (read-only)
- `userQuests/{userId}/quests/{questId}` - User quest progress
- `levels/{levelNumber}` - Level progression data (read-only)

### Cloud Functions

- `verifyMissionCompletion` - Verifies on-chain actions and awards XP
- `getAuraResponse` - AI companion backend proxy

## Styling

Uses Tailwind CSS with custom theme:

- Cyber-themed color palette (cyan, purple, pink)
- Custom animations (glow, slide-in)
- Responsive breakpoints
- Dark mode by default

### Custom Classes

- `.text-glow` - Glowing text effect
- `.cyber-border` - Neon border with glow
- `.animate-glow` - Pulsing glow animation

## State Management

- **Authentication**: React Context (`AuthContext`)
- **Data Fetching**: Custom hooks with Firebase real-time listeners
- **Local State**: React `useState` and `useEffect`
- **Caching**: React Query (optional)

## Extension Communication

The app communicates with the browser extension:

```typescript
import { sendActiveQuest, sendQuestCompleted } from '@/lib/extension/messaging';

// When user starts a quest
await sendActiveQuest({
  questId: 'simple-swap',
  currentStep: 1,
  whitelistedDomains: ['app.uniswap.org'],
});

// When quest is verified
await sendQuestCompleted('simple-swap', 150);
```

## Performance Optimizations

- Next.js automatic code splitting
- Image optimization with `next/image`
- Server-side rendering (SSR) for initial page load
- Lazy loading for heavy components
- Efficient Firestore queries with indexes

## Testing

TODO: Add testing framework

```bash
npm run test
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## Troubleshooting

### Firebase Connection Issues

- Verify `.env.local` variables are correct
- Check Firebase project settings
- Ensure Firestore and Auth are enabled

### Extension Not Communicating

- Verify `NEXT_PUBLIC_EXTENSION_ID` is set
- Ensure extension is loaded in Chrome
- Check browser console for errors

### TypeScript Errors

```bash
npm run type-check
```

Fix any type errors before building.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
