# Spec: Fullstack Rebrand — Copywriting Overhaul

Rebrand Fauzan's portfolio from QA/SDET positioning to **Fullstack Developer** positioning.
No structural or animation changes — only text/copy strings are touched.

## Context

Current branding positions Fauzan as:
- "Software Development Engineer in Test" (SDET)
- Taglines centered on breaking things / QA / testing

New branding positions him as:
- **Fullstack Developer** (primary identity)
- Backend-leaning fullstack (Node.js, Laravel, .NET, REST APIs, DB design)
- Still competent in testing (it's a strength, not the identity)

## Changes by file

### `HeroSection.tsx`

| Location | Current | New |
|---|---|---|
| Role bracket | `Software Development Engineer in Test` | `Fullstack Developer` |
| Hero description | `I break things on purpose — so users don't have to. Also I build backends. Sometimes both happen at the same time.` | `I build full-featured applications — from database schema to polished UI. Always shipping, always iterating.` |

### `AboutSection.tsx`

| Location | Current | New |
|---|---|---|
| Section headline | `"Obsessed with quality & craft."` | `"Obsessed with craft & shipping."` |
| Highlighted word (text-primary) | `quality` | `craft` |
| Body paragraph 1 (role) | `Software Development Engineer in Test` | `Fullstack Developer` |
| Body paragraph 2 | `I walk into the fragile, the untested and the almost-shipped, then break it on purpose so users never have to.` | `I architect backends, connect them to thoughtful frontends, and ship products that actually work — end to end.` |
| Link label | `Explore my technical stack` | `Explore my technical stack` *(no change)* |

### `ExperienceSection.tsx`

Tag categories stay, but the `tagMeta` type can optionally add `"fe"` for frontend entries.
The `experiences` data itself stays — the RS UMMI internship is genuinely backend/fullstack.
The Robinson Mart entry stays as-is (warehouse ops, unrelated to dev).

**No changes needed here.** Data is already accurate for a fullstack/backend role.

### `StackSection.tsx`

Section heading text changes:

| Location | Current | New |
|---|---|---|
| Section eyebrow | `Tech Stack` | `Tech Stack` *(no change)* |
| Section heading | `Technologies I Use` | `Technologies I Use` *(no change)* |

**No changes needed here.** The stack is already fullstack-appropriate.

### `ProjectsSection.tsx`

**No changes needed.** QA categories (`Manual Test`, `Automation Test`, `Bug Reporting`) are kept as-is — testing is a genuine interest and the projects under these categories are real work. Removing them would misrepresent the portfolio.

### `ContactSection.tsx`

| Location | Current | New |
|---|---|---|
| Info paragraph | `Whether you have a question about my QA processes, want to discuss a potential collaboration, or just want to say hi — my inbox is always open.` | `Whether you want to discuss a project idea, a collaboration, or just want to say hi — my inbox is always open.` |

### `Footer.tsx`

| Location | Current | New |
|---|---|---|
| Tagline | `Backend Developer & Software Quality Engineer` | `Fullstack Developer` |

### `Preloader.tsx`

No user-facing copywriting that references QA. Boot lines are generic (`initializing runtime…`, `loading assets…`, etc.). **No changes needed.**

### `Navbar.tsx`

Navigation labels (`Home`, `About`, `Stack`, `Experience`, `Projects`, `Contact`) are section titles, not branding copy. **No changes needed.**

### `ProjectImageSlider.tsx`

This component is a UI utility (image slider), contains no branding copy. **No changes needed.**

## Overview update

After all copy changes are applied, update `docs/overview.md` line 3:
- Current: `Personal portfolio of Fauzan Taslim (full-stack / backend / QA).`
- New: `Personal portfolio of Fauzan Taslim (fullstack developer, backend-leaning).`

## Open questions

*(None — QA is retained as a project interest/category in ProjectsSection and projects-data.ts; branding in Hero/About/Contact/Footer changes to Fullstack Developer).*

## References

- [`components/HeroSection.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/HeroSection.tsx#L301-L314)
- [`components/AboutSection.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/AboutSection.tsx#L243-L346)
- [`components/ContactSection.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/ContactSection.tsx#L328-L331)
- [`components/Footer.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/Footer.tsx#L251-L253)
- [`components/ProjectsSection.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/ProjectsSection.tsx#L13)
- [`lib/projects-data.ts`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/lib/projects-data.ts)

## Tasks

- [x] 1. **HeroSection.tsx** — change role bracket to `Fullstack Developer`; change description.
- [x] 2. **AboutSection.tsx** — change headline to `"Obsessed with craft & shipping."`; update highlighted word to `craft`; update role and body paragraph.
- [x] 3. **ContactSection.tsx** — update info paragraph (remove QA reference).
- [x] 4. **Footer.tsx** — update tagline to `Fullstack Developer`.
- [x] 5. **`docs/overview.md`** — update line 3 to reflect fullstack identity.

