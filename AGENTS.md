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

## 12. Workflow Summary

### For Each Task:
1. **Read and understand** existing code and specifications
2. **Plan the implementation** - document approach
3. **Confirm with stakeholder** if complex or unclear
4. **Implement incrementally** - small, testable changes
5. **Test thoroughly** - unit, integration, manual
6. **Document changes** - code comments and commit message
7. **Review security** - check for vulnerabilities
8. **Verify performance** - profile if critical path
9. **Commit with proper message** - use Conventional Commits
10. **Update task tracker** - mark as complete when DoD met

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

## 13. Tools and Commands

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
