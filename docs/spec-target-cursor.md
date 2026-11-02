# Spec: Target Cursor (React Bits)

Site-wide reticle cursor: four corner brackets that snap around interactive elements.

## Decisions

- **Scope:** global, mounted once in `app/layout.tsx` (inside `ThemeProvider`) via `components/SiteCursor.tsx`.
- **Targets:** one central selector in `SiteCursor.tsx`: `a[href], button, [role="button"], [data-orbit-item], .cursor-target`. This covers Navbar/Footer links, hero/contact CTAs, project cards, social links and the certificate orbit items without editing each component. Add `.cursor-target` (and optional `data-cursor-label`) to any other element that should snap.
- **Colors:** `#1DCD9F` idle, white on a target in dark theme, `#0a0a0a` in light theme (white would vanish on `#f4f4f0`). `blendMode="normal"` to keep the cyber palette.
- **Install:** official registry file `https://reactbits.dev/r/TargetCursor-TS-CSS.json`, saved as `components/ui/target-cursor.tsx` + `target-cursor.css`. Only change from upstream: the CSS import path follows the lowercase filename. Its one dependency (`react-dom`) is already installed.

## Behavior notes

- Shown only for a fine, hovering pointer (mouse/trackpad). Touch devices keep the native behavior.
- Reduced motion: the idle spin is disabled by the component.
- The default cursor is hidden while the pointer is in the page (`hideDefaultCursor`).
- Orbit items move along their path, so the reticle follows the locked item until the next pointer movement.
- Form fields (`input`, `textarea`) are not targets.

## File touch-points

1. `components/ui/target-cursor.tsx`, `components/ui/target-cursor.css`: vendored component.
2. `components/SiteCursor.tsx`: props, target selector, theme-aware color.
3. `app/layout.tsx`: mount `<SiteCursor />`.

## Tasks

- [x] 1. Vendor `TargetCursor` into `components/ui/`
- [x] 2. Add `SiteCursor` (selector + theme color) and mount it in `app/layout.tsx`

