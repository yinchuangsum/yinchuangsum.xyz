---
title: "How I Use OpenCode for My Full Agent Stack"
description: "Cost-effective intelligence without breaking the wallet."
date: 2026-07-24
tags: ["OpenCode", "Agent Stack", "AI Workflows"]
readTime: "6 min"
---

I run a personal knowledge base in Obsidian. I write code, read constantly, and for the past three months I've been running my entire AI workflow on **two OpenCode Go plans (US$20/month total)**.

This isn't a hype piece or a "look at my AI setup" post.

It's the architecture I've settled on, the workflows that make smaller models surprisingly capable, and the sharp edges I still haven't smoothed out.

## The Problem: Manually Maintaining a Knowledge Base

I've been a huge fan of **Obsidian** for years.

The problem wasn't taking notes—it was maintaining them.

I easily spent one or two hours every day reorganising folders, linking notes, cleaning up tags, and trying to keep everything structured. Despite all that effort, I still struggled to maintain a system that stayed organised.

As my vault grew larger, another problem appeared.

I simply couldn't revisit everything I'd written. Valuable ideas were buried under thousands of notes, and manually extracting useful insights became almost impossible.

Eventually, I realised I didn't need another note-taking application.

I needed agents.

## The Two OpenCode Plans

### Plan 1: The Coding Agent

Many developers assume you need the smartest—and most expensive—model for coding.

My experience has been the opposite.

DeepSeek handles the majority of my implementation work just fine. I use stronger models for planning and architecture, then let cheaper models do the actual implementation. With a good workflow, it comfortably codes for more than eight hours a day without any additional API costs.

The real secret isn't the model.

It's the workflow.

The biggest improvement came from Matt Pocock's excellent Skills repository:

https://github.com/mattpocock/skills

Instead of asking:

```text
Help me implement feature X
```

the workflow turns that into a structured development process.

Everything starts with `grill-me` (or `grill-with-docs`).

Rather than jumping straight into code, the AI asks multiple rounds of qlluestions until every implementation detail has been clarified. Most hallucinations happen because requirements are ambiguous, so forcing the planning phase dramatically improves the final result.

Once the requirements are clear, `to-spec` converts the discussion into a proper technical specification.

If the project is large, `to-tickets` breaks the work into smaller dependency-aware tasks. Smaller features can skip this step entirely.

The most interesting part is `implement`.

Instead of writing code immediately, it follows a strict Test-Driven Development (TDD) workflow.

First, the agent writes failing tests.

Only after the tests exist does it start implementing the feature.

This gives the agent a concrete goal from the beginning, instead of writing tests afterwards that simply validate whatever code it already produced.

Finally, a dedicated `code-review` step checks architecture, coding standards, and overall code quality before anything gets committed.

I've found this workflow significantly reduces hallucinations. With a solid process, even relatively inexpensive models become surprisingly capable.

### Plan 2: Remote Agent Runtime & Open Design

Writing code is only part of my job.

As a founder, I also need to:

* keep up with industry news
* maintain my knowledge base
* capture ideas
* build my personal brand
* manage ongoing projects

These tasks were always easy to postpone because they never felt urgent.

I initially experimented with projects like OpenClaw and Hermes. They were both impressive, but I found myself managing multiple applications with a fairly steep learning curve.

Eventually I realised I could build almost everything inside OpenCode instead.

All I really needed was:

* Telegram integration
* a simple cron-based scheduler

For Telegram, I'm using:

https://github.com/grinev/opencode-telegram-bot

Now I have an agent called **Robin**—named after Nico Robin from **One Piece** —that quietly maintains my personal knowledge system.

Robin currently handles:

* extracting daily news to read
* recording daily logs
* maintaining my TODO list
* generating content ideas

The more interesting part isn't automation.

It's knowledge consolidation.

Current workflows include:

* Daydream
* Memory System
* Growth System

I'm even planning to let Robin maintain parts of my personal website and prepare the first draft of future blog posts.

None of these workflows require an extremely intelligent model controlling every step.

What they require is **good skills**.

I think of skills as Standard Operating Procedures (SOPs) for AI agents.

For example, my Daydream skill explicitly tells the agent where daily logs are stored, which folders to read, and how to consolidate only that information.

By reducing the search space, hallucinations become far less common.

In my experience, good workflows improve reliability much more than simply switching to a larger model.

#### Open Design

I've also been using Open Design for architecture discussions and UI prototyping.

For text-based reasoning, it performs surprisingly well, even with DeepSeek.

Its biggest weakness is multimodal reasoning.

Once screenshots, wireframes, or diagrams are involved, the quality drops noticeably.

My workaround is simple.

I first describe the visuals in text.

If I need stronger image understanding, I temporarily switch to models like Qwen or Kimi before returning to OpenCode.

It's not seamless, but it works well enough.

## Sharp Edges

I'm not going to pretend this setup is production-ready.

There are still plenty of rough edges.

### Fragile Scheduled Jobs

The OpenCode scheduler uses `launchd` underneath, which means it depends on macOS timers.

Most of the time it works perfectly.

Until it doesn't.

A sleeping Mac, VPN reconnect, or crashed process can silently stop scheduled jobs.

My daily news pipeline fails roughly once a week.

Eventually I'll build proper health checks and monitoring, but that isn't done yet.

### Weak Multimodal Support

Open Design reasons beautifully with text.

Images are another story.

Whenever screenshots or diagrams become important, I still need to switch models.

Hopefully that improves over time.

## Closing: One Runtime > Best-of-Breed

The biggest shift wasn't using better AI.

It was changing how I think about software.

Instead of asking:

> Which application should I open?

I now ask:

> Which agent should I invoke?

Need a weekly newsletter draft?

Invoke the writing pipeline.

Need a reading digest?

Robin handles it.

Need to build a feature?

Planning → Specification → Implementation.

Need to connect ideas written weeks apart?

Run Daydream.

Every agent shares the same knowledge base.

There's no copy-pasting between applications.

No context trapped inside isolated tools.

No manual integration layer.

The agents become the integration layer.

Is this polished enough for someone who doesn't enjoy tinkering?

Probably not.

The setup still requires an evening of configuration, and some workflows remain fragile.

But if you're a developer or indie hacker who prefers owning your infrastructure instead of renting SaaS integrations, I think it's a trade-off worth exploring.

**Cost-effective intelligence doesn't come from using the most expensive model. It comes from building better workflows.**

```

