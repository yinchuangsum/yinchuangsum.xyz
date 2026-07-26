---
title: "Test Post — Agent Pipeline Check"
description: "A temporary post verifying the agent drafting pipeline works end to end. It will be removed shortly."
date: 2026-07-26
tags: ["Meta", "Tooling"]
readTime: "1 min"
---

This is a temporary test post. Its only job is to verify that the agent drafting pipeline works end to end: content written on the `staging` branch, validated with `npx astro check`, committed, and pushed to trigger a Cloudflare Pages preview deploy.

The pipeline exists because a workflow you haven't exercised is a workflow you don't actually have. Branch isolation is the publishing gate here — no `draft: true` flags, no half-published state. If this post renders correctly on the preview URL and never touches production, the system works as designed.

This post will be removed shortly. If you're reading it on the live site, something in the gate leaked — which would itself be useful information.
