# 🤖 AI TOOLS IN INTERVIEWS - HOW TO DISCUSS PROFESSIONALLY

**Status:** Essential for 2026+ interviews
**Purpose:** Be honest about AI tool usage while demonstrating real understanding and skill

---

## 🎯 THE REALITY CHECK

In 2026, **every developer uses AI tools**. Pretending you don't is suspicious and outdated. The question is NOT "do you use AI?" but rather "**do you understand what you built?**"

---

## 📋 YOUR AI TOOLS AT MERCANIS

### Coding Assistants
- **Claude** - Code generation, understanding patterns, debugging
- **Cursor** - AI-powered IDE for faster development
- **Windsurf** - Code generation and optimization

### Jira Assistant
- **Rovo** - Jira AI assistant for task management, summaries, automation

### What This Shows
✅ You use modern development tools
✅ You're efficient and productivity-focused
✅ You understand when/how to use AI to amplify your skills

---

## ✅ HOW TO ANSWER "DID YOU USE AI?"

### Perfect Answer Structure:

```
"Yes, I used Claude, Cursor, and Windsurf during development at Mercanis.
However, I didn't just copy-paste code. I:

1. Understood the implementation pattern
2. Tested edge cases and debugged issues
3. Reviewed generated code for performance/security
4. Can explain the entire flow without AI

For example, with optimistic updates, I can walk you through:
- Why we use them (UX improvement)
- How they work (UI updates before server response)
- Edge cases (network failures, conflicts)
- Trade-offs (complexity, data consistency)

AI tools help me work faster and learn patterns quicker, but understanding
the code is my responsibility."
```

### Key Points:
✅ Admit you used AI (be honest)
✅ Emphasize understanding > code generation
✅ Show you can explain implementation details
✅ Frame it as productivity/learning tool

---

## 🚫 WHAT NOT TO SAY

❌ "I didn't use AI" (They'll know you're lying)
❌ "AI wrote all my code" (Shows no understanding)
❌ "I don't really know how it works" (Red flag)
❌ "I just copy-pasted from AI" (Zero credibility)
❌ "AI is cheating" (Outdated perspective)

---

## 🎓 INTERVIEW QUESTIONS YOU'LL GET

### Q1: "Did you use AI tools at Mercanis?"

**Good Answer:**
```
"Yes, I used Claude for understanding patterns and debugging, Cursor and Windsurf
for faster code generation, and Rovo for Jira management.

The key is I don't treat them as magic - I review, test, and understand everything.
For features like optimistic updates, AI helped me generate the initial structure,
but I had to:
1. Test all edge cases
2. Debug race conditions
3. Optimize for performance
4. Understand the full flow

I can explain any code I wrote - with or without AI help."
```

### Q2: "Can you implement optimistic updates from scratch without AI?"

**Good Answer:**
```
"Absolutely. Let me walk you through it:

1. User takes action (e.g., updates payment terms)
2. Immediately update UI optimistically
3. Send request to server
4. If success → UI already matches (no re-render needed)
5. If error → rollback to previous state + show error

The tricky part is handling race conditions - if user changes data
while request is pending. That's why we store request state and
compare server response before accepting/rejecting."
```

### Q3: "How do you balance speed with understanding?"

**Good Answer:**
```
"I use AI to accelerate learning, not to skip it. For example:

- Generate initial code structure (saves boilerplate time)
- Understand the pattern by reading and testing
- Debug issues myself when things break
- Document for future reference

The result: I learn patterns faster AND can implement them again
without AI. It's like having a knowledgeable mentor who gives you
starting points, but you do the actual learning."
```

### Q4: "What code have you written that you're proud of?"

**Good Answer:**
```
"The merge request review process I contributed to. I didn't just
implement features - I reviewed code from other developers, caught
bugs, suggested optimizations. That required understanding code deeply,
even when I didn't write it myself.

Also, debugging production issues - when something breaks, AI can't
help much. That's pure problem-solving and requires real understanding."
```

### Q5: "What do you know that ChatGPT doesn't?"

**Good Answer:**
```
"Everything about YOUR codebase. AI can generate generic code, but:

- Understanding your specific architecture
- Knowing why you chose Svelte over React
- Remembering your team's conventions
- Debugging production issues specific to your system
- Making judgment calls about performance/maintainability

That domain knowledge is what separates developers from AI. I use AI
for generic patterns, but domain knowledge is mine."
```

---

## 💪 STRENGTH POINTS TO EMPHASIZE

| When They Ask... | You Say... |
|---|---|
| "Did you use AI?" | "Yes, like most developers in 2026. I use it to work faster and learn patterns, but I fully understand the code." |
| "Prove you understand it" | "Sure, I can explain [feature] from first principles, debug issues, and implement it again without help." |
| "What's your workflow?" | "I use Cursor/Claude for initial code, review it carefully, test edge cases, then refactor for production quality." |
| "How do you stay ahead of AI?" | "By understanding fundamentals - architecture, algorithms, testing. AI handles boilerplate; I handle design." |

---

## 📝 YOUR SPECIFIC ANSWERS - MERCANIS EXAMPLES

### Optimistic Updates

**How to answer:**
```
"At Mercanis, we implemented optimistic updates in the supplier
profile page. When users edited payment terms, the UI updated
immediately while the request went to the server.

I used Claude to understand the pattern, then implemented it with:
- Instant UI update (user sees change immediately)
- Server request (validate and persist)
- Rollback logic (if server rejects)
- Error handling (show user what went wrong)

The trick was handling race conditions - if user made changes while
the previous request was pending. I stored request state to handle that."
```

### Lazy Loading

**How to answer:**
```
"For the supplier configuration page, we had many payment options
and settings that weren't immediately visible. Instead of loading everything:

1. Load visible section first
2. Load rest when user scrolls down
3. Show loading spinner for better UX

I used Windsurf to generate initial structure, then optimized it to:
- Track scroll position
- Prevent duplicate requests
- Cache loaded sections
- Handle network errors gracefully

The result: Page loads 3x faster, better user experience."
```

### MR Reviews

**How to answer:**
```
"Beyond writing code, I reviewed MRs from my team. That required
understanding code deeply:

- Does it solve the problem correctly?
- Are there edge cases not handled?
- Is performance acceptable?
- Does it follow our conventions?
- Will it be maintainable?

I couldn't rely on AI for this - it required judgment and domain knowledge
about our codebase and product."
```

---

## 🔥 GOLDEN RULES FOR AI DISCUSSION

### Rule 1: Be Honest
- Tell them you used AI (everyone does)
- Don't exaggerate or minimize its role

### Rule 2: Prove Understanding
- Explain code without AI
- Answer deep technical questions
- Debug issues in real-time

### Rule 3: Show Value Beyond AI
- Domain knowledge
- Design decisions
- Problem-solving
- Team collaboration

### Rule 4: Stay Current
- Acknowledge AI is normal in 2026
- Show you use it strategically
- Demonstrate you're not dependent on it

### Rule 5: Be Ready for Follow-ups
- "Can you implement this without AI?" → YES, explain it
- "What would you do differently?" → Show optimization ideas
- "What went wrong?" → Walk through debugging process

---

## 🎯 PRACTICE ANSWERS (SAY OUT LOUD 5+ TIMES)

### Short Version (30 seconds)
```
"Yes, I use Claude, Cursor, and Windsurf to speed up development.
They help me generate code faster and understand patterns, but I fully
understand what I built. I can explain any feature from scratch, test
it, debug issues, and optimize it. AI is a tool that amplifies my skills,
not a replacement for understanding."
```

### Medium Version (1 minute)
```
"I use AI tools strategically - Claude for pattern understanding,
Cursor/Windsurf for faster coding, Rovo for Jira management.

At Mercanis, I implemented optimistic updates and lazy loading. AI helped
me understand the patterns faster, but I had to:
1. Test all edge cases
2. Handle error scenarios
3. Optimize for performance
4. Review and debug issues

The key insight: AI gives you starting points, but engineering is about
making it production-ready. That requires understanding, testing, and
careful thinking - things only humans can do well."
```

### Long Version (2 minutes - Full Interview Answer)
```
"I'm a strong believer in using modern tools effectively. At Mercanis,
I used Claude for understanding patterns and debugging, Cursor and Windsurf
for faster code generation, and Rovo for task management.

But - and this is crucial - I don't treat them as black boxes. When AI
generates code, I:
1. Read and understand it thoroughly
2. Test it against different scenarios
3. Debug production issues
4. Optimize based on performance needs

For example, with optimistic updates: AI generated the structure, but
I had to understand race conditions, implement rollback logic, and handle
network failures. That can't be automated.

I can implement any feature I built without AI - it just takes longer.
AI helps me work faster and learn patterns quicker, but the deep
understanding is mine. In interviews like this, you can ask me to explain
any code, debug any issue, or implement any feature from scratch."
```

---

## 📊 CONFIDENCE SCALE

After preparing this section, you should be able to:

- [ ] Comfortably admit you use AI (no shame!)
- [ ] Explain why you used specific tools
- [ ] Implement features from scratch without AI
- [ ] Debug issues independently
- [ ] Discuss trade-offs and optimization
- [ ] Answer follow-up questions confidently
- [ ] Handle skeptical interviewers
- [ ] Show genuine understanding

**Target:** Achieve all 8 checkboxes before interviews

---

## 🎓 INTERVIEW MINDSET

Remember:
- ✅ Using AI is normal and smart
- ✅ Understanding code is still essential
- ✅ Honesty is credibility
- ✅ Your domain knowledge matters
- ✅ You can learn with AI help
- ❌ Don't pretend you didn't use AI
- ❌ Don't claim to understand code you don't
- ❌ Don't be defensive about AI usage

---

## ⚡ FINAL TALKING POINT

**When interviewer asks about AI:**

"I view AI tools like calculators for developers. Yes, engineers use calculators,
but they still understand math. I use AI to optimize my workflow, but I understand
every line of code I ship. I can explain it, test it, debug it, and improve it -
that's what matters."

---

**Last Updated:** May 1, 2026
**Status:** Ready for Interview Preparation
**Confidence Level After This Guide:** HIGH 💪

