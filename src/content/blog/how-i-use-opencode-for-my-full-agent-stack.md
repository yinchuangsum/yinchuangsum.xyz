---
title: "How I Use OpenCode for My Full Agent Stack"
description: "Stitching OpenCode, Open Design, MCP skills, and a Robin agent into a multi-agent personal infrastructure on a $20/mo runtime — with real cost arithmetic and sharp edges."
date: 2026-07-24
tags: ["AI", "Tooling"]
readTime: "7 min"
---

I run a personal knowledge base in Obsidian, I code, I read constantly, and for the last six months I've been running a multi-agent system on **two OpenCode Go plans ($20/mo total)** that replaced about $45–50/mo in SaaS subscriptions.

This isn't a hype piece. It's the architecture, the cost arithmetic, and the sharp edges I haven't smoothed out yet.

## The Problem: Context Doesn't Share

Before this stack, my workflow was a patchwork of point solutions:

- **Obsidian** for notes — daily logs, knowledge base, project scratchpads
- **Todoist** for tasks
- **Readwise** for highlights and reading digestion
- **Cron scripts** for automation (news scraping, backups)
- **Cursor** for coding

None of these tools shared context. My daily notes had no awareness of what I'd bookmarked. My TODOs had no connection to my learning log. My code had no link back to requirements. Every tool was a silo, and **I was the manual integration layer** — copying, pasting, and context-switching between six different UIs.

The core insight: I didn't need better tools. I needed a **single runtime** where agents share state and context, and I just tell one what to do.

## The Three-Layer Stack

### Layer 1: OpenCode Go — The Agent Runtime

Two plans at $10/mo each. This is the orchestration layer. Every agent I've built — Robin, Brewie, code reviewers, blog writers — runs inside OpenCode. It handles session management, file access, tool execution, and the MCP protocol that lets agents call external services.

The key property is **skill composability**. Instead of one monolithic agent trying to do everything, I have small, purpose-built agents that share the same runtime context. Adding a new capability means writing a new skill, not refactoring an existing agent.

### Layer 2: Open Design — Architecture and Design Generation

Self-hosted on **Mac Mini 1** at `mini-1:3000`. This is where architecture happens before any non-trivial code gets written. The flow:

1. I describe the feature in plain language
2. Open Design generates multiple interface designs
3. It grills me on edge cases I hadn't considered
4. I pick a design, it generates the spec, and OpenCode implements from it

This "design-then-build" separation has been the single biggest quality multiplier in my workflow.

### Layer 3: MCP Skills

These are the composable agent capabilities I've built:

- **Brewie** — Requirement elicitation. Runs an interactive interview before any coding session to surface constraints, states, edge cases, and design decisions. Has saved me from building the wrong thing more times than I can count.
- **daily-news** — Fetches the top 10 AI/programming news articles from high-signal sources (HN, arXiv, Hugging Face, Dev.to, OpenAI, MarkTechPost) and writes structured daily digests.
- **daydream** — Mines my vault for non-obvious connections between notes. Samples random note pairs, synthesizes insights, and writes permanent knowledge notes.
- **blog-brainstorm / writing-\*** — A content pipeline that scans daily notes for blog-worthy material, generates ideas, tracks decisions, and shapes raw material into first drafts.

## The Robin Agent: My Knowledge Base Manager

Robin is the most impactful agent I've built. It runs daily and owns the entire knowledge management cycle:

1. **Reads daily news** via `daily-news` — curates top articles into a structured markdown note in the vault
2. **Reconciles my TODO** — reads today's daily note, cross-references with TODO.md, updates task status
3. **Runs daydream insights** — finds connections between notes I would never notice manually
4. **Logs work history** — if I shipped something, Robin records it

Robin replaced three paid services I was running: Readwise ($8/mo), a task management tool ($5/mo), and an automation service ($12/mo). It does all of it **better** because every output lands in the same Obsidian vault. No context silos. No copy-paste.

## Coding Workflow: Grill → Design → Build → Review

This is the loop I use for every non-trivial feature:

1. **Brewie grills me** — Constraints, states, edge cases. Brewie surfaces requirements I would have missed.
2. **Open Design generates architecture** — Interface designs, module boundaries, full spec at `mini-1:3000`.
3. **OpenCode implements** — Small, safe increments driven by the spec.
4. **Code review skill** — Reviews changes against the spec and the repo's coding standards in parallel sub-agents.

I used this loop end-to-end for **MachineIQ**, the capstone project at the Gamuda AI Academy. 99% AI-coded, from architecture review through implementation. The critical discipline was never skipping steps 1 and 2. Every time I shortcut Brewie and jumped straight to code, I ended up rewriting.

## Cost Arithmetic

Here's the real pricing breakdown:

| Item | Cost |
|---|---|
| OpenCode Go × 2 plans | $20/mo |
| Chinese models (DeepSeek, Kimi) for heavy coding | ~$10–15/mo |
| Claude/GPT for multi-modal, complex reasoning | ~$10–13/mo |
| **Total** | **~$40–48/mo** |

The lever is **token routing**. Heavy coding — refactoring, boilerplate, test generation — goes to DeepSeek or Kimi. They're shockingly good for a fraction of the cost. Claude and GPT only get called for tasks they're uniquely suited to: multi-modal reasoning (screenshots, diagrams), complex reasoning chains, and the Brewie interview loop where conversation quality matters.

This routing cuts API spend by about 40–50% compared to running everything on frontier models.

**What it replaced:** Readwise ($8), Todoist ($5), Zapier ($20), plus a handful of smaller subscriptions — roughly $45–50/mo total. The agent stack costs about the same, but it does *more*, and the outputs aren't siloed across six different databases.

## Sharp Edges

I'm not going to pretend this is production-grade. Here's what still breaks:

**Fragile scheduled jobs.** The OpenCode scheduler uses launchd under the hood, which means macOS timers. They work until they don't — a Mac sleep cycle, a VPN reconnect, a process crash on Mini 1. My daily-news job fails silently about once a week. I need a health-check layer I haven't built yet.

**Unpredictable token costs.** Long-running agent sessions burn through tokens faster than expected. A deep daydream run that samples 30+ note pairs can cost $3–4 in a single shot. No monthly cap means the bill is inherently variable.

**Open Design's weak multi-modal.** It can reason about architecture beautifully, but show it a screenshot or a diagram and it struggles. For a tool that sits at the design–code boundary, this is a real gap. I work around it by writing short text descriptions of visuals, but it breaks the flow.

**Knowledge base drift.** Over months, the vault grows large enough that the daydream skill finds fewer novel connections — the signal-to-noise ratio drifts. I've started tagging notes with a "freshness" score and biasing sampling toward less-recently-visited material, but it's a constant tuning problem with no automatic fix.

## Closing: One Runtime > Best-of-Breed

The fundamental shift in my workflow is replacing **"which tool do I open?"** with **"which agent do I invoke?"**

- Need a weekly newsletter draft? Invoke the writing pipeline.
- Need a reading digest? Robin runs it.
- Need to code something? Brewie → Open Design → OpenCode implement.
- Need to connect two ideas from different weeks? Daydream.

The runtime means all these agents share context. The knowledge base is the single source of truth. There's no copy-paste between apps, no context lost in a silo, no manual integration layer that is me.

Is it polished enough for someone who doesn't want to tinker? Not yet. The scheduled jobs are brittle, the cost is variable, and the initial setup requires an evening of configuring MCP endpoints. But if you're a developer or indie hacker who wants to own your own infrastructure instead of renting tool integrations, the ROI is immediate.

**One runtime, many agents, no context loss.**
