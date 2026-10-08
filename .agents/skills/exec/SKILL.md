---
name: exec
description: Implementation stage. Build the feature in the main session/context by default; spawn a subagent only when a piece genuinely needs it (research, wide exploration, or a bounded complex sub-problem). Use when executing an approved spec. Read only the overview plus the one relevant spec, prefer Edit over Write, and keep the user in control. Staying in the main context is cheaper and keeps the full accumulated context that makes the work correct.
---

# Exec

Implement in the main context. This is where staying on one thread pays off.

## How

- **Start from `roadmap.md`.** Every session begins by reading `overview.md` plus
  `roadmap.md`, then taking the first unchecked task. That's how a fresh session
  self-orients with no prior conversation: the roadmap is the "what's next" pointer.
- **One spec at a time.** Read `overview.md` plus the single `spec-<feature>.md` the
  current task lives in. Don't drag in unrelated specs.
- **One task per session, not one spec.** The spec is context you re-read cheaply;
  the unit of *work* is a single `## Tasks` item. Do one task, then stop and hand it
  to the user (see **Commit and handoff** for what "stop" means). A whole spec in one
  shot means a long session, a giant diff, and worse output. If a task can't produce a
  small, testable diff, it was really two tasks.
- **Default to the main context.** For the core build, stay on one thread. A subagent
  starts fresh, re-reads files, and returns a result: you pay for context you already
  had, and the main session already holds the design conversation and accumulated state
  that make the implementation better. So reach for one only when a piece genuinely
  earns it (see below), not by default.
- **Edit, don't rewrite.** Prefer targeted `Edit`s. Reaching for `Write` on an
  existing file usually means the change got too broad, so reconsider.
- **Comments are earned, not default.** Don't narrate rationale, business logic, or
  the plan into source — that belongs in the spec/overview (reference it, don't inline
  it). Comment only a *local gotcha* (a maintainer would break this exact line without
  the note) or a *genuinely tricky mechanism* the code can't speak for. Never restate
  what the code already says. Default to no comment; a comment is a maintenance cost
  that rots, so it has to earn its place.
- **User steers.** Move in reviewable steps. Don't disappear for ten changes and
  resurface with a wall of diff.
- **Verify, don't guess.** The spec is a snapshot; the codebase is the truth, so read
  the actual current files a task names before editing. Never lean on guesswork or
  stale memory for anything version-specific: installation steps, CLI flags, config
  keys, or a library or framework's API. Check the official docs, or read the real
  source in `node_modules` (or the vendored dependency) when the docs are thin. If a
  choice isn't written down it wasn't decided, so surface it to the user instead of
  silently picking. Run the task's "done when" before handing it over.

## Commit and handoff

Exec never commits on its own. The uncommitted working tree is the user's review
surface, so leave it there for them.

- **Don't commit until the user says the task is done.** They review the diff first
  (CHANGES in the editor, or `git diff`). "Implemented" is not "done."
- **One task = one clean tree.** Never start a new task while the tree is dirty. Run
  `git status` before starting anything new; if there are uncommitted changes, the
  current task is still open, so finish the review loop and get it committed first.
- **Flip the checkbox only when the user asks.** After the task is committed and the
  user tells you to, change that task's `- [ ]` to `- [x]`. Never flip it on your own.

## Recommend how to verify

Testing and review are optional and the user runs them, not you. But don't hand over
a silent diff. Close each task with a short verification recommendation:

- **Split it: automated vs manual.** For each meaningful change, say whether it's
  worth an automated test (pure logic, parsing, state transitions: clear inputs and
  outputs) or is better checked by hand (wiring, config, one-off glue: where writing
  the test costs more than it's worth). Recommend; don't write them unless asked.
- **Give reproduce steps for the manual ones.** Exact command, route, or click path,
  plus what a correct result looks like. The user should be able to paste and run, not
  reverse-engineer what to check.
- **UI is the user's to test, by hand.** Do not drive a real browser to verify UI.
  Automated browser runs (Playwright and friends) are expensive: they lean on
  screenshots and the agent's visual judgment is unreliable anyway. For anything
  visual, hand it off ("run it, here's the route, here's what to look for") and let a
  person judge how it looks.

## When a subagent *is* right

Reach for one when a piece is bounded and self-contained enough that a fresh context
isn't a handicap: research, exploring an unfamiliar area, a wide search, or a genuinely
complex sub-problem you can hand off whole and keep only the result. The bar is
*isolation*: if the work needs the accumulated context of the main thread, keep it
there. This is a preference for the main context, not a ban on subagents.

## Exit

A task ends when the user has reviewed it and it's committed, not when you finish
editing. Testing and reflect are optional stages the user opts into: recommend what's
worth it (see above), don't gate on them. When the spec is done, point to **`testing`**
and **`reflect`** as available next steps.
