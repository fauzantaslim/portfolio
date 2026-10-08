# Spec: About Section Decode Animation

## Objective
Revamp the `AboutSection.tsx` animations to align with the "Modern Tech / Sleek Developer" aesthetic of the portfolio. Introduce a cyber/decryption text effect for the headline and a terminal-style reveal for the body paragraphs, replacing the generic text reveals.

## Context
The current portfolio aesthetic leans heavily into a clean, modern developer vibe with `JetBrains Mono`, cyan/emerald accents, and glassmorphism. The `AboutSection` currently uses standard GSAP transforms that feel a bit plain. We will build a custom JS decryption effect (scrambling characters before settling on the real text) triggered by ScrollTrigger. 

## Requirements & Scope
- **Headline Decode Effect**: The main headline ("Obsessed with quality & craft.") reveals by rapidly scrambling monospace characters (like `01001011` or `A$F#X*`) before resolving to the actual letters. We will implement this as a custom vanilla JS or React hook utility since the premium `ScrambleTextPlugin` is not installed.
- **Terminal Paragraphs**: The body paragraphs will have a staggered reveal that feels like terminal output, potentially using a blinking block cursor `_`.
- **Responsive & A11y**: Must respect `prefers-reduced-motion` (skip the scramble effect if true) and ensure text remains fully readable by screen readers (e.g. using `aria-label`).

## Tasks
- [x] 1. Custom Scramble Hook/Utility
- [x] 2. Apply Decode to Headline & Image Reveal
- [x] 3. Terminal Reveal for Body
- [ ] 4. Polish & A11y (reduced motion, screen readers)
