# GitHub Actions Workflows

This directory contains all CI/CD workflows for the Web3 Quest Hub project.

---

## 📋 Workflow Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Developer Workflow                           │
└───────────────────┬─────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Push to Branch or    │
        │  Create Pull Request  │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────────────────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────┐                         ┌──────────────────┐
│  CI Pipeline  │                         │ Deploy Preview  │
│   (ci.yml)    │                         │  (PR to main)   │
└───────┬───────┘                         └────────┬─────────┘
        │                                          │
        ├─► Test Next.js                          ├─► Build App
        ├─► Test Functions                        ├─► Deploy to Vercel
        ├─► Lint Extension                        └─► Comment PR
        ├─► Security Audit
        └─► Build Summary
                    │
                    ▼
        ┌───────────────────────┐
        │   All Checks Pass?    │
        └───────────┬───────────┘
                    │
            ┌───────┴────────┐
            │ YES            │ NO
            ▼                ▼
    ┌───────────┐      ┌──────────┐
    │PR Approved│      │Fix Issues│
    └─────┬─────┘      └────┬─────┘
          │                 │
          │                 └──► Back to Development
          ▼
    ┌──────────┐
    │  Merge   │
    └─────┬────┘
          │
          ▼ (if main branch)
    ┌──────────────────┐
    │ Firebase Deploy  │
    │ (firebase-       │
    │  deploy.yml)     │
    └──────────────────┘
          │
          ├─► Deploy Functions
          ├─► Deploy Rules
          └─► Deploy Indexes
```

---

## 🔄 Workflow Details

### 1. ci.yml - Main CI/CD Pipeline

**Runs on:** Every push and PR

**Jobs:**
- `test-nextjs` - Tests Next.js application
  - Type checking with TypeScript
  - Linting with ESLint
  - Production build test
  - Runs on Node 18.x and 20.x
  - Uploads build artifacts

- `test-firebase-functions` - Tests Firebase Functions
  - TypeScript compilation
  - Build verification
  - Runs on Node 18.x and 20.x

- `lint-extension` - Validates Browser Extension
  - Manifest.json validation
  - JavaScript syntax checking
  - Required files check

- `security-audit` - Security scanning
  - npm audit on all packages
  - Secret pattern detection
  - Vulnerability reporting

- `build-summary` - Aggregates results
  - Posts summary to PR
  - Fails if any job fails

**Duration:** ~5-8 minutes

### 2. deploy-preview.yml - Preview Deployments

**Runs on:** PR to main branch

**What it does:**
- Installs dependencies
- Builds Next.js app
- Deploys to Vercel preview
- Posts preview URL as PR comment

**Requirements:**
- `VERCEL_TOKEN` secret
- Firebase config secrets

**Duration:** ~3-5 minutes

### 3. codeql.yml - Security Analysis

**Runs on:** 
- Push to main/develop
- PR to main
- Weekly schedule (Mondays)

**What it does:**
- Scans JavaScript and TypeScript
- Identifies security vulnerabilities
- Posts findings to Security tab
- Uses GitHub's CodeQL engine

**Duration:** ~3-4 minutes

### 4. dependency-review.yml - Dependency Security

**Runs on:** PR to main

**What it does:**
- Reviews all dependency changes
- Checks for known vulnerabilities
- Flags high-severity issues
- Comments findings on PR

**Duration:** ~1 minute

### 5. pr-labeler.yml - Auto Labeling

**Runs on:** PR opened/edited/synchronized

**What it does:**
- Labels PRs based on files changed
- Adds size labels (XS/S/M/L/XL)
- Uses `.github/labeler.yml` config

**Duration:** ~30 seconds

### 6. lighthouse.yml - Performance Testing

**Runs on:** 
- PR affecting web3-quest-hub-app/
- Manual trigger

**What it does:**
- Runs Lighthouse CI
- Tests performance metrics
- Uploads detailed reports
- Comments results on PR

**Thresholds:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

**Duration:** ~2-3 minutes

### 7. stale.yml - Issue Management

**Runs on:** Daily at 1 AM UTC

**What it does:**
- Marks inactive issues stale (30 days)
- Marks inactive PRs stale (14 days)
- Closes stale items (7 days after marking)
- Exempts pinned/security items

**Duration:** ~1 minute

### 8. firebase-deploy.yml - Production Deploy

**Runs on:**
- Push to main
- Manual trigger

**What it does:**
- Builds Firebase Functions
- Deploys Firestore rules
- Deploys Firestore indexes
- Deploys Cloud Functions

**Requirements:**
- `FIREBASE_TOKEN` secret
- `FIREBASE_PROJECT_ID` secret
- API key secrets

**Duration:** ~2-3 minutes

### 9. release.yml - Release Automation

**Runs on:** Tag push (v*)

**What it does:**
- Builds all components
- Packages browser extension
- Generates changelog
- Creates GitHub release
- Attaches artifacts

**Duration:** ~5-7 minutes

---

## 🔐 Secrets Management

### Critical Secrets (Required)

| Secret | Where to Get | Purpose |
|--------|-------------|---------|
| `FIREBASE_TOKEN` | `firebase login:ci` | Deploy to Firebase |
| `FIREBASE_PROJECT_ID` | Firebase Console | Target project |
| `GEMINI_API_KEY` | Google AI Studio | AI companion |
| `ALCHEMY_API_KEY` | Alchemy Dashboard | On-chain verification |

### Firebase Config (Required for Builds)

All `NEXT_PUBLIC_FIREBASE_*` secrets from Firebase Console.

### Optional Secrets

| Secret | Purpose |
|--------|---------|
| `VERCEL_TOKEN` | Preview deployments |
| `VERCEL_ORG_ID` | Vercel organization |
| `VERCEL_PROJECT_ID` | Vercel project |

---

## 🎯 Status Check Requirements

### Required for Merge to Main

These checks MUST pass:
- ✅ Test Next.js App (Node 18.x)
- ✅ Test Next.js App (Node 20.x)
- ✅ Test Firebase Functions (Node 18.x)
- ✅ Test Firebase Functions (Node 20.x)
- ✅ Lint Extension
- ✅ Security Audit
- ✅ Build Summary

### Optional/Informational

These provide valuable info but don't block merges:
- 🔦 Lighthouse Performance
- 🚀 Deploy Preview
- 🔍 CodeQL Analysis
- 📦 Dependency Review
- 🏷️ PR Labeler

---

## 🔧 Customization

### Modifying Workflows

1. Edit workflow file in `.github/workflows/`
2. Test changes on a branch
3. Review logs in Actions tab
4. Merge when working correctly

### Adding New Jobs

```yaml
  new-job:
    name: My New Job
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Run my command
      run: echo "Hello from new job"
```

### Changing Node Versions

Update matrix in workflows:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add more versions
```

---

## 📈 Monitoring

### GitHub Actions Dashboard

View all workflows:
- Go to **Actions** tab
- Filter by workflow, branch, or status
- Download artifacts
- Re-run failed jobs

### Insights

- **Actions** → **Usage** - View compute usage
- **Insights** → **Dependency graph** - View dependencies
- **Security** → **Code scanning** - View CodeQL findings
- **Security** → **Dependabot** - View dependency alerts

---

## 🐛 Debugging

### View Logs

1. Click **Actions** tab
2. Click the workflow run
3. Click the failing job
4. Expand log sections
5. Look for ❌ errors

### Download Artifacts

Some jobs upload artifacts (build outputs, reports):
1. Go to workflow run
2. Scroll to "Artifacts" section
3. Click to download

### Re-run Failed Jobs

1. Go to failed workflow run
2. Click "Re-run jobs" → "Re-run failed jobs"
3. Or re-run all jobs

---

## 🎓 Best Practices

1. **Local First** - Always test locally before pushing
2. **Small PRs** - Faster CI, easier reviews
3. **Fix Fast** - Don't let failures accumulate
4. **Monitor Regularly** - Check Actions tab daily
5. **Keep Updated** - Update workflows as project evolves

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Action Marketplace](https://github.com/marketplace?type=actions)
- [CI_CD_SETUP.md](../CI_CD_SETUP.md) - Complete setup guide

---

**Maintained By:** Web3 Quest Hub Team  
**Questions?** Create an issue with the `ci/cd` label
