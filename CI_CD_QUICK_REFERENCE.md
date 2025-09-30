# CI/CD Quick Reference

Fast reference for developers working with the CI/CD pipeline.

---

## ✅ Pre-Push Checklist

Run these **before pushing** to avoid CI failures:

```bash
# 1. Next.js App
cd web3-quest-hub-app
npm run type-check  # TypeScript ✅
npm run lint        # ESLint ✅
npm run build       # Build test ✅

# 2. Firebase Functions
cd ../firebase-functions
npm run build       # Compile ✅
```

---

## 🚦 CI/CD Status Checks

### Required (Must Pass to Merge)

| Check | What It Does |
|-------|-------------|
| ✅ Test Next.js App | Type check, lint, build |
| ✅ Test Firebase Functions | TypeScript compilation |
| ✅ Lint Extension | Manifest & JS validation |
| ✅ Security Audit | npm audit for vulnerabilities |

### Optional (Informational)

| Check | What It Does |
|-------|-------------|
| 🔦 Lighthouse | Performance testing |
| 🚀 Deploy Preview | Vercel preview deployment |
| 🔍 CodeQL | Security code scanning |
| 📦 Dependency Review | Checks for vulnerable deps |

---

## 🔄 Workflow Triggers

| Action | What Happens |
|--------|-------------|
| Push to `main`/`develop` | Full CI pipeline runs |
| Create PR to `main` | CI + Preview + Lighthouse |
| Merge to `main` | Firebase deploy |
| Push tag `v*` | Create release |
| Daily at 1 AM | Stale issue check |
| Weekly on Monday | CodeQL security scan |

---

## 🐛 Common CI Failures & Fixes

### Type Check Failed

```bash
# Error: TypeScript errors found
# Fix:
cd web3-quest-hub-app
npm run type-check
# Fix all errors shown
```

### Lint Failed

```bash
# Error: ESLint errors found
# Fix:
cd web3-quest-hub-app
npm run lint
# Fix all errors, or run:
npm run lint:fix  # Auto-fix if available
```

### Build Failed

```bash
# Error: Build process failed
# Common causes:
1. Missing environment variables
2. Import errors
3. TypeScript errors

# Fix:
1. Check .env.local.example for required vars
2. Verify all imports are correct
3. Run type-check first
```

### Security Audit Failed

```bash
# Error: High severity vulnerabilities found
# Fix:
npm audit fix
# Or update specific package:
npm update <package-name>
```

---

## 📊 View CI Status

### In PR

1. Scroll to bottom of PR
2. See status checks section
3. Click "Details" on failed checks
4. View logs

### In Actions Tab

1. Go to repository on GitHub
2. Click **Actions** tab
3. Find your workflow run
4. Click to view details and logs

---

## 🚀 Preview Deployments

### Automatic Vercel Previews

- Created for every PR to `main`
- URL posted as comment on PR
- Updates automatically on new commits
- Test before merging!

### Accessing Preview

1. Open your PR
2. Find bot comment with preview URL
3. Click link to view
4. Share with reviewers

---

## 🔐 Required Secrets

Set in: **Settings** → **Secrets and variables** → **Actions**

### Must Have

```
FIREBASE_TOKEN
FIREBASE_PROJECT_ID
GEMINI_API_KEY
ALCHEMY_API_KEY
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Optional (For Previews)

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

---

## 🎯 Branch Protection

`main` branch is protected:

- ✅ Requires PR (no direct commits)
- ✅ Requires 1 approval
- ✅ Requires passing status checks
- ✅ Requires up-to-date branch
- ✅ Requires conversation resolution
- ❌ No force pushes allowed
- ❌ No deletions allowed

---

## 📈 Performance Budgets

Lighthouse thresholds:

| Metric | Target |
|--------|--------|
| Performance | > 90 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TBT | < 300ms |

---

## 🔧 Debugging CI Failures

### 1. Check Logs

```
Actions Tab → Your Workflow → Failed Job → Expand log
```

### 2. Run Locally

```bash
# Reproduce the exact CI commands
cd web3-quest-hub-app
npm ci  # Use exact versions
npm run type-check
npm run lint
npm run build
```

### 3. Common Issues

| Issue | Solution |
|-------|----------|
| Out of memory | Increase Node memory or reduce build size |
| Timeout | Optimize build process or increase timeout |
| Flaky tests | Add retry logic or fix race conditions |
| Missing files | Check gitignore, ensure files are committed |

---

## 📝 Manual Workflow Triggers

Some workflows can be manually triggered:

1. Go to **Actions** tab
2. Select workflow from left sidebar
3. Click **Run workflow** button
4. Choose branch and parameters
5. Click **Run workflow**

**Manually triggerable:**
- Deploy Preview
- Lighthouse Performance
- Stale Issues
- Firebase Deploy

---

## 🏷️ Auto-Applied Labels

PRs automatically get labeled:

**By Files Changed:**
- `frontend` - Next.js app
- `backend` - Firebase functions
- `extension` - Browser extension
- `documentation` - Docs
- `dependencies` - Package.json
- `firebase` - Firebase config
- `ui/ux` - Components/styles
- `configuration` - Config files

**By Size:**
- `size/XS` - < 10 lines
- `size/S` - < 50 lines
- `size/M` - < 250 lines
- `size/L` - < 1000 lines
- `size/XL` - 1000+ lines

---

## 🚨 Emergency Procedures

### Skip CI (Emergency Only!)

```bash
# Add [skip ci] to commit message
git commit -m "fix: emergency hotfix [skip ci]"
```

**⚠️ Use only for:**
- Documentation fixes
- CI configuration fixes
- Emergency hotfixes

### Force Merge (Last Resort!)

1. Get approval from tech lead
2. Document reason
3. Use admin override
4. Fix issues immediately after

**⚠️ Never skip security checks!**

---

## 📞 Get Help

If CI is broken:

1. ✅ Check this guide
2. ✅ Review workflow logs
3. ✅ Search GitHub Actions docs
4. ✅ Ask in team chat
5. ✅ Check GitHub status page
6. ✅ Create issue with [ci] tag

---

## 📚 Full Documentation

For complete details, see:
- **[CI_CD_SETUP.md](CI_CD_SETUP.md)** - Full setup guide
- **[AGENTS.md](AGENTS.md)** - Development guidelines
- **[WORKFLOW_QUICK_START.md](WORKFLOW_QUICK_START.md)** - Daily workflow

---

**Quick Links:**
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Repository Actions](../../actions)
- [Repository Settings](../../settings)
- [Security Alerts](../../security)

---

**Remember:** Always run checks locally before pushing! 🚀
