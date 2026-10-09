"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import dynamic from "next/dynamic";
import { createScrambleTween } from "@/lib/scramble";

gsap.registerPlugin(ScrollTrigger);

// three.js is heavy: only fetched when the shard effect is actually going to run.
const ShardPortrait = dynamic(() => import("@/components/ui/shard-portrait"), { ssr: false });

const PORTRAIT_SRC = "/ojan.png";
const PORTRAIT_OPTIMIZED_SRC = `/_next/image?url=${encodeURIComponent(PORTRAIT_SRC)}&w=640&q=75`;

function canUseShardEffect() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const gl = document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/** Colour every character starts in before it "lights up" (reads as dark gray on dark and light gray on light). */
const CHAR_DIM_COLOR = "rgba(113,113,122,0.4)";

/** Splits text into per-character spans (grouped by word so wrapping stays natural). */
function Chars({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char, j) => (
                <span key={j} className="about-char">{char}</span>
              ))}
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  // "pending" until we know; the Hero cursor journey waits for this to settle.
  const [shard, setShard] = useState<"pending" | "on" | "off">("pending");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser capability check, must run client-side after mount
    setShard(canUseShardEffect() ? "on" : "off");
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // (Removed interactive mouse tilt per request so the image stays still)

      // Fallback for reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".about-curtain", { scaleX: 0 });
        gsap.set(".split-word", { opacity: 1 });
        gsap.set(".terminal-cursor", { opacity: 1 });
        gsap.set(".about-body-wrap", { opacity: 1, y: 0 });
      });

      // Global Animations
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });

      // 1. Background Number Parallax
      gsap.to(".about-bg-number", {
        y: -100,
        opacity: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Headline Mask Reveal
      tl.from(".about-eyebrow", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(".about-accent-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.inOut",
      }, "-=0.4");

      // Hide text initially to prevent FOUC of the real text
      gsap.set(".split-word", { opacity: 0 });
      tl.set(".split-word", { opacity: 1 }, "-=0.4");

      const wordEls = gsap.utils.toArray<HTMLElement>(".split-word");
      wordEls.forEach((word, i) => {
        tl.add(createScrambleTween(word, {
          duration: 1.2,
          chars: "01",
        }), `<${i * 0.15}`);
      });

      // 3. Image Reveal (Curtain + Scale)
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-img-wrapper",
          start: "top 75%",
        },
      });

      imgTl.to(".about-curtain", {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.2,
        ease: "expo.inOut",
      })
      .from(".about-profile-img", {
        scale: 1.3,
        xPercent: 10,
        duration: 1.5,
        ease: "expo.out",
      }, "-=1.1")
      .to(".about-img-wrapper", {
        x: 4,
        skewX: 2,
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "steps(1)",
        clearProps: "x,skewX"
      }, "-=1.1")
      .from(".about-img-frame", {
        opacity: 0,
        x: -20,
        y: -20,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

      // Internal Image Parallax
      gsap.to(".about-profile-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-img-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Blinking cursor
      gsap.to(".terminal-cursor", {
        opacity: 1,
        repeat: -1,
        yoyo: true,
        duration: 0.4,
        ease: "steps(1)",
      });
      });

      // 4. Body copy reveal. Desktop: the grid is pinned exactly where the Hero journey ends
      // (photo centre at 45% of the viewport) and the text is scrubbed in while pinned.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        // Hide text initially
        gsap.set(".about-body-wrap", { opacity: 0, y: 30 });

        const textTl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: ".about-grid",
            start: "center 45%",
            end: () => `+=${Math.round(window.innerHeight * 0.9)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => gsap.to(".about-body-wrap", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
            onLeaveBack: () => gsap.to(".about-body-wrap", { opacity: 0, y: 30, duration: 0.4, ease: "power2.in" }),
          },
        });
        textTl
          .to({}, { duration: 0.15 }) // delay so fade-in completes partially while text is still gray
          .from(".about-char", { color: CHAR_DIM_COLOR, clearProps: "color", stagger: 0.04, duration: 0.2, ease: "none" })
          .from(".about-link", { opacity: 0, y: 12, duration: 0.5 }, "-=0.1")
          .to({}, { duration: 0.6 }); // short hold so the full text can be read before release
      });

      // Mobile/tablet: stacked layout is taller than the viewport, so no pin: colour in while scrolling past.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(".about-body-wrap", { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: ".about-body-wrap",
          start: "top 85%",
          onEnter: () => gsap.to(".about-body-wrap", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(".about-body-wrap", { opacity: 0, y: 30, duration: 0.4, ease: "power2.in" }),
        });

        gsap.from(".about-char", {
          color: CHAR_DIM_COLOR,
          clearProps: "color",
          stagger: 0.04,
          duration: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-body-wrap",
            start: "top 60%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "Obsessed with quality & craft.";
  const words = headline.split(" ");

  return (
    <section id="about" aria-labelledby="about-heading" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden bg-background">
      <style>{`
        .split-parent { overflow: hidden; display: inline-block; }
        .split-word { display: inline-block; will-change: transform; }
        .about-img-container { perspective: 1000px; }
        .about-scanline::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px
          );
          pointer-events: none;
          z-index: 3;
        }
        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <div className="noise-overlay" />


      <div className="section-container relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="about-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-primary">About Me</span>
            <div className="about-accent-line h-px flex-1 max-w-[100px] bg-primary/40" />
          </div>
          <h2 id="about-heading" aria-label={headline} className="text-4xl md:text-7xl font-black leading-[1] tracking-tighter text-foreground">
            {words.map((word, i) => (
              <span key={i} aria-hidden="true" className="split-parent mr-[0.2em]">
                <span className={`split-word ${word.toLowerCase() === 'quality' ? 'text-primary' : ''}`}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Two-column */}
        <div className="about-grid grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-5 relative about-img-container" ref={imageWrapperRef}>
            <div className="about-img-frame absolute -top-4 -left-4 w-full h-full border border-primary/20 rounded-2xl z-0" />
            <div
              data-shard={shard}
              className="about-img-wrapper about-scanline relative w-full aspect-[4/5] rounded-2xl overflow-hidden dark:border dark:border-white/10 border border-black/10 z-10 shadow-2xl bg-[#04120f]"
            >
              {/* Curtain Reveal (replaced by the shard effect when it is active) */}
              <div className="about-curtain absolute inset-0 bg-primary z-[5]" style={{ display: shard === "on" ? "none" : undefined }} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />
              
              {/* Real photo: hidden while shards are active, crossfaded in at the end of the journey */}
              <div className="about-photo-layer absolute inset-0 z-[1]" style={{ opacity: shard === "on" ? 0 : 1 }}>
                <Image 
                  src={PORTRAIT_SRC} 
                  alt="Fauzan Taslim Hidayat" 
                  fill
                  priority
                  className="about-profile-img object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-110" 
                />
              </div>

              {/* WebGL shards (cursor -> photo). Opacity is driven by the Hero scroll timeline. */}
              {shard === "on" && (
                <div className="about-shard-canvas absolute inset-0 z-[6] pointer-events-none opacity-0">
                  <ShardPortrait
                    src={PORTRAIT_OPTIMIZED_SRC}
                    fallbackSrc={PORTRAIT_SRC}
                    onError={() => setShard("off")}
                  />
                </div>
              )}
              
              <span className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 z-[4]" />
              <span className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 z-[4]" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="about-body-wrap space-y-6">
              <p className="text-foreground/90 leading-snug text-2xl md:text-4xl font-light tracking-tight">
                <Chars text="I'm Fauzan Taslim Hidayat, a" />{" "}
                <span className="text-primary font-medium"><Chars text="Software Development Engineer in Test" /></span>{" "}
                <Chars text="in Bogor." />
              </p>
              <p className="text-foreground/55 leading-relaxed text-base md:text-xl font-light max-w-xl">
                <Chars text="I walk into the fragile, the untested and the almost-shipped, then break it on purpose so users never have to." />
                <span className="terminal-cursor inline-block w-[0.6em] h-[1.1em] bg-primary/80 ml-2 -mb-0.5 opacity-0" />
              </p>
            </div>

            <div className="about-link flex items-center gap-4 group cursor-pointer">
              <span
                className="font-mono text-primary uppercase tracking-[0.3em] text-[0.7rem]"
              >
                Explore my technical stack
              </span>
              <div className="h-px bg-primary/30 w-12 group-hover:w-24 transition-all duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}