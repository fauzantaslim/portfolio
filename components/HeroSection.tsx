"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaChevronDown, FaEnvelope, FaDownload } from "react-icons/fa6";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Greeting line
    tl.fromTo(
      ".hero-greeting",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Name reveal
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    );

    // Title
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    // Description
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );

    // Scroll indicator bounce
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    );

    // Continuous scroll indicator bounce
    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 2.5,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <RetroGrid />

      {/* Content */}
      <div className="section-container relative z-10 text-center">
        <p className="hero-greeting text-primary font-mono text-sm md:text-base mb-4 tracking-widest uppercase opacity-0">
          Hello, I&apos;m
        </p>

        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 opacity-0"
        >
          <span className="text-white">Fauzan Taslim</span>
          <br />
          <span className="text-primary glow-text">Hidayat</span>
        </h1>

        <p
          ref={titleRef}
          className="text-xl md:text-2xl text-white font-light mb-6 opacity-0"
        >
          Software Quality Engineer
        </p>

        <p
          ref={descRef}
          className="max-w-2xl mx-auto text-white text-base md:text-lg leading-relaxed mb-10 opacity-0"
        >
          Passionate about ensuring software excellence through comprehensive
          testing strategies, automation frameworks, and continuous quality
          improvement. Building reliable systems that users can trust.
        </p>

        <div ref={ctaRef} className="flex items-center justify-center gap-4 flex-wrap opacity-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2 px-8 py-3.5 bg-primary text-black font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(29,205,159,0.3)]"
          >
            <FaEnvelope className="w-4 h-4" />
            Contact Me
          </a>
          <a
            href="/Fauzan Taslim Hidayat - CV Maret 2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-3.5 border border-primary/30 text-primary rounded-full hover:bg-primary/10 transition-all duration-300"
          >
            <FaDownload className="w-4 h-4" aria-hidden="true" />
            Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FaChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
