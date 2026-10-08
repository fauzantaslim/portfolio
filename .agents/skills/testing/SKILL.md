---
name: testing
description: Testing stage. Prefer writing test CASES — unit tests, or scripted e2e cases — that exercise code and commands, rather than having the agent manually pilot the UI. Avoid loops where the agent drives Playwright and eyeballs screenshots to judge correctness: its visual judgment is unreliable and screenshots are expensive. Use when verifying a change. Leave visual/UX judgment to a human.
---

# Testing

Make the test do the judging, not the agent's eyes.

## Prefer

- **Write the cases first.** Unit tests for logic; for e2e, script the *case*
  (the steps and expected outcomes) so what runs is code, not improvisation.
- **Let the runnable test be the verdict.** A passing/failing assertion is
  deterministic. An agent's read of a screenshot is not.

## Avoid

- **Agent-as-QA loops.** Having the agent open Playwright, click around, take
  screenshots, and decide "looks right." The visual judgment drifts, and each
  screenshot is real token cost.
- **Manual piloting where a scripted case would do.** If you can express it as an
  automated case, do — then it's repeatable and cheap.

## Leave to humans

Visual polish, UX feel, "does this look right" — a person checks those. Tests
guard behavior; people guard experience.

## Exit

Green and behavior locked? Move to **`reflect`**.
