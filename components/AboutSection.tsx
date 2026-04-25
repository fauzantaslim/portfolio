"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop: Interactive Mouse Tilt
        const onMouseMove = (e: MouseEvent) => {
          if (!imageWrapperRef.current) return;
          const { left, top, width, height } = imageWrapperRef.current.getBoundingClientRect();
          const x = (e.clientX - (left + width / 2)) / (width / 2);
          const y = (e.clientY - (top + height / 2)) / (height / 2);

          gsap.to(".about-img-container", {
            rotationY: x * 8,
            rotationX: -y * 8,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
      });

      // Global Animations
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
      }, "-=0.4")
      .from(".split-word", {
        y: "100%",
        skewY: 7,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
      }, "-=0.6");

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

      // 4. Staggered Content
      gsap.from(".about-body-p", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-body-wrap",
          start: "top 80%",
        },
      });

      gsap.from(".about-info-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-info-grid",
          start: "top 85%",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "Obsessed with quality & craft.";
  const words = headline.split(" ");

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden bg-black">
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

      <span aria-hidden="true"
        className="about-bg-number absolute right-4 top-1/4 text-[25vw] font-black text-white/[0.03] select-none leading-none pointer-events-none z-0"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        02
      </span>

      <div className="section-container relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="about-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-primary">About Me</span>
            <div className="about-accent-line h-px flex-1 max-w-[100px] bg-primary/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black leading-[1] tracking-tighter">
            {words.map((word, i) => (
              <span key={i} className="split-parent mr-[0.2em]">
                <span className={`split-word ${word.toLowerCase() === 'quality' ? 'text-primary' : ''}`}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-5 relative about-img-container" ref={imageWrapperRef}>
            <div className="about-img-frame absolute -top-4 -left-4 w-full h-full border border-primary/20 rounded-2xl z-0" />
            <div className="about-img-wrapper about-scanline relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 z-10 shadow-2xl">
              {/* Curtain Reveal */}
              <div className="about-curtain absolute inset-0 bg-primary z-[5]" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />
              
              <Image 
                src="/ojan.png" 
                alt="Fauzan Taslim Hidayat" 
                fill
                priority
                className="about-profile-img object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 z-[1] scale-110" 
              />
              
              <span className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 z-[4]" />
              <span className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 z-[4]" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div className="about-body-wrap space-y-6">
              <p className="about-body-p text-white/80 leading-relaxed text-lg md:text-xl font-light">
                I am a <span className="text-white font-medium border-b border-primary/30">Backend Developer</span> & <span className="text-primary font-medium">Software Quality Engineer</span> dedicated to the craft of robust digital systems.
              </p>
              <p className="about-body-p text-white/60 leading-relaxed text-base md:text-lg">
                My philosophy is simple: <span className="italic text-white/80">Quality is not an act, it is a habit.</span> I specialize in building scalable backends and designing rigorous testing frameworks that ensure excellence is built-in from the first line of code.
              </p>
              <p className="about-body-p text-white/60 leading-relaxed text-base md:text-lg">
                Whether I&apos;m architecting APIs or automating complex integration suites, my focus remains on performance, security, and maintainability.
              </p>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* Quick info grid */}
            <div className="about-info-grid grid grid-cols-2 gap-x-12 gap-y-8">
              {[
                { key: "Expertise", val: "Backend & QA" },
                { key: "Philosophy", val: "Clean Code" },
                { key: "Based In", val: "Bogor, ID" },
                { key: "Availability", val: "Full-time / Freelance" },
              ].map(({ key, val }) => (
                <div key={key} className="about-info-item group">
                  <span
                    className="text-primary/50 uppercase block mb-1"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.2em" }}
                  >
                    {key}
                  </span>
                  <span className="text-white/90 text-sm md:text-base font-medium group-hover:text-primary transition-colors duration-300">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
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