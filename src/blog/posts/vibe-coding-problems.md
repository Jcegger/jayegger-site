---
layout: post.njk
title: "Why Your Vibe Coding Project Sucks"
description: "Vibe coding gets you 95% of the way to working software. The last 5% is where most projects die."
date: 2026-04-22
updated:
tags: [LLMs]
excerpt: "Vibe coding is great at producing software that runs and bad at producing software that's a product. Six places it falls apart."
featuredImage:
featured: true
draft: true
---
LLMs [pre-date](https://toloka.ai/blog/history-of-llms/) the release of ChatGPT by years, but since its release, software engineering got accessible to people who've never written code. In theory, anyone can launch their own SAAS product with no coding experience. In practice, it's not necessarily that easy. With vibe coding, instead of writing code line-by-line, you write in natural language to delegate creation to an AI assistant. The trouble is that most of these products ship (if they even reach that step) with problems the builder doesn't even see.

Vibe coding is great at producing software that runs, but often fails at creating fleshed-out **products**. This distinction is not an issue when working on personal portfolio projects, but the second you have users beyond yourself it gets a bit testy. I'll walk through six areas where your vibe-coded project falls apart, as well as what to do about them. Be wary, not all of them are quick fixes!


## It only runs on your laptop

*Section purpose: the first wall a non-technical builder hits when they try to actually share what they made. The gap between "I built it" and "people can use it" is bigger than they expect.*

### Why it's a problem

- The pattern: works on localhost, breaks the moment you try to put it anywhere else. Hard-coded paths, env vars that aren't set, hosting assumptions the AI guessed at.
- Why it happens: the chat doesn't have access to your hosting account, your domain registrar, your DNS settings. It assumes a lot. Deployment is a different skill than development.
- The cost: this is where a huge number of vibe-coded projects quietly die. Not because they don't work, but because they only work for one person on one machine.
- Optional anecdote slot: a friend or generic story of someone who shipped something cool but couldn't get it past localhost.

### What to do about it

- Pick your deploy target before you start, and tell the AI what it is. Cloudflare Pages, Vercel, Netlify, Fly.io, whatever. Different platforms have different conventions and the AI will guess wrong if you don't say.
- Ship to a real URL early, even if the project is half-done. Fixing localhost-only assumptions later is harder than building deployable from the start.
- Treat env vars and secrets as part of the spec, not an afterthought. If the AI hard-coded a key, your prod build will leak it.
- When something works locally but breaks in prod, the answer is almost always one of: a path, an env var, a permission, or an assumed dependency that isn't in the deployed environment. Get the AI to enumerate those for you before launch.
- Rule of thumb: if you can't get something deployed in the first weekend, the project will not survive. Deployability is a leading indicator of finishability.

## The last 5% is brutal

*Section purpose: the most relatable failure mode and probably the longest section. Make the reader feel the pain. This is the emotional core of the post.*

### Why it's a problem

- The premise: getting to a working demo is fast. Getting past the first weird bug, when you don't read code, is a wall.
- Why it's specifically brutal without coding experience:
  - You can't read the code to find where the issue lives.
  - You don't know what to ask the LLM, so you describe symptoms and get patches that miss root cause.
  - The LLM hallucinates fixes that "look right" but don't address what's actually wrong.
  - Each fix can introduce new bugs you also can't read.
  - You have no way to instrument, log, or step through what's happening.
- The "it works on my machine" trap: hard to debug a machine you don't really understand. The errors that make sense to a developer ("oh, that's a port conflict") are noise to a non-coder.
- The 95/5 framing: the first 95% takes a weekend; the remaining 5% takes a month, if you finish at all. Most don't.
- Optional: a short anecdote, even one paragraph, of being stuck in a fix loop. Reader will relate.

### What to do about it

- Demand that the AI explain what it just changed, in plain English, before accepting it. If it can't explain in words you understand, the change isn't trustworthy.
- When stuck, give the AI more context, not less. Paste the actual error, the relevant code, and what you've already tried. Vague problem reports get vague (and usually wrong) fixes.
- Use git as your seatbelt. Commit working states often so you can revert when the AI's "fix" makes things worse. (For non-coders: ask the AI to set up version control and explain how to roll back.)
- When you're in a fix loop where every "fix" creates a new bug, stop. The current path is wrong. Roll back to the last working state and try a different approach. Loops compound.
- Build observation tools as you go: print statements, log lines, simple debug pages. The AI can write these in seconds, and they're how you reason about a system you didn't write.

## It works, but it's wrong

*Section purpose: the invisible failure mode. Loud bugs are frustrating; quiet bugs are dangerous. This section exists because non-technical builders have no way to verify that code they can't read actually does what they asked for. Probably the hardest section to make visceral, so lean on concrete examples.*

### Why it's a problem

- The pattern: the AI produces code that passes the eye test. It runs without errors. It returns something. It just returns the wrong something, and you don't know it.
- Examples to make it concrete: a search that silently misses results, a total that's off by a cent, a recommendation engine that surfaces noise, a form that saves to the wrong field, an if-statement with a flipped comparison that only bites in edge cases.
- Why it happens: LLMs pattern-match from code they've seen. Code that looks plausible is their specialty. Code that's actually correct for your spec is a different problem, and they have no way to verify they got it right without external tests.
- Why non-coders are specifically exposed: a developer can spot "wait, that condition is backwards" on a review. A non-coder can only see "the output looks about right." When the output is wrong subtly, it can sit in production for months before anyone notices.
- The real cost: trust erosion. Users who notice wrong outputs stop using the product. Users who don't notice may be harmed (wrong numbers on an invoice, missed search result, bad recommendation). Both are worse than a loud bug.

### What to do about it

- Write your spec in plain English before the AI writes code. *"Given [input], this should return [expected output]."* That sentence is your test case. Without it, you're asking the AI to generate both the thing and the grading criteria, and graders shouldn't grade their own work.
- Ask the AI to generate test cases for you. Even non-developers can read input/output pairs. If the AI's tests match what you wanted, you have confidence. If they don't, you've found a miscommunication early.
- Spot-check outputs against known answers. If your app calculates something, run it against inputs where you already know the answer. If it searches, search for something you know should return.
- Be suspicious of "it worked the first time." Edge cases are where silent-wrong lives. The happy path is easy. Ask the AI to enumerate edge cases, then verify each one.
- When something feels off, trust the feeling. Non-coders often sense wrong-ness before they can articulate why. That instinct is real. Get a second opinion from another model or a developer friend before assuming you're wrong.

## No thoughts on security

*Section purpose: the silent ticking-clock issue. Stakes get real here. This is also the section the AI is structurally worst at, because security is adversarial thinking and the AI is trained to be helpful.*

### Why it's a problem

- The pattern: AI doesn't volunteer security best practices unless asked. Non-technical builders don't know to ask. So projects ship with no defenses by default.
- Common omissions to list briefly: secrets and API keys in client-side code, no input validation, no rate limiting, no security headers, exposed endpoints, default credentials, secrets accidentally committed to git history.
- Stakes framing: it's not "your hobby project gets pwned." It's "you collected real users' emails and just leaked a database." Even small projects often have actual user data the second they go live.
- Why the AI is bad at this: helpfulness and security are in tension. Helpful means "yes, here's the code." Secure means "no, that's the wrong way to do this." The AI defaults to helpful.

### What to do about it

- Add security to the prompt, every time. *"Treat this as production. Validate all inputs. Don't put secrets in client-side code. Use security headers."* Boring but necessary.
- Treat the AI's first pass as insecure until proven otherwise. Then ask the same model to audit its own output for vulnerabilities. It often catches things on review that it didn't volunteer on creation.
- Get a second AI to review what the first one wrote. Different models flag different things.
- Don't collect real user data in a system you don't understand. If you can't explain how data is stored and protected, don't collect it yet.
- Use boring, well-trodden services for the security-sensitive parts: auth providers (Auth0, Clerk, Supabase Auth), payments (Stripe), form handlers (Formspree). They are way harder to mess up than rolling your own.

## Complexity for no reason

LLMs are prone to overbuilding products, as opposed to

*Section purpose: the force-multiplier section. By now the reader has seen four failure modes; this one explains why they're worse than they need to be. Positioning it here lets it act as a unifying "and here's the texture that makes all the above harder" explanation, rather than leading with a problem that's foundational but abstract.*

### Why it's a problem

- The pattern: AI loves abstractions, dependencies, and frameworks. It will happily ship 500 lines when 50 would do, and reach for a stack with five tools when one would cover it.
- Why it happens: more code looks more thorough, and the AI has no incentive to push back on overengineering. There's no feedback loop in the chat that punishes bloat.
- The cost: you can't read it, you can't change it, and every future fix rebuilds the wrong thing. Complexity compounds, and it makes debugging, security, and correctness problems worse.
- Concrete example to anchor the section: a static portfolio shipped on Next.js + Prisma + tRPC because that's what came out, when an HTML file would have done the job.
- Data anchor: GitClear's analysis of 153M lines of code found AI-assisted coding correlates with 4x more code cloning and a drop in refactored code from 25% to under 10% of all changes. Their line: *"AI-generated code resembles an itinerant contributor, prone to violate the DRY-ness of the repos visited."*

### What to do about it

- Tell the AI what *not* to use, up front. Constraints in the prompt are how you avoid default sprawl. *"Vanilla HTML/CSS/JS, no framework, no build step, single file if possible."* The AI will happily comply. It just won't volunteer the constraint.
- Start with the smallest viable version, then add up. Ask for the simplest implementation that meets the requirement. Add complexity only when you hit a wall the simple version can't clear. (Simon Willison recommends this iterative pattern in his "Using LLMs" series.)
- Audit every dependency before you accept it. When the AI reaches for a package, ask *"what does this do that I couldn't write in 10 lines?"* Most of the time the answer reveals you don't need it.
- Push back on the AI's first answer. When it suggests a stack, ask *"what's the simplest version of this that still works?"* The AI defaults to overbuilt. It only simplifies if you make it.
- Treat the AI like a junior dev who needs guardrails. A senior dev would push back on overengineering. The AI won't unless you tell it to. That oversight role is now yours, even if you don't think of yourself as the senior.

## No one will use it

*Section purpose: the meta-problem and the closer. Even if everything above works, you've still built a product nobody knows about. This is the ceiling above all the technical problems, and it's the problem the AI literally cannot help with. Ties back to the thesis (runs vs. product) and sets up the final section.*

### Why it's a problem

- The pattern: vibe coders confuse "I built it" with "people will use it." No distribution plan, no audience, no clear positioning, no idea who it's for or why they'd care.
- The thing the AI literally cannot help with: humans. Product-market fit isn't a code problem. Channels, narrative, audience, retention, all of it lives outside the chat window.
- Why this is the ceiling: even when vibe coding gets to 100% on the technical side, the marketing problem doesn't get smaller. It might get bigger, because more shipped projects compete for the same attention.
- Light touch on your wheelhouse: one or two sentences acknowledging that distribution and discoverability (SEO, content, community, partnerships) are real, learnable skills that take time, and the AI doesn't shortcut them. Don't claim authority. Let the reader connect that this is what you do.

### What to do about it

- Decide who it's for before you build it. If you can't name a specific person who would use this, you don't have a product yet.
- Spend at least as much time on distribution as on the build. The "build it and they will come" trap kills more vibe-coded projects than any technical issue.
- Pick one acquisition channel and do it intentionally: SEO, content, community, partnerships, ads, or PR. Not all six, badly.
- Ship something visible at launch alongside the product itself: a landing page, an explainer post, a demo video. Somewhere people can find and share it. The product alone isn't a marketing asset.
- Talk to actual humans before you build. Five conversations beats fifty hours of building.

## The new bottleneck

*Closing. Tie back to the thesis. One short paragraph, maybe two.*

- The bottleneck moved from "can you write code" to "can you spec what good software needs to be." Most people are getting better at the prompt. Few are getting better at the spec.
- Generous landing: this isn't a reason to not vibe code. It's a reason to know what your project is missing before you ship it. The people who win with this technology are the ones who already know what software requires to exist in the world, and use the AI to skip the typing.

## Research sources

*For reference while drafting. Convert to inline links where you cite a stat or quote, or keep this section at the bottom as a formal references block. Remove this italic note before publishing. All links verified 200 as of 2026-04-23.*

**Primary data sources (cite-worthy stats):**

- [Lightrun: 2026 State of AI-Powered Engineering Report (press release)](https://www.globenewswire.com/news-release/2026/04/14/3273542/0/en/Lightrun-s-2026-State-of-AI-Powered-Engineering-Report-Almost-Half-of-AI-Generated-Code-Fails-in-Production.html). Survey of 200 SRE/DevOps leaders across US, UK, and EU (conducted Jan and Feb 2026, administered by Global Surveyz Research). Source of the 43% of AI code changes requiring production debugging stat. Also: 88% of orgs need 2 to 3 redeploy cycles to verify an AI fix, developers spend 38% of their work week on debugging and verification. Use in: "It only runs on your laptop," "The last 5% is brutal."
- [Veracode: 2025 GenAI Code Security Report (analyst page)](https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/). Analyzed 80 coding tasks across 100+ LLMs. GenAI chose insecure over secure 45% of the time. Java was riskiest (70%+ failure); Python, C#, JavaScript sat between 38 and 45%. LLMs failed XSS prevention 86% of the time and log injection 88%. Models are getting better at accuracy but not at security. Use in: "No thoughts on security."
- [Veracode: 2025 GenAI Code Security Report (full PDF)](https://www.veracode.com/wp-content/uploads/2025_GenAI_Code_Security_Report_Final.pdf). Full report behind the analyst page.
- [GitClear: AI Assistant Code Quality, 2025 research update](https://www.gitclear.com/ai_assistant_code_quality_2025_research). 4x growth in code cloning; refactored code dropped from 25% of all changes (2021) to under 10% (2024). Source of the *"AI-generated code resembles an itinerant contributor, prone to violate the DRY-ness of the repos visited"* line. Use in: "Complexity for no reason."
- [GitClear: Coding on Copilot (2023 data, 2024 analysis)](https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality). Earlier study from GitClear, analyzed 153M lines of code. Good for establishing the trend before the 2025 update.

**Named-incident source:**

- [Autonoma: Vibe Coding Failures, 7 Real Apps That Broke in Production](https://www.getautonoma.com/blog/vibe-coding-failures). Incidents include 1.5 million API keys exposed, unauthenticated users accessing private enterprise data, and wiped production databases. Useful for raising stakes. Use in: "No thoughts on security," "It only runs on your laptop."

**Framing and analytical pieces:**

- [Simon Willison: Using LLMs series](https://simonwillison.net/series/using-llms/). His iterative pattern of starting with the simplest version and building up. Canonical source for that mitigation. Use in: "Complexity for no reason."
- [Stack Overflow Blog: A new worst coder has entered the chat](https://stackoverflow.blog/2026/01/02/a-new-worst-coder-has-entered-the-chat-vibe-coding-without-code-knowledge/). On debugging-without-code-knowledge and the gap between AI output and verifiable correctness. Use in: "The last 5% is brutal," "It works, but it's wrong."
- [The New Stack: AI Code Doesn't Survive in Production](https://thenewstack.io/ai-code-doesnt-survive-in-production-heres-why/). Framing piece on why AI code breaks at deployment. Use in: "It only runs on your laptop."
- [Augment Code: Debugging AI-Generated Code, 8 Failure Patterns and Fixes](https://www.augmentcode.com/guides/debugging-ai-generated-code-8-failure-patterns-and-fixes). Names eight concrete failure patterns (context limitations, training data staleness, happy path bias, concurrency blindspots, etc.). Use in: "The last 5% is brutal," "It works, but it's wrong."
- [DEV: Why AI-Generated Code Breaks in Production, a Deep Debugging Guide](https://dev.to/pockit_tools/why-ai-generated-code-breaks-in-production-a-deep-debugging-guide-5cfk). Deep dive that names the three classic deployment failures: hardcoded localhost URLs, missing env vars, CORS errors. Use in: "It only runs on your laptop."
- [DEV: Vibe Coding Vibe Deployment, the Next Big DevOps Shift](https://dev.to/dev_tips/vibe-coding-vibe-deployment-the-next-big-devops-shift-3fkh). On the emerging "vibe deployment" category of tools. Useful if you want to signal awareness of where the conversation is heading. Use in: "It only runs on your laptop."
- [Builder.io: Limitations of Vibe Coding Tools in 2026](https://www.builder.io/m/explainers/vibe-coding-limitations). Compares the capabilities of Lovable, Bolt, Replit, v0, and Cursor. Use in: "It only runs on your laptop."
- [Kognitos: Why Vibe Coding Breaks in Production](https://www.kognitos.com/blog/why-vibe-coding-breaks-in-production/). Mitigation-focused; leans on SDLC and engineering practices. Use in: any "what to do about it" subsection.
- [Hung-Yi Chen: The Dark Side of Vibe Coding](https://www.hungyichen.com/en/insights/vibe-coding-software-engineering-crisis). General framing on AI code quality crisis and technical debt. Use in: "Complexity for no reason."

**Origin and background:**

- [Wikipedia: Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding). For the Andrej Karpathy origin (February 2025) and canonical definition of the term if you want to anchor it.
