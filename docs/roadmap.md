# Roadmap

**Cold start:** read `docs/overview.md`, find the first unchecked `- [ ]` below, then open only
that spec for detail. This file wins for order; the spec wins for detail. Tick a box only on
the user's `/done`.

## Projects card stack: `docs/spec-projects-card-stack.md`

Order is a walking skeleton: the new look first, then motion, then input, then hardening.
Persistence is not involved. Every task leaves the tree compiling.

- [x] 1. Static stack layout (front card + 2 peek layers, counter, empty state, pin removed)
- [x] 2. Advance animation + keyboard arrows (loop, input lock)
- [x] 3. Swipe/drag with threshold and click-vs-drag guard
- [x] 4. Filter transition + 0/1/2-card edge cases
- [x] 5. Responsive pass (`gsap.matchMedia`, mobile, tablet, short landscape)
- [ ] 6. Accessibility + reduced motion (`inert`, aria-live, hint)
- [ ] 7. Cleanup of the old pinned implementation
