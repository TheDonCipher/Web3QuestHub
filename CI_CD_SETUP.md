# CI/CD Setup for Web3 Quest Hub

This document describes the complete CI/CD pipeline setup using GitHub Actions.

---

## 📋 Overview

The Web3 Quest Hub project uses GitHub Actions for continuous integration and deployment. The pipeline includes:

- ✅ Automated testing on every push and PR
- ✅ Security scanning and dependency reviews
- ✅ Performance monitoring with Lighthouse
- ✅ Automated deployment to Firebase and Vercel
- ✅ Release management
- ✅ Code quality checks

---

## 🔧 GitHub Actions Workflows

### 1. **CI/CD Pipeline** (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

**Jobs:**
- **Test Next.js App**: Type checking, linting, building (Node 18.x & 20.x)
- **Test Firebase Functions**: TypeScript compilation, build validation
- **Lint Extension**: Manifest validation, JavaScript syntax checking
- **Security Audit**: npm audit for vulnerabilities
- **Build Summary**: Aggregate results and post to PR

**Status:** ✅ Required for merge

### 2. **Deploy Preview** (`deploy-preview.yml`)

**Triggers:**
- Pull requests to `main`

**What it does:**
- Builds Next.js application
- Deploys preview to Vercel
- Posts preview URL as PR comment

**Requirements:**
- Vercel token in secrets
- Firebase config in secrets

### 3. **CodeQL Security Analysis** (`codeql.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests to `main`
- Weekly schedule (Mondays at 2 AM UTC)

**What it does:**
- Scans JavaScript and TypeScript code
- Identifies security vulnerabilities
- Posts results to Security tab

### 4. **Dependency Review** (`dependency-review.yml`)

**Triggers:**
- Pull requests to `main`

**What it does:**
- Reviews dependency changes
- Flags high-severity vulnerabilities
- Comments on PR with findings

**Status:** ⚠️ Warning on high severity

### 5. **PR Labeler** (`pr-labeler.yml`)

**Triggers:**
- Pull request opened/edited/synchronized

**What it does:**
- Auto-labels based on changed files
- Adds size labels (XS, S, M, L, XL)
- Helps with PR organization

**Labels:**
- `frontend` - Next.js app changes
- `backend` - Firebase functions
- `extension` - Browser extension
- `documentation` - Docs changes
- `dependencies` - Package updates
- `size/*` - PR size indicators

### 6. **Lighthouse Performance** (`lighthouse.yml`)

**Triggers:**
- Pull requests affecting `web3-quest-hub-app/`
- Manual workflow dispatch

**What it does:**
- Runs Lighthouse CI
- Tests performance, accessibility, best practices, SEO
- Posts results as PR comment

**Thresholds:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- LCP: < 2.5s
- CLS: < 0.1

### 7. **Stale Issues and PRs** (`stale.yml`)

**Triggers:**
- Daily at 1 AM UTC
- Manual dispatch

**What it does:**
- Marks inactive issues/PRs as stale
- Closes stale items after 7 days
- Exempts pinned, security, and in-progress items

**Timings:**
- Issues: Stale after 30 days, closed after 7 more
- PRs: Stale after 14 days, closed after 7 more

### 8. **Firebase Deploy** (`firebase-deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**What it does:**
- Builds Firebase Functions
- Deploys Firestore rules and indexes
- Deploys Cloud Functions to production

**Requirements:**
- `FIREBASE_TOKEN` secret
- `FIREBASE_PROJECT_ID` secret
- `GEMINI_API_KEY` secret
- `ALCHEMY_API_KEY` secret

### 9. **Create Release** (`release.yml`)

**Triggers:**
- Push tags matching `v*` (e.g., v1.0.0)

**What it does:**
- Builds all components
- Packages browser extension
- Generates changelog
- Creates GitHub release with artifacts

---

## 🔐 Required Secrets

Configure these secrets in GitHub Settings → Secrets and variables → Actions:

### Firebase Secrets

```
FIREBASE_TOKEN              # Firebase CI token (get via: firebase login:ci)
FIREBASE_PROJECT_ID         # Your Firebase project ID
GEMINI_API_KEY             # Google Gemini API key
ALCHEMY_API_KEY            # Alchemy Web3 API key
```

### Next.js Build Secrets

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_EXTENSION_ID   # Browser extension ID
```

### Vercel Secrets (Optional for preview deployments)

```
VERCEL_TOKEN               # Vercel API token
VERCEL_ORG_ID             # Vercel organization ID
VERCEL_PROJECT_ID         # Vercel project ID
```

---

## 🚀 Setting Up Secrets

### 1. Firebase Token

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and generate token
firebase login:ci

# Copy the token and add to GitHub secrets as FIREBASE_TOKEN
```

### 2. Firebase Project ID

```bash
# Get from Firebase Console or run:
firebase projects:list

# Add to GitHub secrets as FIREBASE_PROJECT_ID
```

### 3. API Keys

- **Gemini API Key**: Get from https://makersuite.google.com/app/apikey
- **Alchemy API Key**: Get from https://dashboard.alchemy.com/

Add both to GitHub secrets.

### 4. Vercel Setup (Optional)

```bash
# Install Vercel CLI
npm install -g vercel

# Login and link project
vercel login
vercel link

# Get tokens from .vercel/project.json
# Add VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID to GitHub secrets
```

### 5. Add Secrets to GitHub

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its value
5. Click **Add secret**

---

## 🎯 Branch Protection Rules

Set up branch protection for `main`:

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Configure:

```
Branch name pattern: main

☑ Require a pull request before merging
  ☑ Require approvals: 1
  ☑ Dismiss stale pull request approvals when new commits are pushed

☑ Require status checks to pass before merging
  ☑ Require branches to be up to date before merging
  Required status checks:
    - Test Next.js App
    - Test Firebase Functions
    - Lint Extension
    - Security Audit

☑ Require conversation resolution before merging

☑ Do not allow bypassing the above settings

☐ Allow force pushes (keep disabled)
☐ Allow deletions (keep disabled)
```

---

## 📊 Monitoring CI/CD

### View Workflow Runs

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. View all workflow runs and their status

### Check PR Status

All required checks must pass before merging:
- ✅ Test Next.js App
- ✅ Test Firebase Functions
- ✅ Lint Extension
- ✅ Security Audit

Optional checks:
- 🔦 Lighthouse Performance
- 🚀 Deploy Preview
- 🔍 CodeQL Analysis

### View Build Artifacts

Some workflows generate artifacts:
- Next.js build output
- Lighthouse reports
- Browser extension packages

Download from the workflow run page.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails Due to Missing Secrets

**Problem:** Build fails with "environment variable not found"

**Solution:**
```bash
# Verify secrets are set
# Go to Settings → Secrets → Actions
# Ensure all required secrets are configured
```

#### 2. Firebase Deploy Fails

**Problem:** "Authentication error" or "Permission denied"

**Solution:**
```bash
# Regenerate Firebase token
firebase logout
firebase login:ci

# Update FIREBASE_TOKEN secret in GitHub
```

#### 3. Type Checking Fails

**Problem:** TypeScript errors in CI but not locally

**Solution:**
```bash
# Ensure local TypeScript version matches CI
cd web3-quest-hub-app
npm ci  # Use exact versions from package-lock.json
npm run type-check
```

#### 4. Lighthouse Fails to Start Server

**Problem:** Server doesn't start in time

**Solution:**
- Increase timeout in `lighthouserc.json`
- Check build succeeds before Lighthouse runs

#### 5. Vercel Preview Deployment Fails

**Problem:** "Project not found" or "Token invalid"

**Solution:**
```bash
# Re-link Vercel project
cd web3-quest-hub-app
vercel link

# Get new token
vercel --token

# Update secrets in GitHub
```

---

## 📈 Performance Benchmarks

Expected CI/CD times:

| Workflow | Average Duration |
|----------|------------------|
| CI Pipeline | 5-8 minutes |
| Deploy Preview | 3-5 minutes |
| CodeQL Analysis | 3-4 minutes |
| Lighthouse | 2-3 minutes |
| Firebase Deploy | 2-3 minutes |
| Release Creation | 5-7 minutes |

---

## 🔄 Updating Workflows

### Adding New Tests

1. Edit `.github/workflows/ci.yml`
2. Add test step to appropriate job
3. Commit and push to test

Example:
```yaml
- name: Run unit tests
  run: npm test
  working-directory: ./web3-quest-hub-app
```

### Adding New Secrets

1. Add secret to GitHub Settings
2. Reference in workflow:
```yaml
env:
  MY_SECRET: ${{ secrets.MY_SECRET }}
```

### Modifying Branch Protection

1. Update rules in GitHub Settings
2. Test with a draft PR
3. Verify required checks appear

---

## 🎯 Best Practices

### For Developers

1. **Run checks locally before pushing:**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

2. **Keep PRs small** - faster CI runs, easier reviews

3. **Fix failing checks immediately** - don't accumulate technical debt

4. **Monitor CI status** - check the Actions tab regularly

5. **Use draft PRs** - for WIP changes that shouldn't trigger full CI

### For Maintainers

1. **Review CI logs** when builds fail
2. **Update dependencies** regularly
3. **Monitor secret expiration** dates
4. **Archive old workflow runs** to save space
5. **Update workflows** when adding new features

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [CodeQL Documentation](https://codeql.github.com/)

---

## 🆘 Getting Help

If you encounter issues with CI/CD:

1. Check this documentation
2. Review workflow logs in Actions tab
3. Check GitHub Actions status: https://www.githubstatus.com/
4. Open an issue in the repository
5. Contact the development team

---

**Last Updated:** 2025-01-20  
**Maintained By:** Web3 Quest Hub Team
