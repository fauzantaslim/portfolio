---
name: shard
description: Planning stage. Turn an approved concept into planning docs, but never one monolithic PRD. Produce a small overview file plus separate per-feature spec files, so that implementation reads only the spec it needs. Use when planning a build. This structure is cheaper to read, cheaper to edit, and cache-friendly compared to a single large document.
---

# Shard

Split the plan into pieces. One giant PRD is expensive: to implement one feature
the agent must read the whole thing, and any sizable edit tempts the model to
rewrite the entire document with Write. Small files avoid both.

## Structure

```
docs/
  overview.md          # foundational, read almost always
  roadmap.md           # ordered work queue + cold-start pointer ("do this next")
  spec-<feature-a>.md  # technical detail for one feature
  spec-<feature-b>.md
  ...
```

### overview.md, the foundation

Keep it short and stable. What the project is, the problem/background, tech
stack, how to run it, key scripts, routines/conventions. This is the file every
stage can cheaply pull for context.

Include a **`## Terms`** (glossary) section: the domain words this project uses
and what each one means *here*. Many terms are context-loaded and mean different
things in different projects, and a silent mismatch turns into wrong code. Building
a course platform? Define what a "course" is, and how it differs from a lesson, a
module, an enrollment. Building an AI feature? Say which "streaming" you mean (token
streaming from a model, not video streaming). Pin down every term a reader could
reasonably take two ways, so `exec` and every later session share one vocabulary
instead of each guessing its own.

### roadmap.md, the cold-start pointer

One ordered checklist that flattens every spec's tasks into the exact execution order
(dependencies respected, any de-risking spikes first). A fresh session with zero prior context
reads `overview.md` + `roadmap.md`, finds the first unchecked `- [ ]`, opens that spec for detail,
and knows exactly what to do, with no re-explaining "what's next." State the cold-start protocol at
the top; this file wins for *order*, the spec wins for *detail*. Keep it in sync as tasks complete.

**Order by walking skeleton, not by layer.** Sequence the tasks so the thinnest end-to-end slice of
the core value ships first — the thing the user actually came for, working, before the layers around
it. Don't front-load foundations (auth, admin, metering, config UI) just because they feel like
"the base"; building a course app, you shape the course-and-lesson core before the login page. The
skeleton keeps its *load-bearing runtime path real* (the code the feature can't stream/run without)
and lets *cross-cutting/management layers wait* (metering, quotas, admin CRUD). The rule that makes
deferring cheap instead of rework: **keep the seams real, stub the bodies** — when the skeleton needs
a not-yet-built foundation, wire its call-site in *with the real signature* as a no-op (a
`recordUsage()` that writes nothing, an `assertCanCall()` that always allows) and call it from the
real spot. A later task fills the body — one file, no surgery on the hot path. Defer a foundation
freely; never defer its call-site. A good roadmap often splits its first wave into *skeleton* then
*backfill* on exactly this line.

**Persistence is a deferrable layer — the database is almost never part of the first slice.** This is
the trap that survives even a "skeleton first" instinct, because a schema *feels* like bedrock you
must lay before anything stands on it. It isn't. Apply this test to the core feature: **would it
work, end-to-end, with storage stubbed out — ephemeral, in-memory, gone on refresh?** For most
features the answer is yes, and that ephemeral version *is* milestone one. A chatbot streams,
renders, switches models, and is fully usable with **zero** database — the schema, the CRUD, the
save/load sync only make an already-working thing *durable*. So the DB-free usable slice ships first;
persistence is a **backfill wave**, sequenced *after* the feature is demoable, not before it exists.
Concretely when sharding: do not put "schema + migration" or "CRUD services" as task 1 of a
feature whose value is a live interaction — that ordering forces N storage tasks before a single
visible result, which is precisely the layer-first mistake wearing a data-model costume. Split any
task that welds the runtime path to persistence (e.g. "streaming endpoint **+ save to DB**") into a
stream-only task (skeleton) and a sync task (backfill); the endpoint that streams must not also be
the endpoint that writes, or you can't ship one without the other. State the tradeoff honestly in the
skeleton wave — "a refresh loses the session; persistence lands in wave 1b" — so it reads as a
deliberate sequencing choice, not a missing feature.

### spec-<feature>.md, one per feature

The technical detail for a single feature: behavior, data shapes, edge cases,
acceptance criteria, file touch-points, and a `## References` block (doc URLs +
real file paths to verify against, so `exec` checks reality instead of guessing).
Building feature X? The agent reads `overview.md` + `spec-x.md` and nothing else.

End every spec with a `## Tasks` section: an ordered checklist of atomic steps,
each about one reviewable commit-sized diff, naming its file touch-points and a
"done when." The spec is the *context*; the tasks are the reviewable execution
ladder that `exec` walks one at a time. Use `- [ ]` checkboxes so progress is
trackable in the file and in git.

## Rules

- **One feature, one spec.** Don't bundle five features into one file.
- **Keep specs self-contained** but let them lean on `overview.md` for shared
  facts instead of repeating them.
- **Prefer many small edits later** over one big rewrite. Files sized for `Edit`,
  not `Write`.
- **Every spec ends with `## Tasks`.** Size each task as the smallest *coherent slice
  that stands on its own*: it compiles, it's reviewable, and it actually does something.
  Too big is a whole feature at once (client + server + DB + history). Too small is a
  fragment that can't stand alone: a streaming chat endpoint and the client call that
  consumes it are *one* task, because the server handler is nothing without a caller and
  neither half is testable alone. So when two halves only work together and the pair is
  still small, keep them together instead of splitting a producer from its only consumer.
  This isn't a push to bundle, though: plenty of tasks are genuinely one small thing, and
  a cohesive pair that is itself large still gets split. Merge only when the halves are
  useless apart *and* the pair stays small; split across a seam when each side is
  independently useful, or when one side is a deferrable layer stubbed behind a real seam
  (see the skeleton/backfill note). One `exec` session should finish, test, and review a
  task, leaving the tree compiling.
- **Write down what was decided.** Everything settled during sketch/planning goes into
  the spec or `overview.md` so `exec` never re-decides it. Leave only genuinely-unresolved
  items under a spec's `## Open questions` (for the user, not for the agent to guess). Cite
  the sources behind decisions, a `## References` block with doc URLs and real file paths,
  so `exec` can verify against reality instead of guessing.
- **Wire cold-start into the project's instructions file.** After writing the docs, add a short
  pointer to the project's always-loaded agent-instructions file (`CLAUDE.md`, or `AGENTS.md` if
  `CLAUDE.md` symlinks to it) naming the plans folder and telling every session to start from
  `roadmap.md`. That file loads into *every* session automatically, so it is what lets a fresh
  agent find the plans *before* `exec` is even invoked. The roadmap is the map; this pointer is
  the signpost to it.

## Exit

With overview + specs written, move to **`exec`** to implement one spec at a time.
