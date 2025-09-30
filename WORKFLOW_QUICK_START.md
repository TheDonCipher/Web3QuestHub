# Web3 Quest Hub - Workflow Quick Start

Quick reference for developers starting work on the project.

## 🎯 Linear Tasks Imported

✅ **118 issues created** in Linear (Team: WEB)
- 7 Epics (Phases)
- 23 Stories
- 88 Tasks

**Access:** https://linear.app/web3questhub

---

## 🚀 Quick Daily Workflow

### 1. Start New Task (2 minutes)

```bash
# In Linear: Move issue to "In Progress"

# In Terminal:
git checkout main && git pull
git checkout -b feature/WEB-X-description
```

### 2. Make Changes

```bash
# Code, test, document
npm run type-check  # Check types
npm run lint        # Check code style
```

### 3. Commit and Push (1 minute)

```bash
git add .
git commit -m "feat: your change (WEB-X)

Description of what you did.

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>"

git push -u origin feature/WEB-X-description
```

### 4. Create PR (1 minute)

```bash
gh pr create --title "feat: Your Feature (WEB-X)" --body "Closes WEB-X"
```

### 5. After Approval (30 seconds)

```bash
gh pr merge --squash --delete-branch
git checkout main && git pull
git branch -d feature/WEB-X-description
# Linear issue auto-closes!
```

---

## 📝 Commit Message Template

```
<type>: <description> (WEB-X)

<longer description if needed>

<technical details>
<testing notes>

Co-authored-by: factory-droid[bot] <138933559+factory-droid[bot]@users.noreply.github.com>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

---

## 🔗 Linear Integration

### Auto-Link Commits to Linear

Just include `(WEB-X)` in commit messages:

```bash
git commit -m "feat: add quest grid (WEB-15)"
```

### Auto-Close Issues

Use keywords in PR description:

```markdown
Closes WEB-15
Fixes WEB-23
Resolves WEB-42
```

---

## 🛠️ Common Commands

### Branch Management

```bash
# Create feature branch
git checkout -b feature/WEB-X-name

# Create fix branch
git checkout -b fix/WEB-X-name

# Create hotfix branch
git checkout -b hotfix/WEB-X-critical
```

### PR Management

```bash
# Create PR
gh pr create

# List PRs
gh pr list

# Check PR status
gh pr status

# Merge PR
gh pr merge --squash --delete-branch
```

### Switching Tasks

```bash
# Save current work
git stash save "WIP: feature description"

# Switch branch
git checkout feature/WEB-Y-other-task

# Return and restore
git checkout feature/WEB-X-original
git stash pop
```

---

## 📋 Before Merging Checklist

- [ ] All review comments addressed
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests passing (if configured)
- [ ] At least 1 approval
- [ ] No merge conflicts
- [ ] Branch up to date with main

---

## 🎨 Branch Naming Convention

```
feature/WEB-X-short-description  ← New features
fix/WEB-X-short-description      ← Bug fixes
refactor/WEB-X-short-description ← Code improvements
hotfix/WEB-X-short-description   ← Urgent fixes
docs/update-readme               ← Documentation only
```

---

## 🔄 Merge Conflict Resolution

```bash
# Update your branch
git fetch origin main
git rebase origin/main

# Fix conflicts in files
# Look for: <<<<<<< HEAD

# After fixing:
git add .
git rebase --continue
git push --force-with-lease
```

---

## 📚 Full Documentation

- **AGENTS.md** - Complete development guidelines
- **SETUP_PROJECT_MANAGEMENT.md** - Detailed GitHub/Linear setup
- **IMPLEMENTATION_PLAN.md** - Technical architecture
- **TASKLIST.md** - All tasks and acceptance criteria

---

## 🎯 Current Phase: Phase 1 - Foundation

Focus on these tasks first (in Linear):
1. Initialize Next.js Project (WEB-2)
2. Set Up Firebase Project (WEB-6)
3. Implement Basic Component Structure (WEB-11)

**Start here:** https://linear.app/web3questhub/team/WEB/backlog

---

## 💡 Tips

1. **Commit often** - Small, focused commits are better
2. **Reference Linear always** - Include `(WEB-X)` in every commit
3. **Use PR templates** - Helps reviewers understand changes
4. **Test before pushing** - Run type-check and lint
5. **Keep PRs small** - Easier to review and merge
6. **Respond to reviews quickly** - Don't let PRs go stale

---

## 🆘 Need Help?

- Check **AGENTS.md** for detailed workflows
- Ask questions in PR comments
- Tag reviewers with @username
- Refer to technical specs in **TSD-W3QH-V1.0.txt**

---

**Happy coding! 🚀**
