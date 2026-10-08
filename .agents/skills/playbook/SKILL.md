---
name: playbook
description: Nauval's controlled, cost-aware feature-development workflow. Use at the start of any non-trivial build, or when the user wants to plan and ship a feature deliberately instead of handing control to an autonomous multi-agent pipeline. Routes to the right stage — sketch (brainstorm) → shard (plan) → exec (implement) → testing → reflect (review) — and sets the ground rules that keep the process cheap and human-driven.
---

# Playbook

The engineer drives; the tools assist. This workflow keeps you in control, keeps
the process in one main context, and keeps token cost low. It is deliberately
minimal — use only the stage you need, when you need it.

## First principle: tools follow you, not the reverse

- **Hands, not head.** Automation and integrations (git, PRs, Figma, deploys)
  are welcome — they execute *your* decisions faster and cleaner. Tools that try
  to dictate *how you think or sequence work* are not. You already have a process.
- **Knowledge skills are safe; workflow skills are personal.** A skill that wraps
  vendor docs/APIs is fine to reuse. A skill that wraps a *process* should be
  yours, because everyone works differently. This playbook is that — yours.

## The five stages

Reach for a stage only when it earns its place. Skip freely.

1. **`sketch`** — brainstorm. You bring the idea; the AI pushes back, offers
   alternatives, and sketches what a good design looks like. No code yet.
2. **`shard`** — plan. Turn the concept into a small `overview` file plus
   separate per-feature spec files. Never one giant PRD.
3. **`exec`** — implement. Build in the main context by default; use a subagent only
   for a bounded, self-contained piece (research, exploration, a complex sub-problem).
   Read only the spec you need. Edit, don't rewrite.
4. **`testing`** — verify. Write test *cases* that exercise code/commands.
   Don't have the agent pilot the UI and eyeball screenshots.
5. **`reflect`** — review. A human reviews the code. The AI flags, it does not
   gatekeep. Prune the AI's additive tendencies for maintainability.

## Cost rules that apply everywhere

- **Main context beats subagents for core work.** A subagent copies context,
  runs in its own window, and returns a result — net-new tokens. Worth it for
  throwaway *explore/research* (bounded output, protects main context), not for
  implementation where you *want* accumulated context.
- **Small files beat big ones.** Cheaper to read, cheaper to edit, cache-friendly.
- **Edit beats Write.** Large rewrites push the model to Write the whole file.
- **Don't let the AI be a gate.** It advises; you decide.
