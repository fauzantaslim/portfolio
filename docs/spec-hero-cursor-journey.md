# Spec: Hero to About Cursor Journey

## Objective
A scroll-linked narrative: a giant cursor in the `HeroSection` travels down the page with the
scroll. On reaching the profile photo in `AboutSection`, it shatters into thousands of 3D
"shards" that re-assemble into the profile photo, then crossfades to the real photo.

## Decisions (pivot, 2026-10-09)
- **Supersedes** the original "Glitch & Snap into `.terminal-cursor`" plan. The user's reference
  images show a shard/voxel dispersion that forms the portrait, not a text cursor.
- **Flow (A1):** DOM cursor overlay flies Hero -> photo wrapper. One WebGL canvas lives inside
  `.about-img-wrapper`; at handoff the cursor SVG fades out and the canvas (shards arranged as
  the same cursor shape) fades in, then shards disperse and settle into the photo.
- **Style (A2):** thin slanted 3D bars, brightness driven by photo luminance, tinted with the
  site's `primary` teal (not purple like the reference).
- **Tech:** `three` (raw, no R3F) + `@types/three`. One `InstancedMesh` + custom shader.
  Raw three chosen over R3F: one canvas, one scalar driver, no React reconciler needed.
- **Decoupling:** `lib/portrait-progress.ts` exports a mutable `{ value }` (0 cursor -> 1 photo).
  The Hero scroll timeline tweens it; the canvas reads it every frame.
- **Fallback:** reduced motion or no WebGL -> no canvas, real photo stays visible, cursor
  still flies and fades.

## Timeline (one scrubbed GSAP timeline in `HeroSection`)
Scroll range: top of page -> `.about-img-wrapper` centre reaches viewport centre.
- 0.00-0.60 cursor travels to wrapper centre and scales to match the canvas cursor.
- 0.60 handoff: cursor SVG opacity -> 0, `.about-shard-canvas` opacity -> 1.
- 0.60-0.92 `portraitProgress.value` 0 -> 1 (shards disperse and form the photo).
- 0.90-1.00 canvas fades out, `.about-photo-layer` (real photo) fades in.

## Tasks
- [x] 1. Add Giant Cursor to Hero Section (static markup and styling).
- [x] 2. Setup Cross-Section ScrollTrigger (cursor flight).
- [ ] 3. Shard portrait WebGL component (`components/ui/shard-portrait.tsx`) driven by `portraitProgress`.
- [ ] 4. Wire it up: AboutSection canvas layer + photo layer, Hero timeline retargeted to the photo wrapper.
- [ ] 5. Polish: resize, mobile instance count, visibility pause, reduced motion, cleanup.

## Open questions
- Cursor grows ~3x while travelling (to fill ~60% of the photo box). Tune after viewing.
