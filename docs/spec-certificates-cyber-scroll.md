# Spec: Certificates Section (Cyber-Scroll)

Add a new interactive section **Certificates** placed directly after `ProjectsSection` and before `ContactSection`. The certificates are rendered as **Cyber-Scrolls**: futuristic digital parchment scrolls that unroll on click/tap to reveal the certificate preview image, title, and issuer.

## Context & Visual Identity

- **Theme Alignment:** Dark Cyber-Minimalist (`#0a0a0a` / `#050505` background, `#1DCD9F` neon emerald accent, JetBrains Mono typography, scanline / circuit texture).
- **Metaphor:** High-tech digital scrolls / cyber credentials.
  - **Collapsed State (Rolled):** Appears as a sleek horizontal titanium/cyber cylinder with end-roller caps, glowing neon rings, certificate title, issuer badge, and a `[ UNROLL SCROLL ▼ ]` prompt.
  - **Expanded State (Unrolled):** The cylinder unrolls downwards (top cap stays anchored, bottom cap glides down). The canvas unfurls like digital parchment with scanline borders, revealing:
    - High-resolution certificate image (with hover zoom / lightbox or clean frame)
    - Full certificate title & issuer
    - Optional credential verification button or modal preview
    - `[ ROLL UP ▲ ]` collapse trigger
  - **Multi-scroll Behavior:** Independent toggle (user can unroll multiple or close individual scrolls).

## Data Model (`lib/certificates-data.ts`)

```typescript
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  issueDate?: string;
  credentialUrl?: string;
  tags?: string[];
};

export const certificates: Certificate[] = [
  // Initial structured items with title, issuer, image
];
```

## Animation & Mechanics

- **Cyber Roller Caps:** Top and bottom caps styled with metallic gradient, hexagonal/circuit borders, and `#1DCD9F` neon end-knobs.
- **Unroll Motion:**
  - CSS / GSAP height & clip-path transition (`grid-template-rows: 0fr -> 1fr` or `max-height` with GSAP ease `power3.out`).
  - Roller rotation animation (subtle CSS transform rotate on the roller edge during unfurl).
  - Unfurling parchment background: dark carbon with subtle glowing grid pattern and scanline overlay.
- **Prefers-reduced-motion:** Instant expand/collapse with simple opacity fade.

## File Touch-Points

1. `lib/certificates-data.ts`: Data structure and certificates list (name, issuer, image).
2. `components/CertificatesSection.tsx`: Client component containing section container, header, grid of Cyber-Scroll cards, and unrolling state logic.
3. `components/Navbar.tsx`: Insert `{ label: "Certificates", href: "#certificates", idx: "05" }` and update following indices.
4. `components/Footer.tsx`: Insert `{ label: "Certificates", href: "#certificates", idx: "05" }` and update following indices.
5. `app/page.tsx`: Import `CertificatesSection` dynamically and place between `<ProjectsSection />` and `<ContactSection />`.
6. `docs/overview.md`: Add Certificates to sections list and Terms.

## References

- [`components/ProjectsSection.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/ProjectsSection.tsx)
- [`components/Navbar.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/Navbar.tsx)
- [`components/Footer.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/Footer.tsx)
- [`app/page.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/app/page.tsx)

## Tasks

- [x] 1. **Data Layer (`lib/certificates-data.ts`)**: Create TypeScript interface and certificates data array.
- [x] 2. **Cyber-Scroll Component (`components/CertificatesSection.tsx`)**: Build the section and Cyber-Scroll card with collapsed cylinder state, roller caps, and expand/unroll layout.
- [x] 3. **Unrolling Animation & Interaction**: Implement the smooth cyber-unfurl animation (roller motion + parchment expansion + roll up toggle) and reduced-motion fallback.
- [x] 4. **Page & Navigation Integration**: Mount `CertificatesSection` in `app/page.tsx`, and add `#certificates` link in `Navbar.tsx` and `Footer.tsx`.
- [x] 5. **Polish & Verification**: Mobile responsiveness pass, keyboard navigation (`Enter`/`Space` unroll), lint, and type check (`tsc --noEmit`).

