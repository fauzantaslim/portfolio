# Spec: Certificates Orbit (React Bits OrbitImages)

Replace the card grid in `CertificatesSection` with the React Bits **OrbitImages** component:
certificates orbit along an SVG ellipse. Supersedes the card layout from
`spec-certificates-cyber-scroll.md` (data layer, nav links and page wiring stay as they are).

## Decisions

- **Click an item** opens the Fancybox lightbox (full image, next/prev across all certificates). `clickToFront` is off.
- **Card grid removed.** Title / issuer / date show in a center info panel while an orbit item is hovered or focused. The lightbox caption carries title, issuer, date and the `Verify` link.
- **Responsive:** the orbit scales to its container width, so mobile uses a smaller `radiusX` and a larger `itemSize` (rounder, tighter ellipse) instead of a separate layout.
- **Install:** component source taken from the official registry (`https://reactbits.dev/r/OrbitImages-TS-TW.json`, one file, no dependencies) and saved as `components/ui/orbit-images.tsx`. Not added through `shadcn add`, so `components.json` is untouched.

## Design notes

- Theme stays Dark Cyber-Minimalist with full light/dark support: `#1DCD9F` accent, JetBrains Mono, open section layout matching other sections (no dark stage box container).
- Orbit items are square with `object-cover` upstream; certificates are landscape or portrait, so a CSS override in the section sets `object-fit: contain` on `var(--surface)` background to keep the whole certificate visible in both dark and light modes.
- Orbit thumbnails use `getImageProps` from `next/image` (optimized, resized URLs). The lightbox opens the original files.
- `OrbitImages` has no "front item changed" callback, so the info panel follows hover/focus (event delegation on `[data-orbit-item]`), not the item currently at the front. Touch: a tap shows the panel, the lightbox opens right away.
- Fancybox is driven by hidden `data-fancybox` anchors (same pattern as `ProjectImageSlider`); `onItemClick(index)` clicks the matching anchor.
- Reduced motion: handled by the component (speed 0).

## File touch-points

1. `components/ui/orbit-images.tsx`: vendored component (unmodified).
2. `components/CertificatesSection.tsx`: orbit stage, info panel, Fancybox wiring, responsive config; remove the card styles.
3. `docs/roadmap.md`, this spec.

## Tasks

- [x] 1. Vendor `OrbitImages` into `components/ui/orbit-images.tsx`
- [x] 2. Rebuild `CertificatesSection` on the orbit (stage, info panel, Fancybox on click, thumbnails)
- [x] 3. Responsive pass (mobile config via media query) and type check

