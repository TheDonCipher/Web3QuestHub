/**
 * Linear Task Import Script
 * 
 * This script imports tasks from TASKLIST.md into Linear
 * Uses the Linear API to create Epics, Stories, and Tasks with proper hierarchy
 */

const { LinearClient } = require('@linear/sdk');
require('dotenv').config();

// Initialize Linear client with API key from environment variable
const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY
});

if (!process.env.LINEAR_API_KEY) {
  console.error('❌ ERROR: LINEAR_API_KEY environment variable is not set!');
  console.error('Please create a .env file with: LINEAR_API_KEY=your_key_here');
  process.exit(1);
}

// Task data structure based on TASKLIST.md
const tasks = {
  epics: [
    {
      id: 'W3QH-1',
      title: 'Phase 1: Project Foundation Setup',
      description: 'Set up the foundational infrastructure for the Web3 Quest Hub platform including Next.js application, Firebase services, and development environment.',
      estimate: 21,
      priority: 1, // Urgent
      stories: [
        {
          id: 'W3QH-2',
          title: 'Initialize Next.js Project',
          description: `Create a new Next.js application using TypeScript with the latest stable version (14.x). Establish the basic project structure including directories for components, pages, styles, and lib.

**Acceptance Criteria:**
- Next.js 14.x project initialized with TypeScript
- Project runs successfully with npm run dev
- Basic folder structure created
- TypeScript configuration optimized for Next.js
- ESLint and Prettier configured
- Git repository initialized with appropriate .gitignore`,
          estimate: 5,
          priority: 1,
          tasks: [
            { id: 'W3QH-3', title: 'Configure TypeScript and tsconfig.json', estimate: 2 },
            { id: 'W3QH-4', title: 'Set up ESLint and Prettier', estimate: 2 },
            { id: 'W3QH-5', title: 'Create Directory Structure', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-6',
          title: 'Set Up Firebase Project',
          description: `Create and configure a new Firebase project with required services: Authentication, Firestore Database, and Cloud Functions.

**Acceptance Criteria:**
- Firebase project created in Google Cloud Console
- Firebase Authentication enabled (Email/Password, Google OAuth)
- Firestore Database created in Native Mode
- Cloud Functions initialized
- Firebase SDK configured in Next.js app
- Environment variables properly configured`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-7', title: 'Create Firebase project and enable services', estimate: 2 },
            { id: 'W3QH-8', title: 'Configure Firebase SDK in Next.js', estimate: 3 },
            { id: 'W3QH-9', title: 'Initialize Firebase Functions directory', estimate: 2 },
            { id: 'W3QH-10', title: 'Set up environment variables and secrets', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-11',
          title: 'Implement Basic Component Structure',
          description: `Create the basic component structure and layout system for the application.`,
          estimate: 5,
          priority: 2,
          tasks: [
            { id: 'W3QH-12', title: 'Configure Tailwind CSS', estimate: 2 },
            { id: 'W3QH-13', title: 'Create root layout and AuthProvider', estimate: 2 },
            { id: 'W3QH-14', title: 'Create Header component', estimate: 1 }
          ]
        }
      ]
    },
    {
      id: 'W3QH-15',
      title: 'Phase 2: Backend & Database Implementation',
      description: 'Implement complete Firestore database schema, populate initial data, and deploy security rules.',
      estimate: 21,
      priority: 1,
      stories: [
        {
          id: 'W3QH-16',
          title: 'Implement Firestore Schema',
          description: `Create all Firestore collections and documents according to specifications in TSD-W3QH-V1.0 Section 2.2.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-17', title: 'Create TypeScript interfaces for data models', estimate: 2 },
            { id: 'W3QH-18', title: 'Create Firestore helper functions', estimate: 3 },
            { id: 'W3QH-19', title: 'Populate initial quest data', estimate: 2 },
            { id: 'W3QH-20', title: 'Populate levels data', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-21',
          title: 'Deploy Firestore Security Rules',
          description: `Implement and deploy Firestore Security Rules exactly as specified in TSD-W3QH-V1.0 Section 2.3.`,
          estimate: 5,
          priority: 1,
          tasks: [
            { id: 'W3QH-22', title: 'Write Firestore Security Rules', estimate: 2 },
            { id: 'W3QH-23', title: 'Test security rules in emulator', estimate: 2 },
            { id: 'W3QH-24', title: 'Deploy security rules to production', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-25',
          title: 'Set Up Firebase Authentication Flows',
          description: `Implement complete authentication flows including registration, login, and user profile creation.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-26', title: 'Create login page and form', estimate: 2 },
            { id: 'W3QH-27', title: 'Create registration page and form', estimate: 2 },
            { id: 'W3QH-28', title: 'Implement user profile creation on registration', estimate: 2 },
            { id: 'W3QH-29', title: 'Implement Google OAuth login', estimate: 2 }
          ]
        }
      ]
    },
    {
      id: 'W3QH-30',
      title: 'Phase 3: Core Frontend Development',
      description: 'Build all core UI components for the Explorer Dashboard and Avatar Console.',
      estimate: 34,
      priority: 2,
      stories: [
        {
          id: 'W3QH-31',
          title: 'Build Explorer Dashboard',
          description: `Implement the main dashboard view with quest grid and progress sidebar.`,
          estimate: 13,
          priority: 1,
          tasks: [
            { id: 'W3QH-32', title: 'Create ExplorerDashboard component', estimate: 3 },
            { id: 'W3QH-33', title: 'Create QuestGrid component', estimate: 3 },
            { id: 'W3QH-34', title: 'Create QuestCard component', estimate: 3 },
            { id: 'W3QH-35', title: 'Create ProgressSidebar component', estimate: 2 },
            { id: 'W3QH-36', title: 'Implement data fetching hooks', estimate: 2 }
          ]
        },
        {
          id: 'W3QH-37',
          title: 'Build Mission Brief Modal',
          description: `Create modal component displaying detailed quest information and verification interface.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-38', title: 'Create MissionBriefModal component', estimate: 3 },
            { id: 'W3QH-39', title: 'Implement quest status update logic', estimate: 3 },
            { id: 'W3QH-40', title: 'Add verification trigger button', estimate: 2 }
          ]
        },
        {
          id: 'W3QH-41',
          title: 'Build Avatar Console (Profile Page)',
          description: `Create user profile page with XP visualization, badge inventory, and activity log.`,
          estimate: 13,
          priority: 2,
          tasks: [
            { id: 'W3QH-42', title: 'Create AvatarConsole component', estimate: 3 },
            { id: 'W3QH-43', title: 'Create XPCore progress visualization', estimate: 4 },
            { id: 'W3QH-44', title: 'Create ArtifactInventory and BadgeGrid', estimate: 3 },
            { id: 'W3QH-45', title: 'Create Logbook component', estimate: 3 }
          ]
        }
      ]
    },
    {
      id: 'W3QH-46',
      title: 'Phase 4: AI Companion Integration (AURA)',
      description: 'Integrate Google Gemini API for the AURA AI companion with contextual intelligence and safety guardrails.',
      estimate: 21,
      priority: 2,
      stories: [
        {
          id: 'W3QH-47',
          title: 'Develop getAuraResponse Firebase Function',
          description: `Create Firebase Function that acts as secure backend proxy for Gemini API with context enrichment and safety measures.`,
          estimate: 13,
          priority: 1,
          tasks: [
            { id: 'W3QH-48', title: 'Set up Gemini API credentials', estimate: 2 },
            { id: 'W3QH-49', title: 'Implement getAuraResponse function logic', estimate: 4 },
            { id: 'W3QH-50', title: 'Add context enrichment from Firestore', estimate: 3 },
            { id: 'W3QH-51', title: 'Implement safety guardrails and content filtering', estimate: 3 },
            { id: 'W3QH-52', title: 'Test function with various scenarios', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-53',
          title: 'Integrate AURA into Frontend',
          description: `Create chat widget component and integrate with getAuraResponse function.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-54', title: 'Create AuraChatWidget component', estimate: 3 },
            { id: 'W3QH-55', title: 'Implement chat UI and message display', estimate: 2 },
            { id: 'W3QH-56', title: 'Integrate with getAuraResponse function', estimate: 2 },
            { id: 'W3QH-57', title: 'Add context tracking and enrichment', estimate: 1 }
          ]
        }
      ]
    },
    {
      id: 'W3QH-58',
      title: 'Phase 5: On-Chain Verification Service',
      description: 'Implement the verification service that checks on-chain actions and awards XP/badges.',
      estimate: 21,
      priority: 2,
      stories: [
        {
          id: 'W3QH-59',
          title: 'Develop verifyMissionCompletion Firebase Function',
          description: `Create Firebase Function that verifies on-chain actions using Web3 API and updates user progress atomically.`,
          estimate: 13,
          priority: 1,
          tasks: [
            { id: 'W3QH-60', title: 'Set up Web3 API provider credentials', estimate: 2 },
            { id: 'W3QH-61', title: 'Implement verifyMissionCompletion function structure', estimate: 2 },
            { id: 'W3QH-62', title: 'Implement balance_check verification', estimate: 2 },
            { id: 'W3QH-63', title: 'Implement tx_history_check verification', estimate: 2 },
            { id: 'W3QH-64', title: 'Implement event_check verification', estimate: 2 },
            { id: 'W3QH-65', title: 'Implement atomic Firestore transaction logic', estimate: 3 },
            { id: 'W3QH-66', title: 'Add XP calculation and level progression', estimate: 1 },
            { id: 'W3QH-67', title: 'Test verification with various quest types', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-68',
          title: 'Integrate Verification into Frontend',
          description: `Connect verification system to Mission Brief modal and add success feedback.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-69', title: 'Connect verification button to function', estimate: 2 },
            { id: 'W3QH-70', title: 'Add success feedback and animations', estimate: 2 },
            { id: 'W3QH-71', title: 'Implement level-up celebration modal', estimate: 3 },
            { id: 'W3QH-72', title: 'Refresh dashboard data after verification', estimate: 1 }
          ]
        }
      ]
    },
    {
      id: 'W3QH-73',
      title: 'Phase 6: Browser Extension Development',
      description: 'Develop browser extension with domain verification, transaction monitoring, and quest tracking.',
      estimate: 34,
      priority: 3,
      stories: [
        {
          id: 'W3QH-74',
          title: 'Create Extension Scaffold',
          description: `Set up browser extension project structure with Manifest V3.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-75', title: 'Create manifest.json with Manifest V3', estimate: 2 },
            { id: 'W3QH-76', title: 'Create extension directory structure', estimate: 1 },
            { id: 'W3QH-77', title: 'Add icons and branding assets', estimate: 2 },
            { id: 'W3QH-78', title: 'Create popup interface', estimate: 3 }
          ]
        },
        {
          id: 'W3QH-79',
          title: 'Implement Background Script',
          description: `Develop service worker to manage state and communicate with web app and content scripts.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-80', title: 'Set up message listener for web app', estimate: 2 },
            { id: 'W3QH-81', title: 'Implement quest state storage', estimate: 2 },
            { id: 'W3QH-82', title: 'Implement tab monitoring and domain verification', estimate: 3 },
            { id: 'W3QH-83', title: 'Implement content script communication', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-84',
          title: 'Implement Content Script',
          description: `Develop content script that injects HUD UI and monitors wallet interactions.`,
          estimate: 13,
          priority: 1,
          tasks: [
            { id: 'W3QH-85', title: 'Create HUD UI injection', estimate: 2 },
            { id: 'W3QH-86', title: 'Display domain verification status', estimate: 2 },
            { id: 'W3QH-87', title: 'Implement wallet interaction monitoring', estimate: 3 },
            { id: 'W3QH-88', title: 'Implement transaction risk analysis', estimate: 3 },
            { id: 'W3QH-89', title: 'Create pre-flight warning modal', estimate: 2 },
            { id: 'W3QH-90', title: 'Implement completion toast notifications', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-91',
          title: 'Implement Web App ↔ Extension Communication',
          description: `Establish messaging between Next.js app and browser extension.`,
          estimate: 5,
          priority: 1,
          tasks: [
            { id: 'W3QH-92', title: 'Implement message sending from Next.js app', estimate: 2 },
            { id: 'W3QH-93', title: 'Handle extension not installed scenario', estimate: 2 },
            { id: 'W3QH-94', title: 'Test end-to-end communication', estimate: 1 }
          ]
        }
      ]
    },
    {
      id: 'W3QH-95',
      title: 'Phase 7: System Integration & Testing',
      description: 'Comprehensive testing, performance optimization, and production deployment preparation.',
      estimate: 34,
      priority: 3,
      stories: [
        {
          id: 'W3QH-96',
          title: 'End-to-End Integration Testing',
          description: `Test complete user journeys from registration to quest completion.`,
          estimate: 13,
          priority: 1,
          tasks: [
            { id: 'W3QH-97', title: 'Test complete user registration and onboarding flow', estimate: 2 },
            { id: 'W3QH-98', title: 'Test quest browsing, selection, and mission brief', estimate: 2 },
            { id: 'W3QH-99', title: 'Test AURA AI interaction throughout journey', estimate: 2 },
            { id: 'W3QH-100', title: 'Test extension HUD on external dApps', estimate: 2 },
            { id: 'W3QH-101', title: 'Test on-chain verification and XP awarding', estimate: 2 },
            { id: 'W3QH-102', title: 'Test level-up and badge awarding', estimate: 2 },
            { id: 'W3QH-103', title: 'Test profile page and data display', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-104',
          title: 'Performance Optimization',
          description: `Optimize application performance for production.`,
          estimate: 8,
          priority: 2,
          tasks: [
            { id: 'W3QH-105', title: 'Optimize Next.js build and bundle size', estimate: 3 },
            { id: 'W3QH-106', title: 'Optimize Firebase queries with indexes', estimate: 2 },
            { id: 'W3QH-107', title: 'Optimize images and assets', estimate: 2 },
            { id: 'W3QH-108', title: 'Add caching strategies', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-109',
          title: 'Security Audit and Testing',
          description: `Comprehensive security review and testing.`,
          estimate: 8,
          priority: 1,
          tasks: [
            { id: 'W3QH-110', title: 'Audit API key management', estimate: 2 },
            { id: 'W3QH-111', title: 'Test Firestore security rules comprehensively', estimate: 3 },
            { id: 'W3QH-112', title: 'Test for XSS and injection vulnerabilities', estimate: 2 },
            { id: 'W3QH-113', title: 'Audit npm dependencies for vulnerabilities', estimate: 1 }
          ]
        },
        {
          id: 'W3QH-114',
          title: 'Documentation and Deployment',
          description: `Prepare documentation and deploy to production.`,
          estimate: 5,
          priority: 2,
          tasks: [
            { id: 'W3QH-115', title: 'Write comprehensive documentation', estimate: 2 },
            { id: 'W3QH-116', title: 'Deploy Next.js app to production', estimate: 1 },
            { id: 'W3QH-117', title: 'Deploy Firebase Functions', estimate: 1 },
            { id: 'W3QH-118', title: 'Publish browser extension', estimate: 1 }
          ]
        }
      ]
    }
  ]
};

// Priority mapping
const priorityMap = {
  1: 1, // Urgent
  2: 2, // High
  3: 3  // Normal
};

async function importTasks() {
  try {
    console.log('🚀 Starting Linear task import...\n');

    // Get the team
    const teams = await linearClient.teams();
    if (!teams.nodes || teams.nodes.length === 0) {
      throw new Error('No teams found. Please create a team in Linear first.');
    }
    
    const team = teams.nodes[0];
    console.log(`✅ Found team: ${team.name} (${team.key})\n`);

    // Track created issues for parent linking
    const issueMap = new Map();

    // Create epics and their children
    for (const epic of tasks.epics) {
      console.log(`\n📦 Creating Epic: ${epic.title}`);
      
      const epicIssue = await linearClient.createIssue({
        teamId: team.id,
        title: epic.title,
        description: epic.description,
        priority: priorityMap[epic.priority],
        estimate: epic.estimate
      });

      console.log(`   ✓ Created: ${team.key}-${epicIssue.issue?.number || '?'}`);
      issueMap.set(epic.id, epicIssue.issue?.id);

      // Wait a bit to avoid rate limiting
      await sleep(500);

      // Create stories
      for (const story of epic.stories) {
        console.log(`  📝 Creating Story: ${story.title}`);
        
        const storyIssue = await linearClient.createIssue({
          teamId: team.id,
          title: story.title,
          description: story.description,
          priority: priorityMap[story.priority],
          estimate: story.estimate,
          parentId: issueMap.get(epic.id)
        });

        console.log(`     ✓ Created: ${team.key}-${storyIssue.issue?.number || '?'}`);
        issueMap.set(story.id, storyIssue.issue?.id);

        await sleep(500);

        // Create tasks
        if (story.tasks) {
          for (const task of story.tasks) {
            console.log(`    ✅ Creating Task: ${task.title}`);
            
            const taskIssue = await linearClient.createIssue({
              teamId: team.id,
              title: task.title,
              estimate: task.estimate,
              priority: 3, // Normal priority for tasks
              parentId: issueMap.get(story.id)
            });

            console.log(`       ✓ Created: ${team.key}-${taskIssue.issue?.number || '?'}`);
            issueMap.set(task.id, taskIssue.issue?.id);

            await sleep(500);
          }
        }
      }
    }

    console.log('\n\n✅ Import completed successfully!');
    console.log(`📊 Total issues created: ${issueMap.size}`);
    console.log('\n🎯 Next steps:');
    console.log('1. Go to Linear and verify all issues were created');
    console.log('2. Adjust priorities and assignments as needed');
    console.log('3. Create your first sprint with Phase 1 tasks');
    console.log('4. Start working! 🚀\n');

  } catch (error) {
    console.error('\n❌ Error importing tasks:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the import
importTasks();
