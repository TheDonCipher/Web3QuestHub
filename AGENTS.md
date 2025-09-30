# Agent Guidelines for Web3 Quest Hub

This document provides guidelines for AI coding agents working on the Web3 Quest Hub project. These practices ensure code quality, maintainability, security, and successful delivery.

---

## 1. Project Management Practices

### 1.1 Task Creation and Tracking
- **Create detailed, actionable tasks/tickets** that clearly explain:
  - **WHAT** needs to be implemented
  - **HOW** it should be achieved
  - **WHY** it is necessary
- **Track implementation progress** after each change
- **Test thoroughly** after each implementation
- **Validate and commit** after each phase completion

### 1.2 Definition of Done (DoD)
Each task is considered complete only when ALL criteria are met:
- [ ] Code implements all acceptance criteria
- [ ] Unit tests written and passing
- [ ] Integration tests passing (where applicable)
- [ ] Type checking passes (`npm run type-check`)
- [ ] No ESLint errors or warnings
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Changes committed with proper commit message
- [ ] Deployment tested (if applicable)

---

## 2. Development Workflow

### 2.1 Start with Read-Only Analysis
- **Begin each phase with analysis** before making modifications
- Use `Read`, `Grep`, `Glob`, and `LS` tools to understand existing code
- Document findings and proposed changes
- Confirm approach before implementation

### 2.2 Iterative Delivery
- **Adhere to standard branching strategy** (GitFlow or GitHub Flow)
- **Make atomic commits** - each commit should represent a single logical change
- **Use Conventional Commits** format:
  ```
  feat: Add user authentication with Firebase
  fix: Correct XP calculation in level progression
  docs: Update README with installation steps
  refactor: Extract quest card component
  test: Add unit tests for XP calculator
  chore: Update dependencies to latest versions
  ```
- **Merge only after successful DoD validation**

### 2.3 Backward Compatibility
- **Keep old systems working** while new ones are being built
- Never break existing functionality
- Use feature flags/toggles when introducing breaking changes

### 2.4 Feature Toggles
- **Allow gradual rollout** of new features
- **Enable quick rollback** if critical issues are discovered
- Use environment variables or configuration for toggles

### 2.5 Plan for Rollback
- **Each phase should be reversible**
- Keep previous implementation available during migration
- Document rollback procedures in commit messages

### 2.6 GitHub and Linear Integration

#### Using GitHub with Linear

When working with Linear issues, always reference them in your commits and PRs:

**In Commit Messages:**
```bash
# Standard commit with Linear reference
git commit -m "feat: add quest grid component (WEB-15)

Implemented responsive quest grid with expedition grouping.
Added filtering and sorting functionality.

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

# Fix commit with Linear reference
git commit -m "fix: correct XP calculation overflow (WEB-23)

Fixed integer overflow in XP calculation for high-level users.
Added boundary checks and tests.

Fixes WEB-23"
```

**In Pull Request Descriptions:**
```markdown
## Description
Implements the quest grid component with expedition grouping.

## Changes
- Added QuestGrid component with responsive layout
- Implemented expedition-based grouping
- Added filtering by difficulty

## Testing
- [x] Verified grid displays correctly on desktop
- [x] Verified responsive layout on mobile
- [x] Tested filtering functionality

## Linear Issue
Closes WEB-15
```

**Benefits of Integration:**
- ✅ Commits automatically link to Linear issues
- ✅ Issues auto-close when PR merges with "Closes WEB-X"
- ✅ Full traceability from issue → commit → PR → deployment
- ✅ Team visibility into progress

**Linear Keywords:**
- `Closes WEB-X` - Closes the issue when PR merges
- `Fixes WEB-X` - Same as Closes
- `Resolves WEB-X` - Same as Closes
- `WEB-X` - Links to issue without closing

---

## 3. Testing Strategy

### 3.1 Comprehensive Testing
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test service boundaries and API contracts
- **Contract Testing**: Use tools like Pact to validate API schemas
- **End-to-End Tests**: Test complete user journeys
- **Boundary Testing**: Focus on interfaces between old and new systems

### 3.2 Test Before Commit
- Run all tests before committing code
- Fix all failing tests before proceeding
- Ensure new code has adequate test coverage

### 3.3 Test Data Management
- Use realistic test data
- Never use production data in tests
- Create reusable test fixtures

---

## 4. Code Quality Standards

### 4.1 Documentation Requirements
Every file must include comments explaining:
- **WHAT** the file does (purpose and functionality)
- **HOW** it achieves its goals (implementation approach)
- **WHY** it is necessary (business/technical justification)

Example:
```typescript
/**
 * WHAT: XP Calculator utility for Explorer level progression
 * HOW: Calculates current level based on cumulative XP using threshold table
 * WHY: Centralizes level calculation logic to maintain consistency across app
 */
export const calculateLevel = (totalXP: number): number => {
  // Implementation...
}
```

### 4.2 Code Standards
- **Use TypeScript strictly** - no `any` types unless absolutely necessary
- **Follow ESLint rules** - fix all warnings
- **Keep functions small** - single responsibility principle
- **Use meaningful names** - variables, functions, and components
- **Avoid code duplication** - DRY (Don't Repeat Yourself)
- **Comment complex logic** - explain the "why", not the "what"

### 4.3 Maintain Clean Codebase
- **Remove unused files** and dead code
- **Delete commented-out code** (use git history instead)
- **Clean up imports** - remove unused imports
- **Organize files logically** - follow project structure conventions

---

## 5. Security-by-Design Principles

### 5.1 Shift Left Security
- **Identify and mitigate vulnerabilities during design phase**
- Never store sensitive data in client code
- Use environment variables for all secrets
- Store API keys in Google Secret Manager (production)

### 5.2 Input Validation
- **Sanitize and validate all user input**
- Use Firebase security rules to enforce data access
- Validate data types and formats before processing
- Protect against XSS, SQL injection, and other attacks

### 5.3 Principle of Least Privilege (PoLP)
- **Grant minimum necessary permissions**
- Firestore rules: users can only access their own data
- Service accounts should have minimal required roles
- Never expose admin credentials to client

### 5.4 Security Checklist
- [ ] No API keys in client code
- [ ] All Firebase config in environment variables
- [ ] Firestore security rules deployed and tested
- [ ] User input sanitized and validated
- [ ] Authentication required for protected routes
- [ ] HTTPS enforced for all communications

---

## 6. Performance and Scalability

### 6.1 Optimize for Performance
- **Design efficient code and database queries**
- Use Firestore indexes for complex queries
- Implement pagination for large datasets
- Minimize bundle size with code splitting
- Use React.memo() and useMemo() appropriately

### 6.2 Profile Critical Paths
- **Measure before optimizing**
- Profile authentication flows
- Monitor transaction processing times
- Check page load times with Lighthouse
- Set performance budgets:
  - LCP < 2.5 seconds
  - FID < 100ms
  - CLS < 0.1

### 6.3 Scalability Considerations
- Design for horizontal scaling
- Use Firebase's automatic scaling
- Implement caching strategies
- Optimize images and assets

---

## 7. Observability and Monitoring

### 7.1 Logging Standards
- **Use structured logging** (JSON format)
- Include correlation IDs for request tracking
- Log important events and errors
- Never log sensitive data (passwords, keys, PII)

### 7.2 Monitoring Requirements
- Emit clear metrics for all services
- Track function execution times
- Monitor error rates and types
- Set up alerts for critical failures

### 7.3 Error Handling
- **Graceful degradation** - app should work even if features fail
- Display user-friendly error messages
- Log detailed errors for debugging
- Implement retry logic for transient failures

---

## 8. Automation

### 8.1 Automate Everything Measurable
- **Testing**: Unit, Integration, E2E tests automated
- **Infrastructure**: Use Infrastructure as Code (IaC)
- **Deployment**: CI/CD pipelines for automated deployment
- **Code Quality**: Automated linting and type checking

### 8.2 Manual Steps to Avoid
- Repetitive tasks should be scripted
- Critical operations should be automated
- Configuration should be code-based
- Deployments should never be manual

---

## 9. Migration and Integration Strategies

### 9.1 Dual-Writing Pattern
- When migrating data or APIs, write to both old and new systems
- Validate data consistency between systems
- Gradual cutover once new system is proven stable

### 9.2 Dark Launching
- Deploy new features without exposing to users
- Test under production load without impact
- Gather metrics before full rollout
- Use feature flags to control exposure

### 9.3 Integration Points
- Document all external dependencies
- Define clear API contracts
- Use contract testing to validate interfaces
- Monitor integration health continuously

---

## 10. Documentation and Communication

### 10.1 Document Learnings
- **Update plans based on discoveries** during implementation
- Document technical decisions and trade-offs
- Record performance metrics and optimizations
- Update architecture diagrams when structure changes

### 10.2 Post-Implementation Reviews (PIRs)
- Conduct formal review after major feature deployment
- Document:
  - What went well
  - What could be improved
  - Unexpected challenges
  - Performance observations
- Update knowledge base and architectural documentation

### 10.3 Communicate Progress
- **Keep stakeholders updated** with regular progress reports
- Update task status in real-time
- Report blockers immediately
- Share learnings and insights

### 10.4 Ask for Clarification
- **Never assume when uncertain**
- Ask questions before making critical decisions
- Confirm approach for complex implementations
- Request code reviews for significant changes

---

## 11. Specific Guidelines for Web3 Quest Hub

### 11.1 Adherence to Specifications
- **TSD-W3QH-V1.0** and **TRD-W3QH-V1.0** are the single source of truth
- No deviations without explicit approval
- Implement data schemas exactly as specified
- Follow component architecture precisely

### 11.2 Technology Stack Constraints
- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Functions)
- **AI**: Google Gemini API only
- **Web3**: Alchemy SDK for on-chain verification
- **Extension**: Manifest V3 standard

### 11.3 Firebase Best Practices
- Use Firebase emulator for local development
- Test security rules in emulator before deploying
- Use serverless functions for sensitive operations
- Implement atomic transactions for data consistency

### 11.4 Extension Development
- Follow Manifest V3 standards strictly
- Minimize permissions requested
- Test across multiple browsers
- Handle extension not installed gracefully

### 11.5 AURA AI Safety
- Implement strict safety guardrails
- Never request private keys or seed phrases
- Include risk warnings for transactions
- Sanitize all AI responses

---

## 12. Daily Workflow Guide

This section provides step-by-step workflows for common development tasks.

### 12.1 Starting Work on a New Task

**Step 1: Select Task in Linear**
```bash
# 1. Open Linear (linear.app)
# 2. Go to "My Issues" or current Sprint
# 3. Select a task to work on (e.g., WEB-15)
# 4. Click the task to open details
# 5. Review acceptance criteria and description
# 6. Move status to "In Progress"
```

**Step 2: Create Feature Branch**
```bash
# Update main branch first
git checkout main
git pull origin main

# Create feature branch with descriptive name
git checkout -b feature/WEB-15-quest-grid

# Branch naming convention:
# feature/WEB-X-short-description  (for features)
# fix/WEB-X-short-description      (for bugs)
# refactor/WEB-X-short-description (for refactoring)
```

**Step 3: Implement Changes**
```bash
# Make your code changes
# Follow AGENTS.md guidelines
# Add tests as you go
# Document your code (WHAT, HOW, WHY)

# Check your work frequently
npm run type-check  # TypeScript validation
npm run lint        # ESLint check
npm run test        # Run tests (if configured)
```

**Step 4: Commit Your Changes**
```bash
# Stage your changes
git add .

# Check what you're committing
git status
git diff --staged

# Commit with Conventional Commits format
git commit -m "feat: add quest grid component (WEB-15)

Implemented responsive quest grid with expedition grouping.
Added filtering by difficulty and status.
Created QuestCard subcomponent for individual quest display.

Technical details:
- Used CSS Grid for responsive layout
- Implemented expedition-based grouping logic
- Added loading states and error handling

Testing:
- Added unit tests for filtering logic
- Verified responsive design on mobile/tablet/desktop
- Tested with empty state and error scenarios

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"
```

**Step 5: Push to GitHub**
```bash
# Push your feature branch
git push -u origin feature/WEB-15-quest-grid

# If you need to push again after more commits:
git push
```

**Step 6: Create Pull Request**

**Option A: Via GitHub CLI (Recommended)**
```bash
gh pr create \
  --title "feat: Quest Grid Component (WEB-15)" \
  --body "## Description
Implements the quest grid component with expedition grouping.

## Changes
- Added QuestGrid component with responsive layout
- Implemented expedition-based grouping
- Added filtering by difficulty and status
- Created QuestCard subcomponent

## Testing
- [x] Unit tests passing
- [x] Type checking passing
- [x] Responsive design verified
- [x] Manual testing on all screen sizes

## Screenshots
[Add screenshots if UI changes]

## Linear Issue
Closes WEB-15"
```

**Option B: Via GitHub Web UI**
1. Go to your repository on GitHub
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select your branch
5. Fill in the template (similar to above)
6. Click "Create pull request"

### 12.2 During Code Review

**Responding to Feedback**
```bash
# Make requested changes
# Edit the files based on review comments

# Stage and commit the changes
git add .
git commit -m "refactor: address PR feedback (WEB-15)

- Extract filtering logic into separate function
- Add JSDoc comments to exported functions
- Simplify conditional rendering logic"

# Push the new commit
git push

# The PR will automatically update
```

**Requesting Changes**
```bash
# If you need clarification on review comments:
# - Reply to the specific comment in GitHub
# - Ask for clarification before implementing
# - Tag the reviewer with @username
```

### 12.3 Merging Your Pull Request

**Before Merging Checklist**
- [ ] All review comments addressed
- [ ] All CI checks passing (if configured)
- [ ] At least 1 approval received
- [ ] Branch is up to date with main
- [ ] No merge conflicts

**Merge via GitHub CLI**
```bash
# Squash and merge (recommended for clean history)
gh pr merge --squash --delete-branch

# Or merge commit (preserves all commits)
gh pr merge --merge --delete-branch

# Or rebase (linear history)
gh pr merge --rebase --delete-branch
```

**Merge via GitHub UI**
1. Go to your PR on GitHub
2. Click "Squash and merge" (recommended)
3. Edit commit message if needed
4. Click "Confirm squash and merge"
5. Delete branch when prompted

**After Merge**
```bash
# Switch back to main and update
git checkout main
git pull origin main

# Your feature branch is automatically deleted on GitHub
# Delete it locally too
git branch -d feature/WEB-15-quest-grid

# Linear issue WEB-15 will auto-close due to "Closes WEB-15" in PR
```

### 12.4 Working on Multiple Tasks

**Switching Between Tasks**
```bash
# Save current work (if not ready to commit)
git stash save "WIP: quest grid component"

# Switch to other branch
git checkout feature/WEB-23-xp-calculator

# Work on the other task...

# Switch back
git checkout feature/WEB-15-quest-grid

# Restore your work
git stash pop
```

**Managing Multiple Branches**
```bash
# List all branches
git branch -a

# Delete merged branches
git branch -d feature/WEB-12-completed-task

# Force delete if not merged (be careful!)
git branch -D feature/WEB-14-abandoned-feature
```

### 12.5 Handling Merge Conflicts

**When Conflicts Occur**
```bash
# Update your branch with latest main
git checkout feature/WEB-15-quest-grid
git fetch origin main
git rebase origin/main

# If conflicts appear:
# 1. Git will tell you which files have conflicts
# 2. Open each file and look for conflict markers:
#    <<<<<<< HEAD
#    Your changes
#    =======
#    Changes from main
#    >>>>>>> origin/main

# 3. Edit the file to resolve conflicts
# 4. Remove conflict markers
# 5. Keep the correct code

# After resolving all conflicts:
git add .
git rebase --continue

# Push the updated branch (force push required after rebase)
git push --force-with-lease
```

### 12.6 Quick Task Updates

**For Simple Changes (typo, comment, small fix)**
```bash
# Make the change
# Commit directly to feature branch
git add .
git commit -m "docs: fix typo in component comment (WEB-15)"
git push

# No need for new PR, just push to existing branch
```

**For Urgent Hotfixes**
```bash
# Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/WEB-99-critical-bug

# Make the fix
# Commit and push
git add .
git commit -m "fix: resolve critical authentication bug (WEB-99)

Users were unable to login due to incorrect token validation.

Fixes WEB-99"
git push -u origin hotfix/WEB-99-critical-bug

# Create PR immediately
gh pr create --title "HOTFIX: Critical Auth Bug (WEB-99)" --body "Critical fix for production. Closes WEB-99"

# Request immediate review
# Merge ASAP after approval
```

### 12.7 Task Workflow Summary

**Quick Reference:**
```bash
# 1. Start task
git checkout main && git pull
git checkout -b feature/WEB-X-description
# (Move Linear issue to "In Progress")

# 2. Work and commit
# ... make changes ...
git add . && git commit -m "type: description (WEB-X)"
git push -u origin feature/WEB-X-description

# 3. Create PR
gh pr create --title "type: Title (WEB-X)" --body "Closes WEB-X"

# 4. After review and approval
gh pr merge --squash --delete-branch

# 5. Clean up
git checkout main && git pull
git branch -d feature/WEB-X-description
# (Linear issue auto-closes)
```

### For Each Phase:
1. **Analysis**: Read specifications and existing code
2. **Planning**: Create detailed tasks with acceptance criteria
3. **Implementation**: Follow iterative delivery approach
4. **Testing**: Comprehensive test coverage
5. **Documentation**: Update all relevant docs
6. **Review**: Conduct PIR and document learnings
7. **Deployment**: Use CI/CD pipeline
8. **Monitoring**: Verify in production
9. **Validation**: Confirm phase objectives met
10. **Commit**: Finalize phase with git commit

---

## 13. CI/CD Integration

### 13.1 Automated Testing Pipeline

The project uses GitHub Actions for automated testing and deployment. Every push and PR triggers:

**Automated Checks:**
- ✅ TypeScript type checking
- ✅ ESLint code quality
- ✅ Build verification
- ✅ Security audits
- ✅ Dependency review
- ✅ Performance testing (Lighthouse)

**Status Checks Required Before Merge:**
- Test Next.js App
- Test Firebase Functions
- Lint Extension
- Security Audit

### 13.2 CI/CD Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI Pipeline** | Push, PR | Runs all tests and builds |
| **Deploy Preview** | PR to main | Deploys preview to Vercel |
| **CodeQL** | Push, PR, Schedule | Security scanning |
| **Lighthouse** | PR (app changes) | Performance testing |
| **Firebase Deploy** | Push to main | Deploys functions and rules |
| **Release** | Tag push (v*) | Creates release with artifacts |

### 13.3 Local Testing Before Push

**Always run these checks locally before pushing:**

```bash
# In Next.js app
cd web3-quest-hub-app
npm run type-check  # Must pass ✅
npm run lint        # Must pass ✅
npm run build       # Must succeed ✅

# In Firebase Functions
cd ../firebase-functions
npm run build       # Must succeed ✅
```

### 13.4 Checking CI Status

**View CI Status:**
1. Push your branch to GitHub
2. Go to Actions tab in repository
3. Find your workflow run
4. View detailed logs if failed

**PR Status Checks:**
- All required checks must be green ✅ before merge
- Fix failures immediately
- Don't force merge failing checks

### 13.5 CI/CD Secrets Management

**Never commit secrets!** All API keys are stored in GitHub Secrets.

**Required Secrets:**
- Firebase tokens and project ID
- Gemini API key
- Alchemy API key
- Vercel tokens (for preview deployments)

See [CI_CD_SETUP.md](CI_CD_SETUP.md) for complete setup instructions.

### 13.6 Preview Deployments

**Automatic Preview URLs:**
- Every PR to main gets a Vercel preview deployment
- Preview URL posted as PR comment
- Test your changes in production-like environment
- Share preview URL with reviewers

---

## 14. Tools and Commands

### Development
```bash
# Next.js app
cd web3-quest-hub-app
npm install
npm run dev           # Start dev server
npm run build         # Production build
npm run type-check    # TypeScript validation
npm run lint          # ESLint check

# Firebase Functions
cd firebase-functions
npm install
npm run build         # Compile TypeScript
npm run serve         # Local emulator
npm run deploy        # Deploy to production

# Firebase
firebase emulators:start    # Start all emulators
firebase deploy             # Deploy everything
firebase deploy --only firestore:rules
firebase deploy --only functions
```

### Testing
```bash
# Run tests
npm run test

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Git
```bash
# Check status before committing
git status
git diff

# Commit with conventional format
git add .
git commit -m "feat: add quest verification system

Implements on-chain verification using Alchemy SDK.
Includes balance checks, transaction history, and event verification.
Adds atomic Firestore transactions for XP updates.

Closes #W3QH-59"

# Push to remote
git push origin feature/quest-verification
```

---

## 14. Red Flags - Stop and Ask

Stop and ask for clarification if you encounter:
- ❌ Request to deviate from TSD/TRD specifications
- ❌ Need to store sensitive data client-side
- ❌ Breaking change that affects existing users
- ❌ Performance degradation in critical path
- ❌ Security vulnerability or unsafe practice
- ❌ Ambiguous requirements or acceptance criteria
- ❌ External dependency with unclear licensing
- ❌ Technical debt that blocks progress

---

## 15. Success Metrics

Track these metrics to measure quality:
- ✅ All tests passing (100%)
- ✅ TypeScript strict mode with no errors
- ✅ Zero ESLint warnings
- ✅ Lighthouse score > 90
- ✅ All security rules tested and passing
- ✅ Code coverage > 80% (where applicable)
- ✅ Zero security vulnerabilities (npm audit)
- ✅ All DoD criteria met for each task

---

## 16. Resources

- **Implementation Plan**: `IMPLEMENTATION_PLAN.md`
- **Task List**: `TASKLIST.md`
- **Technical Spec**: `TSD-W3QH-V1.0.txt`
- **Requirements**: `TRD-W3QH-V1.0.txt`
- **Getting Started**: `GETTING_STARTED.md`
- **Main README**: `README.md`
- **Project Documentation**: `docs`

---

## Final Notes

These guidelines are designed to ensure:
- **Quality**: High-quality, maintainable code
- **Security**: Protected user data and secure operations
- **Performance**: Fast, scalable application
- **Reliability**: Stable, well-tested features
- **Transparency**: Clear documentation and communication
- **Agility**: Ability to iterate and improve quickly

When in doubt, **ask questions** before proceeding. It's always better to clarify than to implement incorrectly.

---

**Last Updated**: 2025-01-20  
**Version**: 1.0
