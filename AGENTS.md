<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:playbook-workflow -->
# Workflow (playbook)

The engineer drives; the agent assists. Work stays in one main context, in small reviewable
steps, and nothing ships until the engineer has checked it. Skills live in `.agents/skills/`.

## Stages (use only what a task needs, skip freely)

1. `sketch`: brainstorm before any code. Challenge the idea, offer alternatives. No implementation.
2. `shard`: plan into `docs/overview.md`, `docs/roadmap.md`, and one `docs/spec-<feature>.md` per feature. Never one monolithic PRD.
3. `exec`: implement one task at a time from the roadmap.
4. `testing` (optional): write real test cases for logic worth locking down. Do not drive the UI or judge screenshots.
5. `reflect` (optional): review and prune. Flag duplicates and dead code. Advise, never block.
6. `done`: only on the user's `/done`. Tick the roadmap box and commit everything in one commit.

## Cold start

If `docs/roadmap.md` exists, start every session by reading `docs/overview.md` and
`docs/roadmap.md`. Find the first unchecked `- [ ]`, then open only that spec for detail.
The roadmap wins for order; the spec wins for detail.

## Ground rules

- **Keep tasks small.** One task = one reviewable diff that compiles and does something on its own.
- **Never commit, tick roadmap checkboxes, or start the next task on your own.** Build, hand back a dirty tree with a note on how to verify, then stop.
- **Never push or branch** unless asked.
- **UI is the user's call.** Hand UI changes back to be viewed. Don't pilot a browser and guess from screenshots.
- **Main context beats subagents** for implementation. Use a subagent only for throwaway research or a bounded, self-contained problem.
- **Read only what you need.** Overview plus the one relevant spec. Small files over big ones.
- **Edit, don't rewrite.** Prefer targeted edits over `Write` on existing files.
- **Prune.** Reuse or remove before adding new code.
- **The agent advises, the user decides.** Raise concerns, then follow the user's call.
- **Record decisions** in the spec or `overview.md` so they aren't re-decided. Leave unresolved items under `## Open questions` for the user.
<!-- END:playbook-workflow -->
