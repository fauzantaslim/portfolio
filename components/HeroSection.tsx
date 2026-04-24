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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
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

      {/* RetroGrid — kept intact */}
      <RetroGrid />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="section-container relative z-10 text-center flex flex-col items-center">

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
          ref={nameRef}
          className="mb-4 [@media(max-height:500px)]:mb-2 tracking-tight leading-[1.0]"
        >
          <span
            className="hero-name-line text-5xl md:text-7xl lg:text-[6rem] [@media(max-height:500px)]:text-4xl font-black text-white opacity-0"
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
            className="inline-flex items-center gap-2 text-white/50 text-sm md:text-base tracking-widest"
            style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
          >
            <span className="text-primary/50">[</span>
            Software Quality Engineer
            <span className="text-primary/50">]</span>
          </span>
        </div>

        {/* Description */}
        <p
          className="hero-desc max-w-xl mx-auto text-white/45 text-sm md:text-base [@media(max-height:500px)]:text-xs leading-relaxed mb-10 [@media(max-height:500px)]:mb-4 opacity-0"
          style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}
        >
          Passionate about software excellence through comprehensive testing strategies,
          automation frameworks, and continuous quality improvement.
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
          className="scroll-indicator flex flex-col items-center gap-2 text-white/30"
          aria-label="Scroll to About section"
        >
          Scroll
          <div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <FaArrowDown className="w-2 h-2 text-primary" aria-hidden="true" />
          </div>
        </a>
      </div>
    </section>
  );
}
