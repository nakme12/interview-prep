# 🔧 GIT & JIRA INTERVIEW GUIDE

**For Frontend Engineers with Production Experience**

---

## SECTION 1: GIT FUNDAMENTALS

### Q1: Explain Git Workflow. What's the difference between Git and GitHub?

**What They're Testing:**
- Understanding of version control basics
- Git vs GitHub distinction
- Practical workflow knowledge

**Your Answer Should Include:**

**Git vs GitHub:**
- **Git:** Version control system (tool for tracking code changes)
- **GitHub:** Cloud platform that hosts Git repositories (service)

**Typical Git Workflow:**
```
1. Clone repo → git clone https://repo.git
2. Create branch → git checkout -b feature/supplier-profile
3. Make changes → Edit files
4. Stage changes → git add .
5. Commit → git commit -m "Build supplier profile page"
6. Push → git push origin feature/supplier-profile
7. Create PR → Request code review
8. Merge → After approval, merge to main
```

**Real Example at Mercanis:**
```
Feature: Supplier profile page

1. git checkout -b feature/supplier-profile
2. Build component (SupplierProfile.svelte)
3. git add SupplierProfile.svelte
4. git commit -m "feat: add supplier profile page"
5. git push origin feature/supplier-profile
6. Create PR for code review
7. After approval: git merge → main
8. Delete branch: git branch -d feature/supplier-profile
```

**Key Points:**
- Git = Local version control
- GitHub = Remote hosting + collaboration
- Branches isolate features
- PRs enable code review

---

### Q2: Explain Git Branching Strategy. What branch naming conventions did you use?

**What They're Testing:**
- Understanding of team workflows
- Branch management
- Professional practices

**Your Answer Should Include:**

**Common Branching Strategies:**

1. **Feature Branch (What you likely used)**
   ```
   Main branch: main (production)
   Feature branches: feature/supplier-profile
   Bug branches: fix/payment-validation
   Hotfix branches: hotfix/critical-bug
   ```

2. **Git Flow (More complex teams)**
   ```
   main → production code
   develop → staging/testing
   feature/* → new features
   release/* → release preparation
   hotfix/* → production fixes
   ```

3. **Trunk-Based (Continuous Integration)**
   ```
   main → always deployable
   Short-lived feature branches
   Frequent merges
   ```

**At Mercanis (Typical):**
```
Naming convention:
feature/supplier-profile
feature/payment-configuration
fix/form-validation-bug
fix/lazy-loading-performance
chore/update-dependencies
docs/readme-updates

Format: [type]/[short-description]
Types: feature, fix, chore, docs, refactor, perf
```

**Why Naming Conventions Matter:**
- Clarity for team members
- Automated deployments (CI/CD picks up "feature/*")
- Easy tracking in Jira
- Professional standards

**Best Practices:**
- ✅ One feature per branch
- ✅ Short-lived branches (1-3 days max)
- ✅ Delete merged branches
- ✅ Keep branch names lowercase, use hyphens
- ✅ Reference Jira ticket if applicable: `feature/SUP-123-supplier-profile`

---

### Q3: What's a Git Merge vs Rebase? When would you use each?

**What They're Testing:**
- Understanding of different integration methods
- Knowledge of Git history
- Practical decision-making

**Your Answer Should Include:**

**Merge:**
```
Workflow:
1. You're on feature/supplier-profile
2. Main has 3 new commits from teammates
3. git merge main (or via PR merge)
4. Creates merge commit
5. Main history preserved

History looks like:
main: A → B → C → (merge commit) → D
feature: ├─ E → F → G ┘

Pro: Clear history of when features merged
Con: Cluttered history with merge commits
```

**Rebase:**
```
Workflow:
1. You're on feature/supplier-profile
2. Main has 3 new commits
3. git rebase main
4. Your commits replay on top of main
5. Cleaner linear history

History looks like:
A → B → C → E → F → G

Pro: Clean, linear history
Con: Changes commit hashes, harder to track
```

**Real Example at Mercanis:**

**Scenario 1: Using Merge (More common in teams)**
```bash
# You're on feature/supplier-profile
git fetch origin
git merge origin/main

# If conflicts, resolve them
git add .
git commit -m "Merge main into feature/supplier-profile"
git push origin feature/supplier-profile

# Then create PR → merge to main
```

**Scenario 2: Using Rebase (For clean history)**
```bash
# Before rebase
feature: A → B → C → E → F → G
main: A → B → C → D

# Interactive rebase
git rebase -i origin/main

# After rebase
feature: A → B → C → D → E → F → G (replayed)

# Risk: If E, F, G conflict with D, you fix each one
```

**When to Use:**
- **Merge:** Team workflow, pull requests, GitHub/GitLab default
- **Rebase:** Local cleanup before pushing, keep history clean

**At Mercanis:**
- ✅ Likely used **Merge** (GitHub/GitLab default)
- ✅ Each PR merge = one merge commit
- ✅ Preserves feature history
- ✅ Easier for teams

**Safe Practice:**
```
Never rebase commits that are already pushed!
git rebase = local only
git push --force = dangerous after rebase!
```

---

### Q4: Explain Git Conflicts. How do you resolve merge conflicts?

**What They're Testing:**
- Real-world problem solving
- Understanding of merge process
- Practical resolution strategies

**Your Answer Should Include:**

**What Causes Conflicts:**
```
You edit lines 10-15 in SupplierProfile.svelte
Teammate edits same lines 10-15
You try to merge → CONFLICT!

Git doesn't know which version is correct
```

**How Conflicts Look:**
```javascript
// SupplierProfile.svelte
<<<<<<< HEAD (your version)
const name = supplier.companyName;
const email = supplier.email;
=======  (their version)
const name = supplier.name;
const email = supplier.contactEmail;
>>>>>>> feature/update-supplier-fields
```

**Resolution Process:**

**Step 1: Identify Conflicts**
```bash
git status  # Shows conflicted files
git diff    # Shows detailed conflicts
```

**Step 2: Resolve (Choose what to keep)**
```javascript
// Option A: Keep your version
const name = supplier.companyName;
const email = supplier.email;

// Option B: Keep their version
const name = supplier.name;
const email = supplier.contactEmail;

// Option C: Combine both
const name = supplier.companyName || supplier.name;
const email = supplier.email || supplier.contactEmail;
```

**Step 3: Complete Resolution**
```bash
git add SupplierProfile.svelte
git commit -m "Resolve merge conflict: supplier field names"
git push origin feature/supplier-profile
```

**Real Mercanis Example:**

```javascript
// Conflict in payment configuration
<<<<<<< HEAD (your: feature/payment-terms)
const paymentDays = formData.paymentTermDays;
const paymentMethod = formData.method;

=======  (main: updated by team)
const paymentDays = formData.days;
const paymentMethod = formData.paymentMethod;
>>>>>>> main

// Resolution: Need to match backend field names
// Check backend API → use correct names
const paymentDays = formData.days;  // Main is correct
const paymentMethod = formData.paymentMethod;  // Main is correct
```

**Best Practices to Avoid Conflicts:**
- ✅ Communicate with team (don't both edit same files)
- ✅ Keep branches short-lived (1-2 days max)
- ✅ Merge main frequently into your branch
- ✅ Use feature flags for large changes

**Tools for Conflict Resolution:**
- VS Code: Built-in conflict resolver (very good!)
- Git: Manual editing
- GitHub/GitLab: Inline conflict resolver

---

### Q5: Explain Git Revert vs Reset vs Restore. When to use each?

**What They're Testing:**
- Understanding of "undo" operations
- Knowing safe vs dangerous operations
- Real-world recovery scenarios

**Your Answer Should Include:**

**Three Different Operations:**

**1. Git Restore (SAFE - Just undo file changes)**
```bash
# You edited SupplierProfile.svelte but want to discard changes
git restore SupplierProfile.svelte

# Reverts file to last commit version
# Doesn't affect other files or history
# SAFE to use!
```

**2. Git Revert (SAFE - Undo commits, create new commit)**
```bash
# You committed wrong code, want to undo
git revert abc123def  # Where abc123def = commit hash

# Creates NEW commit that undoes changes
# Original commit still exists in history
# Safe! Doesn't change history
# Perfect for shared/pushed commits

Example:
Original: A → B → C (bad commit)
After revert: A → B → C → D (D undoes C)
```

**3. Git Reset (DANGEROUS - Rewrite history)**
```bash
# You made commits locally, want to undo before pushing
git reset --soft HEAD~1  # Undo last commit, keep changes

# Completely removes commit from history
# NEVER use after pushing to shared branch!
# Only safe for local commits!

Example:
Before: A → B → C
After: A → B (C completely removed)
```

**Comparison Table:**

| Operation | Safety | Use When | Effect |
|-----------|--------|----------|--------|
| **Restore** | ✅ Safe | Discard file edits | File reverted to last commit |
| **Revert** | ✅ Safe | Undo pushed commit | New commit undoes changes |
| **Reset** | ⚠️ Danger | Undo local commits | Commits removed from history |

**Real Mercanis Scenarios:**

**Scenario 1: You edited wrong file (use Restore)**
```bash
# Edited PaymentForm.svelte by mistake
git restore PaymentForm.svelte  # ✅ Safe, just discard

# Don't do: git reset (overkill, rewrites history)
```

**Scenario 2: You committed to main (use Revert)**
```bash
# Committed bad code to main (already pushed)
git revert abc123def  # ✅ Safe, creates undo commit

# Don't do: git reset (rewrites shared history!)
```

**Scenario 3: You committed locally, haven't pushed (use Reset)**
```bash
# Made 3 commits locally, all wrong direction
git reset --soft HEAD~3  # ✅ Safe locally, undoes commits

# Keep changes in staging: --soft
# Discard changes: --hard (⚠️ be careful!)

# Don't do after push: git reset (dangerous for team!)
```

**GOLDEN RULE:**
- ✅ **Restore/Revert:** Safe after pushing
- ⚠️ **Reset:** Only before pushing!

---

## SECTION 2: JIRA FUNDAMENTALS

### Q6: What's Jira? How did you use it in daily work at Mercanis?

**What They're Testing:**
- Understanding of project management
- Practical usage in team
- Organization and communication skills

**Your Answer Should Include:**

**What is Jira:**
- Project management tool
- Issue/ticket tracking system
- Sprint planning
- Agile workflow management

**At Mercanis (Typical Usage):**

**1. Creating Issues/Tickets**
```
Title: "Build supplier profile page"
Type: Story (or Task/Bug)
Sprint: Sprint 12
Story Points: 5
Assignee: You
Description:
  As a supplier, I want to view and edit my profile
  so that I can manage my company information

Acceptance Criteria:
  - Display supplier name, email, phone
  - Allow edit of these fields
  - Save changes to backend
  - Show success/error messages

Linked Issues:
  - SUP-123 (supplier configuration)
```

**2. Workflow Status**
```
TO DO → IN PROGRESS → IN REVIEW → DONE

You create PR → Move to IN REVIEW
PR approved → Move to DONE
```

**3. Merge Requests & Jira**
```
You link Jira ticket to PR:
  PR title: "fix: SUP-456 supplier profile validation"

When PR merged:
  Jira ticket auto-moves to DONE
  (if properly configured)
```

**4. Sprint Planning**
```
Sprint = 2 weeks usually
Stories assigned to sprint
Daily standup: What did I do? Blockers?
Sprint review: Demo completed work
```

**Your Role as Junior FE Engineer:**
```
1. Pick ticket from "TO DO"
2. Move to "IN PROGRESS"
3. Link ticket to your Git branch:
   git checkout -b feature/SUP-456-supplier-validation
4. Work on feature
5. Create PR (reference ticket)
6. Move ticket to "IN REVIEW"
7. After approval → Move to "DONE"
```

---

### Q7: What's a Story, Task, Bug, Epic in Jira? How are they different?

**What They're Testing:**
- Understanding of issue types
- Project organization knowledge
- Appropriate categorization skills

**Your Answer Should Include:**

**Jira Issue Types:**

**1. Epic (Big Feature)**
```
Title: "Supplier Management System"
Scope: Multiple sprints (could be 3-4)
Contains: Multiple stories

Example:
Epic: Supplier Management System
  Story 1: Build supplier profile page
  Story 2: Build supplier configuration page
  Story 3: Build supplier dashboard
  Story 4: Add approval workflow
```

**2. Story (Feature Work)**
```
Title: "Build supplier profile page"
Sprint: Sprint 12
Story Points: 5 (complexity estimate)
Format: User Story
  "As a supplier, I want to X, so that Y"

Example:
As a supplier, I want to view and edit my profile
so that I can manage my company information
```

**3. Task (Non-feature Work)**
```
Title: "Update dependencies"
Type: Task (not user-facing)
No story points usually
Examples:
  - Refactor code
  - Update packages
  - Fix build issues
  - Code cleanup
```

**4. Bug (Problem)**
```
Title: "Supplier name field not saving"
Type: Bug
Priority: High (if blocking)
Reproduce Steps:
  1. Open supplier profile
  2. Edit name field
  3. Click save
  4. Name doesn't save

Expected: Name saves successfully
Actual: Name not saved, no error shown
```

**Real Mercanis Examples:**

```
Epic: Supplier Payment Configuration
├── Story: Build payment terms form (5 points)
├── Story: Add payment method selection (3 points)
├── Story: Integrate with payment gateway (8 points)
├── Task: Refactor payment utils (2 points)
└── Bug: Fix form validation error message (2 points)
```

**How You Use Them:**

| Type | Your Role | What You Do |
|------|-----------|------------|
| **Epic** | Read, understand scope | Break into stories |
| **Story** | Work on it | Build feature, create PR |
| **Task** | Work on it | Refactor, cleanup |
| **Bug** | Work on it | Fix and test |

---

### Q8: Explain Jira Story Points and Estimation. How do you estimate?

**What They're Testing:**
- Understanding of project estimation
- Fibonacci sequence knowledge
- Practical experience with story points

**Your Answer Should Include:**

**What are Story Points:**
- Measure of complexity/effort
- NOT hours or days
- Relative comparison
- Team agreement (consensus)

**Fibonacci Scale (Most Common):**
```
1 point   = Very simple (1-2 hours)
2 points  = Simple (few hours)
3 points  = Medium (1 day)
5 points  = Complex (1-2 days)
8 points  = Very complex (2-3 days)
13 points = Epic-level (multiple days)
```

**How Teams Estimate (Planning Poker):**
```
1. PO presents story
2. Team discusses
3. Everyone picks points secretly
4. Reveal simultaneously
5. If agreement → Done
6. If disagreement → Discuss → Re-estimate
```

**Estimation Factors:**
- Complexity
- Unknowns/Risk
- Dependencies
- Developer experience

**Examples at Mercanis:**

**Story: Build supplier profile page**
```
Estimation:
- Display basic info: 2 points
- Add edit form: 3 points
- API integration: 3 points
- Error handling: 2 points
- Testing: 1 point
Total: ~8 points (maybe 1-2 day task for junior dev)

Assign: 5 or 8 points (accounting for learning curve)
```

**Story: Add validation to payment form**
```
If validation already exists elsewhere: 3 points
If building validation from scratch: 5 points

Factors:
+ Experience with validation libraries
- Integrating with specific backend
```

**Tips for Estimation:**

✅ **Good Estimation:**
- Based on team velocity (average points/sprint)
- Includes testing time
- Accounts for unknowns
- Peer-reviewed

❌ **Bad Estimation:**
- Too precise ("We'll do 34 hours")
- Doesn't include testing
- Ignores risks
- Solo estimation

---

### Q9: How do you handle blocked tasks in Jira? Link issues?

**What They're Testing:**
- Understanding of dependencies
- Communication about blockers
- Problem-solving approach

**Your Answer Should Include:**

**Jira Linking:**
```
You're building supplier profile page
Backend API not ready yet
You link in Jira: This story BLOCKED BY SUP-456

Types of links:
- Blocks: This story blocks another
- Is blocked by: Another story blocks this
- Related to: General relationship
- Duplicates: Same work elsewhere
- Clones: Copy of another issue
```

**Real Scenario at Mercanis:**

```
Your task: SUP-789 "Build supplier configuration UI"
Blocked by: SUP-788 "Backend API for configuration" (not done yet)

In Jira:
1. Add link: "SUP-789 IS BLOCKED BY SUP-788"
2. Comment: "@backend-dev - waiting on configuration API"
3. Status: Stay in "TO DO" or "WAITING"
4. No assignment yet (waiting)

When SUP-788 done:
5. Backend notifies you
6. Remove blocking link
7. Move SUP-789 to "IN PROGRESS"
8. Start working
```

**Types of Blockers:**

**1. Dependency Blocker (API/Backend)**
```
You need: Backend API endpoint
Action: Link issue, comment with @mention, wait
Timeline: Estimated time from backend team
```

**2. Design Blocker (Design/Product)**
```
You need: UI mockups
Action: Ask in comment, @mention designer
Timeline: Usually quick
```

**3. Infrastructure Blocker**
```
You need: Database changes
Action: Notify DevOps/Infrastructure team
Timeline: Can take time
```

**Best Practices:**

✅ **Good Blocker Handling:**
- Link in Jira immediately
- Comment with reason: "@backend - waiting for SUP-456 API"
- Give time estimate: "Can I work on this by Thursday?"
- Work on other stories meanwhile
- Update status: "Waiting for..."

❌ **Bad:**
- Don't mention blocker → team doesn't know
- Wait passively → waste time
- No status update → confusing

**At Your Standup:**
```
Yesterday: Started SUP-789, blocked by backend API
Today: Working on SUP-790 while waiting
Blocker: Need SUP-788 API by Friday
```

---

### Q10: What's Git in context of Jira? How do they integrate?

**What They're Testing:**
- Understanding of tool integration
- Practical workflow in real teams
- Connecting code to issues

**Your Answer Should Include:**

**Git-Jira Integration:**

Developers link Git commits to Jira tickets automatically!

**How It Works:**

**1. Branch Naming Convention**
```
git checkout -b feature/SUP-456-supplier-profile

Format: [type]/[jira-ticket]-[description]
Jira auto-recognizes "SUP-456" in branch name
```

**2. Commit Messages**
```
git commit -m "Build supplier profile form - SUP-456"
or
git commit -m "SUP-456: Build supplier profile form"

Jira matches "SUP-456" automatically
```

**3. Pull Request Linking**
```
PR Title: "Build supplier profile page (SUP-456)"
PR Description:
  "Fixes SUP-456"
  or
  "Closes SUP-456"

Jira sees this → Auto-links PR to ticket
```

**4. Automatic Workflow Updates**
```
When PR merged to main:
  Jira ticket auto-moves to DONE
  (if automation configured)

Manual: Move to DONE in Jira UI
Automatic: PR merge triggers workflow
```

**Real Mercanis Workflow:**

```
1. Create Jira ticket: SUP-789 "Build supplier profile"
2. Create Git branch: feature/SUP-789-supplier-profile
3. Commit: git commit -m "SUP-789: Create profile form"
4. Push: git push origin feature/SUP-789-supplier-profile
5. Create PR: Title includes "SUP-789: Build supplier profile"
6. Jira auto-links the PR to ticket SUP-789
7. PR approved
8. Merge to main
9. Jira auto-moves SUP-789 to DONE

Timeline visible in Jira:
- Ticket created
- Branch created (linked)
- Commits added (linked)
- PR created (linked)
- PR merged (linked)
- Ticket closed

Complete traceability!
```

**Why This Matters:**

✅ **Traceability:** Know exactly which code fixed which issue
✅ **Automation:** No manual status updates needed
✅ **Communication:** Team sees all progress
✅ **Reporting:** Know velocity, cycle time, etc.

**Best Practices:**

✅ Always include ticket number in branch name
✅ Reference ticket in commit messages
✅ Use "Closes SUP-456" in PR for auto-closure
✅ One ticket = one feature = one PR (usually)

❌ Don't: Ignore ticket numbering
❌ Don't: Merge without linking
❌ Don't: Create PR without description

---

## SECTION 3: COMMON INTERVIEW SCENARIOS

### Scenario 1: "You broke production. Walk us through your process."

```
Situation: Bug in supplier profile that breaks on save

Your process:
1. Identify issue (customer reports → Jira bug ticket)
2. Create hotfix branch: hotfix/critical-supplier-save-bug
3. Reproduce the bug locally
4. Debug: Use DevTools, console, error logs
5. Find root cause: Missing field validation
6. Write fix: Add validation
7. Test locally: Verify fix works
8. Commit: git commit -m "hotfix: Fix supplier profile save bug"
9. Create PR: Mark as urgent
10. Fast-track review (hotfix priority)
11. Merge to main
12. Deploy to production
13. Monitor: Check error logs, customer feedback
14. Update Jira: Move ticket to DONE
15. Retrospective: How to prevent?

Key: Speed + Caution + Communication
```

---

### Scenario 2: "You have merge conflicts. How do you handle?"

```
Your approach:
1. Don't panic! Conflicts are normal
2. Pull latest main: git pull origin main
3. See conflicts: git status
4. Open file with conflicts
5. Understand both versions
6. Make decision: Keep mine? Keep theirs? Combine?
7. At Mercanis: Talk to person who made conflicting change
8. Resolve conflicts
9. Test thoroughly (conflicts can break things!)
10. git add .
11. git commit -m "Resolve merge conflicts with main"
12. git push
13. PR review ensures code still works
```

---

### Scenario 3: "How do you manage multiple parallel features?"

```
Multiple features in progress:

Jira: Shows 3 stories in "IN PROGRESS"
Why: Dependencies - you're waiting on API for story 1

Context switching:
- Story SUP-789: In progress, blocked by backend
- Story SUP-790: In progress, you're actively coding
- Story SUP-791: In progress, ready to start when 790 done

Git branches:
- feature/SUP-789-supplier-profile (blocked)
- feature/SUP-790-payment-config (active)
- feature/SUP-791-analytics (ready)

Management:
- Jira: Track status of each
- Git: Keep branches separate
- Standup: Communicate blockers
- Context: Switch as needed
```

---

## SECTION 4: RED FLAGS TO AVOID

❌ **Don't say:**
- "I don't know Git" (Required skill!)
- "I only used Git GUI, never command line" (Learn CLI!)
- "I ignored Jira tickets" (Team communication!)
- "I merged without PR" (Code quality!)
- "I committed directly to main" (Bad practice!)
- "I reset shared branches" (Dangerous!)

✅ **DO say:**
- "I use Git daily for version control"
- "I follow branching conventions"
- "I create PRs for code review"
- "I link my work to Jira tickets"
- "I communicate blockers to team"
- "I follow team Git practices"

---

## SECTION 5: QUICK REFERENCE

### Git Commands You Should Know:
```bash
git clone                 # Clone repo
git checkout -b           # Create branch
git add .                 # Stage changes
git commit -m             # Commit with message
git push origin [branch]  # Push to remote
git pull origin main      # Pull latest
git merge [branch]        # Merge branch
git revert [commit]       # Undo commit safely
git restore [file]        # Discard file changes
git status                # Check status
git log                   # View commit history
git branch -d             # Delete local branch
```

### Jira Workflow States:
```
TO DO → IN PROGRESS → IN REVIEW → DONE

Blocking states:
TO DO: Not started
BLOCKED: Waiting on dependency
WAITING: Waiting for something
IN PROGRESS: Actively working
IN REVIEW: Waiting for code review
DONE: Completed
```

### Integration Best Practices:
```
Branch: feature/SUP-456-name
Commit: git commit -m "SUP-456: description"
PR: Title includes "SUP-456"
Merge: PR merge links to Jira
Auto-close: "Closes SUP-456" in PR
```

---

## 🎯 INTERVIEW TIPS

✅ **Be specific:** Share real examples from Mercanis
✅ **Show understanding:** Explain WHY, not just HOW
✅ **Mention teamwork:** Git/Jira are team tools
✅ **Discuss best practices:** Show professional standards
✅ **Ask clarifying questions:** "Did you want command-line or GUI perspective?"
✅ **Reference experience:** "At Mercanis, we used..."

---

**Good Luck! These skills make you a professional developer! 💪**
