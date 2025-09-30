# Web3 Quest Hub

A gamified educational platform designed to onboard beginners into the Web3 ecosystem through immersive, secure, and rewarding quests.

## 📋 Project Overview

Web3 Quest Hub transforms the intimidating process of entering Web3 into an adventure. Users complete quests that guide them through real-world Web3 interactions while earning XP, leveling up, and collecting badges. An AI companion (AURA) provides contextual help, and a browser extension acts as a security co-pilot.

## 🏗️ Architecture

The platform consists of three main components:

1. **Next.js Web Application** - Main user interface and learning hub
2. **Firebase Backend** - Authentication, Firestore database, and Cloud Functions
3. **Web3 HUD Browser Extension** - Real-time security companion and mission tracker

## 📁 Project Structure

```
Web3QuestHub/
├── IMPLEMENTATION_PLAN.md              # Detailed implementation guide
├── TASKLIST.md                         # JIRA-style task breakdown
├── TSD-W3QH-V1.0.txt                   # Technical Specification Document
├── TRD-W3QH-V1.0.txt                   # Technical Requirements Document
├── firebase.json                       # Firebase project configuration
├── firestore.rules                     # Firestore security rules
├── firestore.indexes.json              # Firestore indexes
│
├── web3-quest-hub-app/                 # Next.js Application
│   ├── app/                            # Next.js 14 App Router
│   │   ├── layout.tsx                  # Root layout with AuthProvider
│   │   ├── page.tsx                    # Landing page
│   │   ├── login/                      # Login page
│   │   ├── register/                   # Registration page
│   │   ├── dashboard/                  # Main dashboard
│   │   └── profile/                    # User profile page
│   │
│   ├── components/                     # React components
│   │   ├── layout/                     # Layout components
│   │   ├── dashboard/                  # Dashboard components
│   │   ├── profile/                    # Profile components
│   │   ├── modals/                     # Modal components
│   │   └── ai/                         # AI chat widget
│   │
│   ├── lib/                            # Utilities and configurations
│   │   ├── firebase/                   # Firebase SDK configuration
│   │   ├── contexts/                   # React contexts
│   │   ├── hooks/                      # Custom React hooks
│   │   ├── types/                      # TypeScript type definitions
│   │   ├── utils/                      # Utility functions
│   │   └── extension/                  # Extension messaging utilities
│   │
│   ├── public/                         # Static assets
│   ├── .env.local.example              # Environment variables template
│   ├── next.config.js                  # Next.js configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── tsconfig.json                   # TypeScript configuration
│   └── package.json                    # Dependencies
│
├── firebase-functions/                 # Cloud Functions
│   ├── src/
│   │   ├── index.ts                    # Function exports
│   │   ├── verifyMissionCompletion.ts  # On-chain verification
│   │   └── getAuraResponse.ts          # AI companion backend
│   ├── .env.example                    # Environment variables template
│   ├── tsconfig.json                   # TypeScript configuration
│   └── package.json                    # Dependencies
│
└── web3-hud-plugin/                    # Browser Extension
    ├── manifest.json                   # Extension manifest (V3)
    ├── background.js                   # Service worker
    ├── content_script.js               # Content script
    ├── popup.html                      # Extension popup
    ├── popup.js                        # Popup logic
    ├── styles/
    │   └── hud.css                     # HUD styling
    └── images/                         # Extension icons
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project
- Google Gemini API key
- Alchemy or Infura API key
- GitHub account (for CI/CD)
- Linear account (for project management)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Web3QuestHub
```

#### 2. Set Up Next.js Application

```bash
cd web3-quest-hub-app
npm install

# Copy environment template and fill in values
cp .env.local.example .env.local
# Edit .env.local with your Firebase configuration

npm run dev
```

The app will be available at `http://localhost:3000`

#### 3. Set Up Firebase Functions

```bash
cd ../firebase-functions
npm install

# Copy environment template and fill in values
cp .env.example .env
# Edit .env with your API keys

# Test locally with emulator
npm run serve

# Deploy to production
npm run deploy
```

#### 4. Set Up Browser Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `web3-hud-plugin` directory
5. Extension should appear in your toolbar

### Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password and Google OAuth)
3. Create a Firestore database in Native mode
4. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
5. Initialize Cloud Functions:
   ```bash
   cd firebase-functions
   firebase deploy --only functions
   ```

### Initial Data Setup

You'll need to populate Firestore with initial data:

**Levels Collection** (`levels/{1-10}`):
- Based on the progression table in TRD-W3QH-V1.0 Section 4.A
- 10 levels from Newbie to Frontier Citizen

**Quests Collection** (`quests/{questId}`):
- At least 5 beginner quests
- Follow schema from TSD-W3QH-V1.0 Section 2.2
- Include verification criteria, badges, and action plans

## 🎮 How It Works

### User Journey

1. **Registration**: User creates account (Email/Password or Google OAuth)
2. **Dashboard**: Browse available quests organized by expeditions
3. **Select Quest**: View mission brief with lore, action plan, and rewards
4. **Start Quest**: Extension HUD activates to guide user
5. **Complete Action**: User performs on-chain action (e.g., token swap)
6. **Verification**: System verifies completion and awards XP
7. **Level Up**: User progresses through levels, unlocking new content

### Key Features

#### AURA AI Companion
- Contextual help based on user's current quest and level
- Safety guardrails (never asks for private keys)
- Encourages best practices
- Answers Web3 questions

#### Browser Extension HUD
- Domain verification (verified/unverified sites)
- Transaction monitoring for risks
- Pre-flight warnings for suspicious transactions
- Quest progress tracking

#### Gamification
- 10 Explorer Levels (Newbie → Frontier Citizen)
- XP system with level progression
- Badge collection for completed quests
- Activity logbook

## 🔐 Security

### Implemented Measures

1. **Firestore Security Rules**: Users can only access their own data
2. **API Key Management**: All keys stored in Google Secret Manager
3. **Transaction Monitoring**: Extension warns about risky transactions
4. **AURA Safety**: AI never requests sensitive information
5. **Domain Whitelisting**: Quests specify verified websites

### Best Practices

- Never commit `.env` files
- Regularly audit dependencies
- Review Firestore security rules
- Monitor function logs for anomalies
- Keep extension permissions minimal

## 📊 Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | Next.js 14 + TypeScript | Web application framework |
| Styling | Tailwind CSS | Utility-first CSS |
| Backend | Firebase (Auth, Firestore, Functions) | BaaS platform |
| AI | Google Gemini API | Conversational AI |
| Web3 | Alchemy SDK | On-chain data verification |
| Extension | Manifest V3 | Browser extension standard |

## 📝 Development Phases

The project is organized into 7 development phases (see `TASKLIST.md` for details):

1. **Phase 1**: Project & Firebase Setup
2. **Phase 2**: Backend & Database Implementation
3. **Phase 3**: Core Frontend Development
4. **Phase 4**: AI Companion Integration
5. **Phase 5**: On-Chain Verification Service
6. **Phase 6**: Browser Plugin Development
7. **Phase 7**: System Integration & Testing

## 🔄 CI/CD Pipeline

Automated testing and deployment with GitHub Actions:

- ✅ **Continuous Integration**: Runs on every push and PR
  - Type checking, linting, and builds
  - Security audits and dependency reviews
  - Browser extension validation

- 🚀 **Preview Deployments**: Automatic Vercel previews for PRs
- 🔐 **Security Scanning**: CodeQL and dependency analysis
- 📊 **Performance Testing**: Lighthouse CI with thresholds
- 🏗️ **Firebase Deployment**: Automated function and rules deployment
- 📦 **Release Automation**: Package and publish on version tags

**See [CI_CD_SETUP.md](CI_CD_SETUP.md) for complete configuration details.**

## 🧪 Testing

### Unit Tests

```bash
cd web3-quest-hub-app
npm run test
```

### Firebase Emulator

```bash
firebase emulators:start
```

### Manual Testing

1. Register a new user
2. Start a quest from the dashboard
3. Navigate to a whitelisted website
4. Verify HUD shows "Verified Portal"
5. Ask AURA a question
6. Complete quest action
7. Click "Verify Completion"
8. Check XP and level updated

## 📚 Documentation

- **IMPLEMENTATION_PLAN.md**: Comprehensive architecture and development guide
- **TASKLIST.md**: Detailed task breakdown with JIRA-style tickets
- **TSD-W3QH-V1.0.txt**: Technical Specification Document
- **TRD-W3QH-V1.0.txt**: Technical Requirements Document

## 🤝 Contributing

This is a demo project. For contributions:

1. Follow the coding conventions in existing code
2. Adhere to specifications in TSD and TRD documents
3. Create detailed PR descriptions
4. Test thoroughly before submitting

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- Built according to specifications in TSD-W3QH-V1.0 and TRD-W3QH-V1.0
- Designed for Web3 education and onboarding
- Inspired by gamification principles in learning

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Note**: This is a demo implementation. Before production deployment:
- Conduct security audits
- Implement comprehensive testing
- Set up monitoring and analytics
- Create privacy policy
- Obtain necessary API rate limits
- Test across multiple browsers
