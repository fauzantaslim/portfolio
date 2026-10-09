# Spec: Hero to About Cursor Journey

## Objective
Implement a scroll-linked narrative animation where a giant cursor in the `HeroSection` travels down the page alongside the user's scroll. Upon reaching the `AboutSection`, it undergoes a "glitch" effect and shrinks, seamlessly transforming into the terminal block cursor (`_`) at the end of the bio text.

## Context
The user requested Option A ("Glitch & Snap"). We need an animation that spans across two distinct sections (`HeroSection` and `AboutSection`). Since `AboutSection` is loaded via `next/dynamic`, we must ensure GSAP calculates the final destination coordinates correctly after the DOM is fully rendered.

## Approach & Tech Direction
1. **The Giant Cursor Component**: We will add a large SVG cursor icon into the `HeroSection`. It will have a fixed or absolute position so it can break out of the section bounds.
2. **The Journey (ScrollTrigger)**: 
   - **Trigger**: The entire page or `HeroSection`.
   - **End**: The `.terminal-cursor` element inside `AboutSection`.
   - **Animation**: The giant cursor moves (`x` and `y`) to match the position of the terminal cursor, scaling down significantly as it travels.
3. **The Glitch Effect**: As it approaches the destination (e.g., progress > 0.8), we trigger a sharp, chaotic "glitch" animation on the cursor (rapid skewing, position jumping, or color flashing).
4. **The Handoff**: Once it lands perfectly on the terminal cursor's location, the giant cursor's opacity hits 0, and the actual `.terminal-cursor` (which was hidden) becomes visible and starts its infinite blink.

## Tasks
- [ ] 1. Add Giant Cursor to Hero Section (static markup and styling).
- [ ] 2. Setup Cross-Section ScrollTrigger (move and scale the cursor to match `.terminal-cursor` position).
- [ ] 3. Implement the Glitch Effect (during the final 20% of the scroll journey).
- [ ] 4. Polish Handoff & Edge Cases (handle responsive resize, reduced motion fallback, and lazy-loading DOM refresh).
