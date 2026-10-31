"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function SmoothScroll() {
  useEffect(() => {
    // Respect user's motion preferences (WCAG 2.3.3)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let locomotiveScroll: any = null;

    const initScroll = async () => {
      try {
        const LocomotiveScrollModule = (await import("locomotive-scroll")).default;
        locomotiveScroll = new LocomotiveScrollModule({
          lenisOptions: {
            lerp: 0.08,
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
          },
        });

        // Store reference globally for programmatic scrolling (e.g., Navbar navigation)
        (window as any).locomotiveScroll = locomotiveScroll;

        // Keep GSAP ScrollTrigger in sync with smooth scroll frame-by-frame
        if (locomotiveScroll.lenisInstance) {
          locomotiveScroll.lenisInstance.on("scroll", () => {
            ScrollTrigger.update();
          });
        }
      } catch (err) {
        console.warn("Failed to initialize LocomotiveScroll:", err);
      }
    };

    initScroll();

    return () => {
      if (locomotiveScroll) {
        try {
          locomotiveScroll.destroy();
        } catch {
          // ignore cleanup error if already destroyed
        }
        delete (window as any).locomotiveScroll;
      }
    };
  }, []);

  return null;
}

