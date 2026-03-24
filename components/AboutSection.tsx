"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-dark/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <p className="about-title text-primary font-mono text-sm tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="about-title text-3xl md:text-5xl font-bold mb-8">
            Get to know <span className="text-primary">me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-5 relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-card-border group shadow-[0_0_30px_rgba(29,205,159,0.05)]">
               <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
               <Image 
                  src="/ojan.png" 
                  alt="Fauzan Taslim Hidayat" 
                  fill 
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
               />
            </div>
            {/* Decorative background block */}
            <div className="absolute -inset-4 border border-primary/30 rounded-2xl -z-10 translate-x-4 translate-y-4 hidden md:block" />
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <p className="about-text text-neutral-light leading-relaxed md:text-lg md:leading-loose">
                I&apos;m a dedicated <span className="text-primary font-semibold">Backend Developer</span> & <span className="text-primary font-semibold">Software Quality Engineer</span> with
                a passion for ensuring software reliability and performance. I specialize in designing
                and implementing comprehensive testing strategies that catch defects early and maintain
                high-quality standards throughout the development lifecycle.
              </p>
              <p className="about-text text-neutral-light leading-relaxed md:text-lg md:leading-loose">
                My expertise spans across manual and automated testing, CI/CD pipeline integration,
                performance testing, and API testing. I believe that quality is not just a phase
                but a culture that should be embedded in every aspect of software development.
              </p>
              <p className="about-text text-neutral-light leading-relaxed md:text-lg md:leading-loose">
                When I&apos;m not breaking software (in a good way), I enjoy exploring new testing
                tools, contributing to open-source projects, and staying up-to-date with the
                latest trends in software development and quality assurance.
              </p>
            </div>
            
            <div className="about-text pt-4 border-t border-card-border/50">
               <p className="font-mono text-primary text-sm uppercase tracking-widest mb-2">Let&apos;s build something bold</p>
               <div className="h-1 w-12 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
