# Overview

Personal portfolio of Fauzan Taslim (full-stack / backend / QA). Single-page site made of
sections (Hero, About, Experience, Stack, Projects, Contact) plus a per-project detail page.

## Stack

- Next.js 16.2.1 (App Router) + React 19.2.4 + TypeScript. This Next.js has breaking changes:
  read the relevant guide in `node_modules/next/dist/docs/` before touching Next-specific APIs.
- Tailwind CSS v4 (`@tailwindcss/postcss`), `next-themes` (dark/light), `react-icons/fa6`.
- GSAP ^3.14.2 (`gsap`, plugins imported from `gsap/<Plugin>`, all bundled in the package:
  ScrollTrigger, Draggable, Observer, Flip, ...). `@gsap/react` is **not** installed; the
  existing pattern is `useEffect` + `gsap.context(..., ref)` + `return () => ctx.revert()`.
- No test runner configured. Verify with `npm run lint`, `npm run build`, and manual checks.

## Run

```
npm run dev     # next dev
npm run lint
npm run build
```

## Layout that matters

- `app/page.tsx`: composes sections; `ProjectsSection` is loaded with `next/dynamic`.
- `components/ProjectsSection.tsx`: the Projects section (client component).
- `lib/projects-data.ts`: `Project` type and the `projects` array (currently 11 items).
- `app/projects/[slug]/`: detail page. It already shows description, tech stack, highlights,
  "View Live Site" and "View on GitHub" links, so a card does not need to repeat them.

## Conventions

- Accent color is `#1DCD9F` (`text-primary`). Category colors live in a `categoryColor` map
  (currently duplicated in `ProjectsSection.tsx` and `ProjectDetailClient.tsx`).
- Mono labels use `'JetBrains Mono'`. Short landscape screens are handled with the
  `[@media(max-height:500px)]:` Tailwind variant; keep supporting it.
- Components stay client-side only where animation needs it. Edit existing files, don't rewrite.

## Terms

- **Project**: one entry of `projects` in `lib/projects-data.ts`.
- **Card**: the visual for one project inside the stack. Face = image + title + category badge.
- **Stack**: the whole set of cards of the Projects section, drawn as overlapping layers.
- **Front card**: the card currently on top (the one the user can click). Exactly one at a time.
- **Peek layer**: a card behind the front card that is only partially visible (offset up-right).
  The stack shows the front card plus 2 peek layers = 3 visible layers. Cards beyond that are
  hidden.
- **Filter**: category chip (All / Web / API / ...). Changing it replaces the set of cards.
- **Advance**: move the stack one card forward (front card goes to the back). The stack loops.
- **Detail page**: `/projects/[slug]`.
