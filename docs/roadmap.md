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
- [x] 6. Accessibility + reduced motion (`inert`, aria-live, hint)
- [x] 7. Cleanup of the old pinned implementation

## About Section Decode: `docs/spec-about-section-decode.md`

- [x] 1. Custom Scramble Hook/Utility
- [x] 2. Apply Decode to Headline & Image Reveal
- [x] 3. Terminal Reveal for Body
- [x] 4. Polish & A11y (reduced motion, screen readers)

## Hero Cursor Journey: `docs/spec-hero-cursor-journey.md`

- [x] 1. Add Giant Cursor to Hero Section
- [x] 2. Setup Cross-Section ScrollTrigger
- [x] 3. Shard portrait WebGL component (three.js)
- [x] 4. Wire up About canvas/photo layers + retarget Hero timeline
- [x] 5. Polish (resize, mobile, pause offscreen, reduced motion)

## Contact Email API (Resend): `docs/spec-contact-email-api.md`

- [x] 1. Install `resend` and create `app/api/contact/route.ts` with validation, Resend dispatch, and `.env.example`
- [x] 2. Update `components/ContactSection.tsx` to call `/api/contact` with loading, success, and error UI states
- [x] 3. Bump Next.js to safe version (16.4.3) and verify build (`npm run build`)

## Contact Form Protection: `docs/spec-contact-protection.md`

Starts only after the Contact Email API section above is fully done (Next.js bump first).

- [x] 1. Honeypot field + subject newline sanitization
- [x] 2. Per-IP rate limit with Upstash (3 / hour / IP, fail-open)
- [x] 3. Cloudflare Turnstile end-to-end (invisible widget + server siteverify, fail-closed)
- [x] 4. Deploy checklist in `README.md` (Vercel env vars, hostname restriction, WAF)

## Fullstack Rebrand — Copywriting: `docs/spec-fullstack-rebrand.md`

Reposition the portfolio from QA/SDET to Fullstack Developer across all sections.

- [x] 1. HeroSection: role → "Fullstack Developer", update description
- [x] 2. AboutSection: headline, highlighted word, role, body paragraph
- [x] 3. ContactSection: remove QA mention from info paragraph
- [x] 4. Footer: tagline → "Fullstack Developer"
- [x] 5. docs/overview.md: update identity description
