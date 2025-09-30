# Setting Up GitHub and Project Management (JIRA/Linear)

This guide walks you through setting up GitHub repository and project management tools (JIRA or Linear) for the Web3 Quest Hub project.

---

## Part 1: GitHub Setup

### Step 1: Create GitHub Repository

#### Option A: Via GitHub Website

1. **Go to GitHub** and log in to your account
   - Visit: https://github.com

2. **Create New Repository**
   - Click the "+" icon in top-right corner
   - Select "New repository"

3. **Configure Repository**
   ```
   Repository name: Web3QuestHub
   Description: A gamified educational platform for Web3 onboarding
   Visibility: ○ Public  ● Private (your choice)
   
   ☐ Add a README file (we already have one)
   ☐ Add .gitignore (we already have one)
   ☐ Choose a license (add later if needed)
   ```

4. **Click "Create repository"**

#### Option B: Via GitHub CLI (gh)

```bash
# Install GitHub CLI if not already installed
# Windows: winget install --id GitHub.cli
# Mac: brew install gh

# Login to GitHub
gh auth login

# Create repository
gh repo create Web3QuestHub --private --description "A gamified educational platform for Web3 onboarding"
```

### Step 2: Initialize Git Locally

```bash
# Navigate to your project directory
cd "C:\Users\Japan\OneDrive\Documents\GitHub\Web3QuestHub"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial project setup

- Add Next.js web application with TypeScript
- Add Firebase Cloud Functions for backend
- Add Web3 HUD browser extension
- Add comprehensive documentation (TSD, TRD, Implementation Plan, Task List)
- Add AGENTS.md for development guidelines
- Configure Tailwind CSS, ESLint, and TypeScript
- Set up Firestore security rules

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"
```

### Step 3: Connect to GitHub Remote

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Web3QuestHub.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Set Up Branch Protection (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** → **Branches**
3. Click **Add branch protection rule**
4. Configure:
   ```
   Branch name pattern: main
   
   ☑ Require a pull request before merging
     ☑ Require approvals (1)
   ☑ Require status checks to pass before merging
   ☑ Require branches to be up to date before merging
   ☐ Require conversation resolution before merging
   ☐ Do not allow bypassing the above settings
   ```

### Step 5: Add Repository Topics (Optional)

1. Go to your repository on GitHub
2. Click the gear icon next to "About"
3. Add topics:
   ```
   web3, education, nextjs, firebase, typescript, gamification, blockchain, 
   browser-extension, ai, gemini-api
   ```

---

## Part 2: Linear Setup (Recommended for Solo/Small Teams)

Linear is modern, fast, and developer-friendly. Perfect for this project.

### Step 1: Create Linear Workspace

1. **Sign up for Linear**
   - Visit: https://linear.app
   - Click "Sign up"
   - Choose "Continue with Google" or email

2. **Create Workspace**
   ```
   Workspace name: Web3 Quest Hub
   Workspace URL: web3questhub.linear.app
   ```

3. **Choose Plan**
   - Free plan works for solo development
   - Paid plan if you need unlimited issues

### Step 2: Set Up Projects

1. **Create Project**
   - Click "Projects" in sidebar
   - Click "+ New project"
   - Name: "Web3 Quest Hub - MVP"
   - Start date: Today
   - Target date: 10 weeks from now

2. **Create Milestones** (Optional)
   - Phase 1: Foundation & Setup
   - Phase 2: Backend & Database
   - Phase 3: Core Frontend
   - Phase 4: AI Integration
   - Phase 5: On-Chain Verification
   - Phase 6: Browser Extension
   - Phase 7: Integration & Testing

### Step 3: Set Up Teams

1. **Create Team**
   - Click "Settings" → "Teams"
   - Click "+ New team"
   - Name: "Development"
   - Key: "DEV" (this will be your ticket prefix)

2. **Configure Workflow**
   - Backlog
   - Todo
   - In Progress
   - In Review
   - Done
   - Cancelled

### Step 4: Import Tasks from TASKLIST.md

Linear doesn't have direct CSV import for free tier, so you'll need to create issues manually or use the API.

#### Option A: Manual Creation (Simple, Recommended)

1. **Create Epics** (7 total)
   ```
   DEV-1: Phase 1 - Project Foundation Setup
   DEV-2: Phase 2 - Backend & Database Implementation
   DEV-3: Phase 3 - Core Frontend Development
   DEV-4: Phase 4 - AI Companion Integration
   DEV-5: Phase 5 - On-Chain Verification Service
   DEV-6: Phase 6 - Browser Extension Development
   DEV-7: Phase 7 - System Integration & Testing
   ```

2. **For each Epic, create Stories and Tasks**
   - Reference TASKLIST.md for details
   - Copy ticket descriptions
   - Set story points (estimates)
   - Link dependencies

Example for first epic:
```
Title: Initialize Next.js Project
Description: Create a new Next.js application using TypeScript with the latest stable version (14.x). Establish the basic project structure including directories for components, pages, styles, and lib.

Acceptance Criteria:
- [ ] Next.js 14.x project initialized with TypeScript
- [ ] Project runs successfully with `npm run dev`
- [ ] Basic folder structure created
- [ ] TypeScript configuration optimized for Next.js
- [ ] ESLint and Prettier configured

Story Points: 5
Epic: DEV-1
Priority: High
```

#### Option B: Using Linear API (Advanced)

Create a script to import tasks:

```bash
# Install Linear SDK
npm install @linear/sdk

# Create import script
# See example below
```

Create `import-tasks.js`:

```javascript
const { LinearClient } = require('@linear/sdk');

const linearClient = new LinearClient({
  apiKey: 'YOUR_LINEAR_API_KEY' // Get from Settings → API
});

async function importTasks() {
  // Get team
  const teams = await linearClient.teams();
  const team = teams.nodes[0];

  // Create Epic
  const epic = await linearClient.createIssue({
    teamId: team.id,
    title: 'Phase 1 - Project Foundation Setup',
    description: 'Set up foundational infrastructure...',
    priority: 1, // Urgent
    estimate: 21
  });

  // Create child tasks
  await linearClient.createIssue({
    teamId: team.id,
    title: 'Initialize Next.js Project',
    description: 'Create a new Next.js application...',
    parentId: epic.id,
    priority: 1,
    estimate: 5
  });

  // Continue for all tasks...
}

importTasks();
```

### Step 5: Set Up GitHub Integration

1. **In Linear**:
   - Go to **Settings** → **Integrations**
   - Click **GitHub**
   - Click "Add GitHub account"
   - Authorize Linear to access your GitHub

2. **Connect Repository**:
   - Select "Web3QuestHub" repository
   - Configure settings:
     ```
     ☑ Sync commits, PRs, and branches
     ☑ Auto-close issues on PR merge
     ☑ Create PR from Linear
     ```

3. **Use GitHub Integration**:
   - When creating commits, reference Linear issues:
     ```bash
     git commit -m "feat: add quest grid component (DEV-15)"
     ```
   - Linear will automatically link the commit to issue DEV-15

### Step 6: Configure Views

Create custom views for workflow:

1. **Active Sprint View**
   ```
   Filters:
   - Status: Todo, In Progress, In Review
   - Assignee: Me
   
   Sort: Priority (High → Low)
   Group: Status
   ```

2. **Phase View**
   ```
   Filters:
   - Epic: [Current Phase Epic]
   
   Group: Parent Issue
   Sort: Custom Order
   ```

3. **Roadmap View**
   - Switch to "Roadmap" tab
   - Shows all epics on timeline

---

## Part 3: JIRA Setup (Alternative for Larger Teams)

Use JIRA if your organization already uses it or you need advanced features.

### Step 1: Create JIRA Project

1. **Sign up for JIRA**
   - Visit: https://www.atlassian.com/software/jira/free
   - Create account or log in

2. **Create Project**
   - Click "Create project"
   - Select "Scrum" or "Kanban"
   - Project name: "Web3 Quest Hub"
   - Project key: "W3QH"

### Step 2: Configure Board

1. **Create Columns**:
   - Backlog
   - To Do
   - In Progress
   - In Review
   - Done

2. **Set Up Issue Types**:
   - Epic
   - Story
   - Task
   - Bug
   - Sub-task

### Step 3: Import Tasks

1. **Prepare CSV File**

Create `jira-import.csv`:

```csv
Summary,Issue Type,Priority,Story Points,Epic Link,Description
"Phase 1 - Project Foundation Setup",Epic,Highest,21,,"Set up foundational infrastructure..."
"Initialize Next.js Project",Story,High,5,"Phase 1 - Project Foundation Setup","Create a new Next.js application using TypeScript..."
"Configure TypeScript and tsconfig.json",Task,High,2,"Initialize Next.js Project","Configure TypeScript with strict mode..."
```

Full template is in TASKLIST.md - you can convert it to CSV.

2. **Import to JIRA**:
   - Go to **Settings** → **System** → **Import**
   - Select "CSV"
   - Upload your CSV file
   - Map fields:
     - Summary → Summary
     - Issue Type → Issue Type
     - Priority → Priority
     - Story Points → Story Points
     - Epic Link → Epic Link
   - Click "Begin Import"

### Step 4: Set Up GitHub Integration

1. **Install GitHub App**:
   - Go to **Settings** → **Apps**
   - Find "GitHub for Jira"
   - Click "Get it now"
   - Install and authorize

2. **Connect Repository**:
   - Go to **Apps** → **GitHub**
   - Click "Add organization"
   - Select your GitHub account
   - Select "Web3QuestHub" repository

3. **Configure Smart Commits**:
   ```bash
   # Transition issue and add comment
   git commit -m "W3QH-15 #in-progress Add quest grid component"
   
   # Close issue and log time
   git commit -m "W3QH-15 #close #time 2h Completed quest grid with all features"
   ```

### Step 5: Create Sprints

1. **Set Up Sprint Schedule**:
   - Sprint duration: 2 weeks
   - Sprint 1: Phase 1 tasks
   - Sprint 2: Phase 2 tasks
   - etc.

2. **Create First Sprint**:
   - Go to Backlog
   - Click "Create sprint"
   - Name: "Sprint 1 - Foundation"
   - Drag Phase 1 tasks into sprint
   - Click "Start sprint"

---

## Part 4: Daily Workflow

### Starting Work on a Task

#### With Linear:
```bash
# 1. Move issue to "In Progress" in Linear

# 2. Create feature branch
git checkout -b feature/DEV-15-quest-grid

# 3. Make changes and commit
git add .
git commit -m "feat: add quest grid component (DEV-15)

Implemented responsive quest grid with expedition grouping.
Added filtering and sorting functionality.

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

# 4. Push to GitHub
git push -u origin feature/DEV-15-quest-grid

# 5. Create Pull Request
gh pr create --title "feat: Quest Grid Component (DEV-15)" --body "Implements quest grid with expedition grouping and filtering. Closes DEV-15"
```

#### With JIRA:
```bash
# 1. Move issue to "In Progress" in JIRA

# 2. Create feature branch
git checkout -b feature/W3QH-15-quest-grid

# 3. Make changes and commit
git add .
git commit -m "feat: add quest grid component (W3QH-15)

W3QH-15 #in-progress Implemented responsive quest grid

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

# 4. Push and create PR
git push -u origin feature/W3QH-15-quest-grid
gh pr create --title "feat: Quest Grid Component" --body "W3QH-15 Implements quest grid. Closes W3QH-15"
```

### Completing a Task

1. **Code Review**:
   - Request review on GitHub PR
   - Address feedback
   - Push changes

2. **Merge PR**:
   ```bash
   # Via GitHub CLI
   gh pr merge --squash --delete-branch
   
   # Or via GitHub UI
   # Click "Squash and merge" button
   ```

3. **Issue Closes Automatically**:
   - Linear/JIRA will automatically close the issue
   - If not, manually move to "Done"

---

## Part 5: Team Collaboration

### Assigning Tasks

#### Linear:
- Click on issue
- Click "Assignee" dropdown
- Select team member

#### JIRA:
- Click on issue
- Click "Assign" button
- Select team member

### Code Review Process

1. **Create PR with context**:
   ```markdown
   ## Description
   Implements the quest grid component with expedition grouping.
   
   ## Changes
   - Added QuestGrid component
   - Added filtering by expedition
   - Added responsive layout
   
   ## Testing
   - [ ] Verified grid displays correctly on desktop
   - [ ] Verified grid is responsive on mobile
   - [ ] Tested filtering functionality
   
   ## Screenshots
   [Add screenshots]
   
   Closes DEV-15
   ```

2. **Review checklist**:
   - [ ] Code follows AGENTS.md guidelines
   - [ ] TypeScript types are correct
   - [ ] Tests are added/updated
   - [ ] Documentation is updated
   - [ ] No security vulnerabilities
   - [ ] Performance is acceptable

3. **Approval and merge**:
   - Reviewer approves
   - CI/CD passes (if configured)
   - Merge to main

---

## Part 6: CI/CD Integration (Bonus)

### GitHub Actions for Automated Testing

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: web3-quest-hub-app/package-lock.json
    
    - name: Install dependencies
      working-directory: ./web3-quest-hub-app
      run: npm ci
    
    - name: Type check
      working-directory: ./web3-quest-hub-app
      run: npm run type-check
    
    - name: Lint
      working-directory: ./web3-quest-hub-app
      run: npm run lint
    
    - name: Build
      working-directory: ./web3-quest-hub-app
      run: npm run build
```

This will automatically run on every push and PR.

---

## Part 7: Best Practices

### Commit Message Format

Always use Conventional Commits:

```bash
# Format
<type>(<scope>): <subject>

<body>

<footer>

# Examples
feat(dashboard): add quest filtering by difficulty

Implemented dropdown filter and search functionality.
Users can now filter quests by beginner/intermediate/advanced.

Closes DEV-23

fix(auth): resolve Google OAuth redirect issue

Fixed redirect URL configuration in Firebase console.
Users can now successfully authenticate with Google.

Fixes DEV-45

docs(readme): update installation instructions

Added troubleshooting section for common Firebase errors.

refactor(hooks): extract quest data fetching logic

Moved quest fetching logic from component to custom hook.
Improves code reusability and testability.
```

### Branch Naming

```bash
# Features
feature/DEV-15-quest-grid
feature/W3QH-23-aura-chat

# Bugs
fix/DEV-45-oauth-redirect
bugfix/W3QH-67-xp-calculation

# Refactoring
refactor/DEV-89-extract-hooks
refactor/W3QH-102-cleanup-unused

# Documentation
docs/update-readme
docs/add-api-documentation
```

### PR Best Practices

1. **Keep PRs small** - easier to review
2. **Write descriptive titles** - summarize the change
3. **Provide context** - explain why, not just what
4. **Link issues** - use "Closes #123" syntax
5. **Add screenshots** - for UI changes
6. **Self-review first** - check your own code
7. **Respond to feedback** - promptly address comments

---

## Quick Reference

### Git Commands

```bash
# Check status
git status

# Create branch
git checkout -b feature/DEV-15-my-feature

# Stage changes
git add .

# Commit with message
git commit -m "feat: implement feature (DEV-15)"

# Push branch
git push -u origin feature/DEV-15-my-feature

# Create PR via CLI
gh pr create

# Merge PR via CLI
gh pr merge --squash

# Update main branch
git checkout main
git pull origin main

# Delete local branch
git branch -d feature/DEV-15-my-feature
```

### Linear Quick Keys

```
c     - Create issue
/ q   - Quick search
cmd+k - Command palette
e     - Edit issue
a     - Assign to me
1-4   - Set priority
m     - Move to project
```

### JIRA Quick Keys

```
c       - Create issue
g + d   - Go to dashboard
g + b   - Go to board
.       - Quick search
e       - Edit issue
a       - Assign
```

---

## Troubleshooting

### Git Issues

**Problem**: Push rejected
```bash
# Solution: Pull latest changes first
git pull origin main --rebase
git push
```

**Problem**: Merge conflicts
```bash
# Solution: Resolve conflicts manually
git status                    # See conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "chore: resolve merge conflicts"
git push
```

### Linear Issues

**Problem**: GitHub integration not working
- Check Settings → Integrations → GitHub
- Reconnect if needed
- Ensure repository is selected

**Problem**: Issues not auto-closing
- Ensure PR description includes "Closes DEV-15"
- Check that integration is properly configured

### JIRA Issues

**Problem**: Smart commits not working
- Ensure GitHub app is installed
- Use correct format: "W3QH-15 #close"
- Check JIRA → Settings → Apps → GitHub

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push initial code
3. ✅ Choose Linear or JIRA
4. ✅ Set up project and import tasks
5. ✅ Configure GitHub integration
6. ✅ Start working on Phase 1 tasks
7. ✅ Follow workflow in AGENTS.md

---

**You're ready to start development with proper project management!** 🚀
