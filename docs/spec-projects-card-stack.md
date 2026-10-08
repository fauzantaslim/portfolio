# Spec: Projects card stack

Replace the pinned, scroll-scrubbed project list in `components/ProjectsSection.tsx` with a
swipeable, looping **card stack** driven by GSAP. Why: with 11+ projects the pin consumes ~10
screens of forced scroll; the user wants control over browsing and a fixed section height.

## Behavior

- Section height is constant regardless of project count. No `pin`, no `scrub` for the stack.
- The stack shows the front card + 2 peek layers, offset diagonally up-right with slightly
  smaller scale for deeper layers. Layers beyond the 3rd are hidden (same pose as the 3rd,
  `opacity: 0`).
- **Advance (next)**: front card animates out (slides/rotates away, fades), then drops to the
  back; the other cards move one layer forward. **Previous** is the reverse. The stack loops
  (after the last card comes the first).
- **Input**: swipe/drag only (decided; no Prev/Next buttons). Dragging past a distance/velocity
  threshold advances; releasing short of it springs back. Dragging left = next, right = previous
  (confirm direction when building).
- **Safety nets that add no visible UI**: `ArrowLeft` / `ArrowRight` keys advance when the stack
  has focus or is in view; a counter `03 / 11` and a small "drag / swipe" hint tell the user it
  is interactive.
- **Click** on the front card goes to `/projects/[slug]` (`next/link`). A drag must never trigger
  this navigation; a plain click/tap must.
- **Card face**: project image (`images[0]`), title, category badge. Description, tags, and the
  Live/GitHub links are removed from the card (they already exist on the detail page).
- **Filter**: chips stay. Changing filter rebuilds the stack from the first (newest) project with
  a short enter animation. Order stays `projects.slice().reverse()` (newest first).
- Header entrance animations (eyebrow, headline, filter chips) are kept for now; see open question.

## Edge cases

- 0 projects for a filter (Automation Test, Bug Reporting today): show an empty-state message,
  no stack, no listeners.
- 1 project (Manual Test today): show the single card, disable drag and keys, hide the hint.
  Counter reads `01 / 01`.
- 2 projects: only 1 peek layer exists; layout must not assume 3.
- Rapid input: ignore new advances while one is animating (or queue at most one).
- Filter change mid-animation: kill running tweens before rebuilding.
- Window resize / orientation change: recompute offsets without a page reload (use
  `gsap.matchMedia()`); keep the same front card.
- `prefers-reduced-motion`: no flying/rotation; cross-fade or instant swap only.
- Cards behind the front card must be non-interactive: set `inert` (and `aria-hidden`) on them so
  keyboard and screen readers never reach hidden links.

## Responsive

- Offsets are percentages of card size or CSS variables, never fixed px, so one layout logic works
  at all widths.
- Mobile portrait: card is taller than wide, peek offset smaller. Desktop: card is landscape.
  Exact ratios: see open question.
- Short landscape (`max-height: 500px`): card must fit the viewport height, peek layers shrink or
  drop to 1.
- Touch: `touch-action` must allow vertical page scroll while capturing horizontal drag
  (`pan-y`), otherwise users get stuck scrolling past the section.

## Accessibility

- Stack container: `role="region"` with an accessible name and `aria-roledescription="carousel"`.
- Counter in an `aria-live="polite"` region announcing "Project 3 of 11: <title>".
- Visible focus style on the front card link.
- Reduced motion honored (see edge cases).

## File touch-points

- `components/ProjectsSection.tsx`: main change (remove pin/scrub timeline, parallax, dimmer,
  large text overlay; add stack, drag, keys, counter). Keep filters and header.
- Possibly a small new component file only if `ProjectsSection.tsx` becomes unwieldy
  (e.g. `components/ProjectCardStack.tsx`); decide when the first task shows its real size.
- No changes to `lib/projects-data.ts` or the detail page.
- Cleanup: drop unused imports (`FaGithub`, `FaBookOpen`, `FaArrowUpRightFromSquare`) and
  `ScrollTrigger` only if the header reveal is also removed.

## References

- Visual reference: GSAP demo "Card stack" (https://demos.gsap.com/demo/card_stack/): stacked
  cards with edges peeking, counter in the center.
- Skills in `.agents/skills/`: `gsap-core`, `gsap-plugins` (Draggable, Observer),
  `gsap-react` / `gsap-frameworks` (cleanup), `gsap-timeline`, `gsap-performance`,
  `accessibility`.
- Verify in code before building: `node_modules/gsap/dist/Draggable.js`, `Observer.js`.
- Existing component: `components/ProjectsSection.tsx` (current pin/scrub implementation).
- Detail page that keeps the links: `app/projects/[slug]/ProjectDetailClient.tsx` (CTAs at the
  "View Live Site" / "View on GitHub" block).

## Open questions

- Card aspect ratio on desktop: landscape (e.g. 16:10) or more upright like the demo? Default
  assumption until answered: landscape on desktop, upright on mobile portrait.
- Keep the scroll-triggered header reveal (eyebrow/headline/filters)? Default assumption: keep.
- Direction of drag for next: left = next. Confirm when it can be felt in the browser.
- Concern raised and left to the user: no visible buttons hurts discoverability on desktop; keys,
  counter, and hint are the mitigation. Buttons can be added later cheaply.

## Tasks

- [x] **1. Static stack layout.** Replace the pinned container with a stack of cards (front card
  + 2 peek layers, diagonal offset, card face = image + title + category badge, whole front card
  links to the detail page), counter `NN / NN`, and empty-state. Remove the pin/scrub timeline.
  No motion yet; `activeIndex` is React state, filter change resets it.
  Touch-points: `components/ProjectsSection.tsx`.
  Done when: Projects section renders the stack at desktop and mobile widths, no pinning/long
  scroll, filter chips work, clicking the front card opens its detail page, `npm run lint`
  passes.
- [x] **2. Advance animation + keyboard.** GSAP `goTo(direction)` that animates the front card
  out and shifts layers, loops, ignores input while animating; wire `ArrowLeft`/`ArrowRight`.
  Cleanup via `gsap.context`. Touch-points: `components/ProjectsSection.tsx`.
  Done when: arrow keys cycle through all projects and loop with smooth motion, and rapid key
  presses cause no glitches or stacked tweens.
- [x] **3. Swipe/drag.** Add drag/swipe (Draggable or Observer, choose after reading both) with
  distance/velocity threshold and spring-back, `touch-action: pan-y`, and guard so a drag never
  triggers the card link. Touch-points: `components/ProjectsSection.tsx`.
  Done when: swiping with mouse and touch advances/goes back, short drags spring back, vertical
  page scroll still works on touch, and a plain click still opens the detail page.
- [x] **4. Filter transition + edge cases.** Animated rebuild on filter change (kill tweens
  first), 1-card mode (drag/keys/hint off), 2-card layout, 0-card empty state.
  Done when: every filter chip gives a correct stack or empty state without console errors.
- [x] **5. Responsive pass.** `gsap.matchMedia()` offsets/ratios for mobile portrait, tablet,
  desktop, and short landscape (`max-height: 500px`); recompute on resize/orientation.
  Done when: no clipping or overflow from 320px wide to ultrawide and in short landscape.
- [x] **6. Accessibility + reduced motion.** `inert`/`aria-hidden` on non-front cards, region
  roles, `aria-live` counter, focus style, `prefers-reduced-motion` fallback, "drag / swipe"
  hint. Done when: keyboard reaches only the front card, screen-reader text announces position,
  and reduced-motion users get no flying cards.
- [x] **7. Cleanup.** Remove dead imports/styles/classes left by the old pinned version; keep or
  drop header ScrollTrigger per the open question. Done when: `npm run lint` and `npm run build`
  pass and no unused code from the old implementation remains.
