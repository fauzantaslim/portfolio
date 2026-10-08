---
name: done
description: Finalize the just-reviewed exec task — flip its roadmap checkbox and commit the whole tree (task changes + checkbox) in ONE commit, then stop. Use when the user has reviewed the current task's diff and says it's done. This is the opt-in exec deliberately withholds ("never commit or flip on your own"); running /done IS that go-ahead.
---

# Done

The bookend to `exec`. Exec never commits or flips a checkbox on its own — it hands
the user a dirty tree to review. `/done` is the user saying "reviewed, ship it": flip
the checkbox and commit, **in one atomic commit**, so the box-flip is never a lonely
follow-up. Then stop.

Running `/done` **is** the review sign-off. Don't re-ask "are you sure" — act.

## What it does

1. **Identify the task.** The current task is the one exec just worked — the first
   `- [ ]` in `roadmap.md` whose subject matches the working-tree changes. If the
   match is ambiguous (tree touches files across several unchecked tasks), stop and
   ask which task to close rather than guessing.
2. **Flip the checkbox.** Change that task's `- [ ]` → `- [x]` in `roadmap.md`. If the
   task's `spec-*.md` carries its own matching `- [ ]` for the same task, flip that too
   (some specs track tasks as checkboxes, some as a numbered list — flip only if a
   checkbox exists; don't invent one).
3. **Commit everything, once.** `git add -A` then a single commit covering the task's
   code + doc changes + the checkbox flip.
   - **Message:** if the user passed one (`/done "..."`), use it verbatim. Otherwise
     auto-derive in the repo's convention — check `git log --oneline -5` for the exact
     style. tskit/Vela uses `<area>: task N — <summary>` (e.g.
     `chat-ui: task 3 — landing greeting + composer`); `<area>` is the spec/domain short
     name. Ground the `<summary>` in the actual diff, not just the task title.
   - **One commit.** Never a separate "flip checkbox" commit. If exec already committed
     the code this turn and only the flip remains, `--amend` it into that commit —
     unless that commit is already pushed, in which case make a normal follow-up commit.
4. **Stop.** Report the commit hash + one-line stat, then point to the next unchecked
   task in `roadmap.md`. Do **not** start it.

## Rules

- **Don't push.** Commit only. Push is a separate, explicitly-requested step.
- **Don't branch.** Commit on the current branch (this repo works on `main`).
- **Don't gate on tests/build.** Verification is the user's call (see `testing`); if the
  user hasn't run it and you know a check is red, say so — but still commit if asked.
- **Clean tree after.** `/done` should leave `git status` clean. One task = one clean
  tree, ready for the next `exec`.
- **Nothing to commit?** If the tree is already clean and the checkbox already flipped,
  say so — there's nothing to do.
