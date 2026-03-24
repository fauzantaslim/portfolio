"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCloud } from "@/components/ui/icon-cloud";

gsap.registerPlugin(ScrollTrigger);

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "flutter",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "firebase",
  "nginx",
  "jest",
  "playwright",
  "docker",
  "git",
  "jira",
  "github",
  "visualstudiocode",
  "figma",
  "postman",
  "laravel",
  "php",
  "go",
  "dotnet",
];

export default function StackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".stack-title",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".stack-cloud",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stack-cloud",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".stack-tag",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".stack-tags",
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="stack-title text-primary font-mono text-sm tracking-widest uppercase mb-3">
            Tech Stack
          </p>
          <h2 className="stack-title text-3xl md:text-5xl font-bold">
            Technologies I <span className="text-primary">Use</span>
          </h2>
        </div>

        {/* Icon Cloud */}
        <div className="stack-cloud flex justify-center mb-12">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <IconCloud images={images} />
          </div>
        </div>

        {/* Tags */}
        <div className="stack-tags flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {slugs.map((slug) => (
            <span
              key={slug}
              className="stack-tag px-4 py-2 rounded-full text-sm border border-card-border bg-card-bg text-neutral-light hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-default"
            >
              {slug.replace("dotjs", ".js").replace("dotjs", ".js")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
