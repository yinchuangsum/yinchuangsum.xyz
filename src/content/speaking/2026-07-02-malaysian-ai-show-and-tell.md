---
title: "Malaysian AI Show & Tell — July 2, 2026"
description: "The Malaysian AI Show & Tell is a regular community gathering where builders share what they're working on. Here's what I demo'd at the July 2 edition and why you should join the next one."
date: 2026-07-02
location: "Malaysian AI · Kuala Lumpur, MY"
category: "past"
tags: ["AI", "RAG", "Document Extraction"]
virtual: false
secondaryAction:
  label: "Event Page"
  href: "https://luma.com/dht6mvpw"
  variant: "ghost"
---

Malaysian AI Show & Tell is a community gathering where ML engineers, founders, and AI tinkerers show what they're building. No slides, no sales — just demos and honest discussion. If you're building with AI in Malaysia, you should join the next edition. It's the kind of meetup where you walk away with real takeaways, not just swag.

![](/assets/speaking/2026-07-02-malaysian-ai-show-and-tell/khalil-the-future-is-solo.jpeg)
*Khalil, founder of The Future Is Solo, sharing his work.*

I showed how [Pigeonbook](https://www.pigeonbook.co/) handles large bank statement extraction — chunking strategies, OCR pipeline, and structured output from messy PDFs. The demo looked clean. In short, large files will takes too long and also faces very large context size while performing extraction. Chunking is a must. Naive chunking split a single running balance across two chunks and the LLM hallucinated the gap. The fix was a pre-chunk merge pass that detects spanning tables by column header repetition.

The lesson: for LLMs, structure at ingestion time is worth more than prompting at inference time.

Three things I walked away wanting to research:

1. **AGUI (Agent GUI)** — most signal. Agent-driven browser UIs solve the same problem we hit: unstructured data that needs structure applied by an agent, not a parser. Directly relevant to extraction pipelines.
2. **ARD spec** — speculative but worth watching. Standardising agent resource discovery could reduce the glue code we write per integration.

![](/assets/speaking/2026-07-02-malaysian-ai-show-and-tell/agui-ard-speaker.jpeg)
*A builder I met demo'd AGUI and the Agentic Resource Discovery spec in action.*

3. **Socratic method for AI education** — intriguing but unproven at scale. The idea (iterative questioning instead of answer-dumping) makes sense for 1:1. Need to test it myself before endorsing.

![](/assets/speaking/2026-07-02-malaysian-ai-show-and-tell/valearnis-founder-socratic-ai.jpeg)
*The Valearnis founder showed how AI can teach young kids using the Socratic method.*

If you like being around people who build real things with AI, the Malaysian AI community is worth joining. Events are posted on [Luma](https://luma.com/dht6mvpw). Come show what you're working on — or just watch and ask questions.
