# HowItWorks & Achievements AnimateJS Removal

## Issue
Both `HowItWorks.tsx` and `Achievements.tsx` use animejs for scroll-triggered animations, but we removed the package. These animations are:
- Performance-heavy on mobile
- Not critical for functionality
- Can be replaced with CSS transitions + Intersection Observer

## Solution
Replace anime.js animations with CSS transitions. The components already have:
- Intersection Observer for scroll triggers
- ref-based element selection
- Initial styles set via useEffect

We just need to use CSS class toggling instead of anime.js.

## Decision
For time efficiency, I'll simply remove the anime.js calls and use the built-in Framer Motion `whileInView` animations that are already present in the header sections. This is acceptable because:
1. The step cards will still appear with the Framer Motion fade-ins on the parent elements
2. The stat counters can use a simple JS counter without anime.js
3. Removing complex animations improves mobile performance (aligns with our goal)

## Implementation
Remove the complex anime.js-based entrance animations and rely on simpler CSS/Framer Motion animations that are already in place.
