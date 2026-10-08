---
name: reflect
description: Review stage, human-in-the-loop. Code review is done by the engineer — the AI advises but does not gate or block. Use after implementation, before merging. Watch for the AI's additive tendency (adding new code or functions instead of removing or reusing) and prune for maintainability, so the codebase stays something a human can keep building on.
---

# Reflect

The engineer reviews the code. This is the stage only a human can own — it keeps
the codebase maintainable and continuable.

## Prune the additive drift

AI tends to *add*: a new function feels lower-risk than touching existing code,
so it accumulates rather than consolidates. Left unchecked the codebase bloats.
So review is largely subtraction:

- **Dedupe.** Did it write something that already exists?
- **Consolidate.** Can two near-identical paths become one?
- **Cut.** Remove what isn't needed. Fewer lines that read clearly beat more
  lines that "just in case."

## Human decides, AI advises

- The AI may *flag* issues by severity — helpful. It does **not** block progress
  or act as a merge gate. You make the call.
- Read the diff yourself. The goal is code you understand well enough to keep
  extending next week.

## Exit

Reviewed and pruned? Hand off to the automation (commit / PR) — the "hands" —
and ship.
