# Security Fix: API Key Protection

## Issue Resolved

GitHub's push protection correctly blocked a commit containing a hardcoded Linear API key in `import-to-linear.js`.

## What Was Fixed

### ❌ Before (Insecure):
```javascript
const linearClient = new LinearClient({
  apiKey: 'lin_api_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // Hardcoded! NEVER DO THIS
});
```

### ✅ After (Secure):
```javascript
const { LinearClient } = require('@linear/sdk');
require('dotenv').config();

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY // From environment variable
});

if (!process.env.LINEAR_API_KEY) {
  console.error('❌ ERROR: LINEAR_API_KEY environment variable is not set!');
  process.exit(1);
}
```

## Security Measures Implemented

### 1. Environment Variable Configuration

**Created `.env` file** (gitignored):
```bash
LINEAR_API_KEY=your_actual_linear_api_key_here
```

**Created `.env.example` file** (tracked in git):
```bash
LINEAR_API_KEY=your_linear_api_key_here
```

### 2. Updated `.gitignore`

Already configured to ignore:
```
.env
.env*.local
```

### 3. Installed Required Package

```bash
npm install dotenv
```

### 4. Git History Cleaned

- Reset the problematic commit
- Created fresh commits without the API key
- Successfully pushed to GitHub

## How to Use Environment Variables

### For Local Development:

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Add your actual API key to `.env`**:
   ```bash
   LINEAR_API_KEY=your_actual_key_here
   ```

3. **Run the script**:
   ```bash
   npm run import-linear
   ```

### For GitHub Actions (CI/CD):

1. **Add secrets in GitHub**:
   - Go to: Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `LINEAR_API_KEY`
   - Value: Your actual API key

2. **Reference in workflows**:
   ```yaml
   env:
     LINEAR_API_KEY: ${{ secrets.LINEAR_API_KEY }}
   ```

### For Team Members:

**Never share `.env` files!** Each team member should:
1. Create their own `.env` file using `.env.example` as a template
2. Get API keys from secure sources (1Password, LastPass, etc.)
3. Never commit `.env` to git

## Security Best Practices

### ✅ DO:
- Use environment variables for all secrets
- Keep `.env` in `.gitignore`
- Share `.env.example` templates (without actual secrets)
- Use GitHub Secrets for CI/CD
- Rotate API keys if accidentally exposed
- Use `dotenv` or similar libraries

### ❌ DON'T:
- Hardcode API keys in source code
- Commit `.env` files
- Share API keys via email or chat
- Include secrets in commit messages
- Push secrets to public repositories
- Use production keys in development

## API Key Rotation

Since the Linear API key was exposed in the previous commit attempt (but blocked), you should consider rotating it:

1. **Generate a new Linear API key**:
   - Go to: https://linear.app/settings/api
   - Click "Create new key"
   - Copy the new key

2. **Update your `.env` file**:
   ```bash
   LINEAR_API_KEY=new_key_here
   ```

3. **Revoke the old key**:
   - Go to: https://linear.app/settings/api
   - Find the old key
   - Click "Revoke"

4. **Update GitHub Secrets** (if using CI/CD):
   - Go to: Settings → Secrets and variables → Actions
   - Update `LINEAR_API_KEY` with the new key

## GitHub's Secret Scanning

GitHub's push protection successfully:
- ✅ Detected the Linear API key pattern
- ✅ Blocked the push before it reached the repository
- ✅ Provided clear instructions to resolve the issue
- ✅ Protected your security proactively

## Files Modified

| File | Status | Description |
|------|--------|-------------|
| `import-to-linear.js` | ✅ Fixed | Now uses environment variables |
| `.env` | ✅ Created | Contains actual API key (gitignored) |
| `.env.example` | ✅ Created | Template for team (tracked in git) |
| `package.json` | ✅ Updated | Added dotenv dependency |
| `.gitignore` | ✅ Verified | Already ignores .env files |

## Testing the Fix

Verify the fix works:

```bash
# 1. Check environment variable is loaded
node -e "require('dotenv').config(); console.log(process.env.LINEAR_API_KEY ? '✅ API key loaded' : '❌ API key missing')"

# 2. Run the import script
npm run import-linear

# 3. Verify no secrets in staged files
git add .
git secrets scan -a  # If you have git-secrets installed
```

## Additional Resources

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [Linear API Documentation](https://developers.linear.app/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

**Status**: ✅ **RESOLVED**  
**Date**: 2025-01-20  
**Action Taken**: Removed hardcoded API key, implemented environment variables  
**Verification**: Successfully pushed to GitHub without secrets
