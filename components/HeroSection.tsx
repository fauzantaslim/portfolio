"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaEnvelope, FaDownload, FaArrowDown } from "react-icons/fa6";
import { RetroGrid } from "@/components/ui/retro-grid";

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

  // Cursor Journey Animation
  useEffect(() => {
    let ctx: gsap.Context;

    const initJourney = () => {
      const target = document.querySelector('.terminal-cursor');
      const cursor = document.querySelector('.hero-giant-cursor');
      if (!target || !cursor) return false;

      ctx = gsap.context(() => {
        // Fallback for reduced motion: skip this complex animation
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          
          const journeyTl = gsap.timeline({
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: () => {
                // End animation exactly when the target reaches the center of the viewport
                const targetRect = target.getBoundingClientRect();
                const targetAbsoluteY = targetRect.top + window.scrollY;
                return `${targetAbsoluteY} center`;
              },
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          journeyTl.to(cursor, {
            x: () => {
              const targetX = target.getBoundingClientRect().left + window.scrollX;
              const cursorX = cursor.getBoundingClientRect().left + window.scrollX - (gsap.getProperty(cursor, "x") as number);
              // Offset slightly so the pointer tip hits the target
              return targetX - cursorX - 4; 
            },
            y: () => {
              const targetY = target.getBoundingClientRect().top + window.scrollY;
              const cursorY = cursor.getBoundingClientRect().top + window.scrollY - (gsap.getProperty(cursor, "y") as number);
              // Target center
              return targetY - cursorY + 12;
            },
            scale: 0.15,
            rotation: 0,
            ease: "power1.inOut",
          });
        });
      });

      return true;
    };

    // Since AboutSection is dynamic, poll for it
    if (!initJourney()) {
      const interval = setInterval(() => {
        if (initJourney()) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center justify-center bg-background"
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
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-primary -rotate-12" stroke="white" strokeWidth="1.5">
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
