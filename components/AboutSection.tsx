"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const traits = [
  { label: "Backend Dev", detail: "Node.js · Express · Laravel · Go" },
  { label: "QA Engineer", detail: "Manual · Automated · API Testing" },
  { label: "Test Architect", detail: "Jest · Playwright · Integration Tests" },
  { label: "API Designer", detail: "REST · OpenAPI · Postman" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-eyebrow",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".about-eyebrow", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".about-headline",
        { opacity: 0, y: 60, skewY: 4 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".about-headline", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".about-accent-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: ".about-headline", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".about-img-wrapper",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "expo.inOut",
          scrollTrigger: { trigger: ".about-img-wrapper", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-img-frame",
        { opacity: 0, x: -16, y: -16 },
        {
          opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: ".about-img-wrapper", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".about-body",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power2.out",
          scrollTrigger: { trigger: ".about-body-wrap", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".about-trait",
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".about-traits", start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden">
      <style>{`
        .about-img-wrapper { will-change: clip-path; }
        .about-scanline::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px
          );
          pointer-events: none;
          z-index: 3;
        }
        .about-trait {
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .about-trait:hover {
          border-color: rgba(29,205,159,0.35);
          background: rgba(29,205,159,0.06);
        }
      `}</style>

      <span aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[22vw] font-black text-white/[0.02] select-none leading-none pointer-events-none"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        02
      </span>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="about-eyebrow font-mono text-xs tracking-[0.25em] uppercase text-primary">About Me</span>
            <div className="about-accent-line h-px flex-1 max-w-[80px] bg-primary/60" />
          </div>
          <h2 className="about-headline text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">
            Obsessed with<br />
            <span className="text-primary">quality</span> &amp; craft.
          </h2>
        </div>

        {/* Two-column */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Image */}
          <div className="lg:col-span-5 relative">
            <div className="about-img-frame absolute -top-3 -left-3 w-full h-full border border-primary/25 rounded-xl z-0" />
            <div className="about-img-wrapper about-scanline relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-primary/15 z-10 shadow-[0_0_60px_rgba(29,205,159,0.08)]">
              <div className="absolute inset-0 bg-primary/15 mix-blend-overlay z-[2] transition-opacity duration-700 group-hover:opacity-0" />
              <Image src="/ojan.png" alt="Fauzan Taslim Hidayat" fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700 z-[1]" />
              <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary z-[4]" />
              <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary z-[4]" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Body text */}
            <div className="about-body-wrap space-y-5">
              <p className="about-body text-white/75 leading-relaxed text-base md:text-[1.05rem]">
                I&apos;m a dedicated{" "}
                <span className="text-white font-semibold">Backend Developer</span> &amp;{" "}
                <span className="text-primary font-semibold">Software Quality Engineer</span>{" "}
                with a passion for ensuring software reliability and performance. I specialize in designing
                and implementing comprehensive testing strategies that catch defects early and maintain
                high-quality standards throughout the development lifecycle.
              </p>
              <p className="about-body text-white/75 leading-relaxed text-base md:text-[1.05rem]">
                My expertise spans across manual and automated testing and API testing.
                I believe that quality is not just a phase but a culture that should be
                embedded in every aspect of software development.
              </p>
              <p className="about-body text-white/75 leading-relaxed text-base md:text-[1.05rem]">
                When I&apos;m not breaking software (in a good way), I enjoy exploring new
                testing tools, contributing to open-source projects, and staying up-to-date
                with the latest trends in software development and quality assurance.
              </p>
            </div>

            <div className="w-full h-px bg-white/8" />

            {/* Trait chips — replaces empty stats section */}
            <div className="about-traits grid grid-cols-1 sm:grid-cols-2 gap-3">
              {traits.map(({ label, detail }, i) => (
                <div
                  key={label}
                  className="about-trait flex flex-col gap-1.5 p-4 rounded-lg border border-white/8 bg-white/[0.02] cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-white font-semibold text-sm">{label}</span>
                  </div>
                  <span
                    className="text-white/40 pl-[18px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em" }}
                  >
                    {detail}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA line */}
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-primary uppercase tracking-widest"
                style={{ fontSize: "0.65rem" }}
              >
                Let&apos;s build something bold
              </span>
              <div className="flex-1 h-px bg-primary/30 max-w-[60px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
