"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaDownload, FaArrowDown } from "react-icons/fa6";
import { RetroGrid } from "@/components/ui/retro-grid";
import { portraitProgress, PORTRAIT_CURSOR_HEIGHT, CURSOR_ARROW_RATIO } from "@/lib/portrait-progress";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  // GSAP entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    // Eyebrow line
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
    );

    // Accent line expand
    tl.fromTo(
      ".hero-accent-line",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.8, ease: "expo.out" },
      "-=0.3"
    );

    // Name — dramatic clip reveal
    tl.fromTo(
      ".hero-name-line",
      { opacity: 0, y: 80, skewY: 5 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.12, ease: "expo.out" },
      "-=0.4"
    );

    // Role wrapper
    tl.fromTo(
      ".hero-role-wrap",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );

    // Description
    tl.fromTo(
      ".hero-desc",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );

    // CTA buttons stagger
    tl.fromTo(
      ".hero-btn",
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: "back.out(1.3)" },
      "-=0.35"
    );

    // Badges
    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 16, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" },
      "-=0.3"
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    // Giant Cursor reveal
    tl.fromTo(
      ".hero-giant-cursor",
      { opacity: 0, x: 50, y: -50, scale: 0.8, rotation: 15 },
      { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Continuous bounce
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.4,
      ease: "power2.inOut",
      delay: 2.5,
    });

    return () => { tl.kill(); };
  }, []);

  // Cursor Journey: giant cursor flies to the About photo, shatters into shards, becomes the photo.
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let interval: ReturnType<typeof setInterval> | undefined;

    const initJourney = () => {
      const wrapper = document.querySelector<HTMLElement>(".about-img-wrapper");
      const cursor = document.querySelector<HTMLElement>(".hero-giant-cursor");
      // AboutSection is lazy-loaded and decides asynchronously whether shards run (data-shard).
      if (!wrapper || !cursor || wrapper.dataset.shard === "pending") return false;
      const hasShards = wrapper.dataset.shard === "on";

      // Layout-based (ignores GSAP transforms) centres in page coordinates.
      const cursorCenter = () => {
        const parent = cursor.offsetParent as HTMLElement;
        const p = parent.getBoundingClientRect();
        return {
          x: p.left + window.scrollX + cursor.offsetLeft + cursor.offsetWidth / 2,
          y: p.top + window.scrollY + cursor.offsetTop + cursor.offsetHeight / 2,
        };
      };
      const wrapperCenter = () => {
        const r = wrapper.getBoundingClientRect();
        return { x: r.left + window.scrollX + r.width / 2, y: r.top + window.scrollY + r.height / 2 };
      };

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();
        // Reduced motion: no journey at all (the real photo is already visible).
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              // Ends exactly where the About grid pins (photo centre at 45% of the viewport).
              endTrigger: wrapper,
              end: "center 45%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          // 1. Travel: cursor grows to the size of the shard cursor inside the photo box.
          tl.to(cursor, {
            x: () => wrapperCenter().x - cursorCenter().x,
            y: () => wrapperCenter().y - cursorCenter().y,
            scale: () => (PORTRAIT_CURSOR_HEIGHT * wrapper.offsetHeight) / (cursor.offsetWidth * CURSOR_ARROW_RATIO),
            rotation: 0,
            ease: "power1.inOut",
            duration: 0.66,
          }, 0);

          // 2. Handoff: DOM cursor -> WebGL shards shaped like the cursor.
          tl.to(".hero-cursor-svg", { opacity: 0, duration: 0.03 }, 0.66);

          if (hasShards) {
            tl.to(".about-shard-canvas", { opacity: 1, duration: 0.03 }, 0.66);
            // 3. Shards disperse and settle into the photo.
            tl.to(portraitProgress, { value: 1, duration: 0.29 }, 0.66);
            // 4. Crossfade shards -> real photo (keeps grayscale hover etc.).
            tl.to(".about-shard-canvas", { opacity: 0, duration: 0.07 }, 0.93);
            tl.to(".about-photo-layer", { opacity: 1, duration: 0.07 }, 0.93);
          }
        });
      });

      return true;
    };

    if (!initJourney()) {
      interval = setInterval(() => {
        if (initJourney()) clearInterval(interval);
      }, 300);
    }

    return () => {
      clearInterval(interval);
      ctx?.revert();
      portraitProgress.value = 0;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-20 min-h-screen flex items-center justify-center bg-background"
    >
      <style>{`
        @keyframes cursor-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-name-line {
          display: block;
          overflow: visible;
        }
        .hero-btn-primary {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: box-shadow 0.25s ease, background 0.25s ease;
        }
        .hero-btn-primary:hover {
          box-shadow: 0 0 28px rgba(29,205,159,0.4);
        }
        .hero-btn-secondary {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .hero-btn-secondary:hover {
          background: rgba(29,205,159,0.08);
          border-color: rgba(29,205,159,0.5);
        }
        .hero-badge {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .hero-badge:hover {
          border-color: rgba(29,205,159,0.45);
          background: rgba(29,205,159,0.1);
        }
        .scroll-indicator {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }
        .scroll-indicator:hover { color: #1DCD9F; }
      `}</style>

      {/* RetroGrid — color-scheme aware */}
      <RetroGrid
        lightLineColor="rgba(0,0,0,0.25)"
        darkLineColor="rgba(255,255,255,0.2)"
        opacity={0.5}
      />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="section-container relative z-10 text-center flex flex-col items-center">

        {/* Giant Cursor for the Scroll Journey */}
        <div className="hero-giant-cursor absolute -top-12 right-4 md:right-1/4 z-[100] pointer-events-none drop-shadow-[0_0_20px_rgba(29,205,159,0.4)] opacity-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="hero-cursor-svg block h-28 w-28 md:h-40 md:w-40 text-primary -rotate-12" stroke="white" strokeWidth="1.5">
            <path d="M4 2l7 19 3-9 9-3L4 2z" />
          </svg>
        </div>

        {/* Eyebrow + accent line */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="hero-accent-line h-px w-10 bg-primary/70 hidden sm:block" />
          <span
            className="hero-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-primary opacity-0"
          >
            Hello, I&apos;m
          </span>
          <div className="hero-accent-line h-px w-10 bg-primary/70 hidden sm:block" />
        </div>

        {/* Name */}
        <h1
          id="hero-heading"
          ref={nameRef}
          className="mb-4 [@media(max-height:500px)]:mb-2 tracking-tight leading-[1.0]"
        >
          <span
            className="hero-name-line text-5xl md:text-7xl lg:text-[6rem] [@media(max-height:500px)]:text-4xl font-black text-foreground opacity-0"
          >
            Fauzan Taslim
          </span>
          <span
            className="hero-name-line text-5xl md:text-7xl lg:text-[6rem] [@media(max-height:500px)]:text-4xl font-black text-primary opacity-0"
            style={{ textShadow: "0 0 60px rgba(29,205,159,0.35)" }}
          >
            Hidayat
          </span>
        </h1>

        {/* Role — single clear title */}
        <div className="hero-role-wrap mb-6 flex items-center justify-center opacity-0">
          <span
            className="inline-flex items-center gap-2 text-foreground/50 text-sm md:text-base tracking-widest"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            <span className="text-primary/50">[</span>
            Software Quality Engineer
            <span className="text-primary/50">]</span>
          </span>
        </div>

        {/* Description */}
        <p
          className="hero-desc max-w-xl mx-auto text-foreground/45 text-sm md:text-base [@media(max-height:500px)]:text-xs leading-relaxed mb-10 [@media(max-height:500px)]:mb-4 opacity-0"
          style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
        >
          I break things on purpose — so users don&apos;t have to.
          Also I build backends. Sometimes both happen at the same time.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10 [@media(max-height:500px)]:mb-2">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-btn hero-btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:py-2 bg-primary text-black font-bold rounded-lg opacity-0"
            aria-label="Contact me"
          >
            <FaEnvelope className="w-3.5 h-3.5" aria-hidden="true" />
            Contact Me
          </a>
          <a
            href="/Fauzan Taslim Hidayat - CV Maret 2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary group inline-flex items-center gap-2.5 px-7 py-3.5 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:py-2 border border-primary/25 text-primary rounded-lg opacity-0"
            aria-label="Download CV"
          >
            <FaDownload className="w-3.5 h-3.5" aria-hidden="true" />
            Download CV
          </a>
        </div>


      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 [@media(max-height:500px)]:bottom-2 left-1/2 -translate-x-1/2 opacity-0"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="scroll-indicator flex flex-col items-center gap-2 text-foreground/30"
          aria-label="Scroll to About section"
        >
          Scroll
          <div
            className="w-5 h-8 rounded-full border dark:border-white/20 border-black/20 flex items-start justify-center pt-1.5"
          >
            <FaArrowDown className="w-2 h-2 text-primary" aria-hidden="true" />
          </div>
        </a>
      </div>
    </section>
  );
}
