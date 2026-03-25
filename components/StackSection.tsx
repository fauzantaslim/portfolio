"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconCloud } from "@/components/ui/icon-cloud";

gsap.registerPlugin(ScrollTrigger);

type StackItem = {
  slug: string;
  label: string;
  category: "LANG" | "FE" | "BE" | "TEST" | "OPS" | "TOOL";
};

const stack: StackItem[] = [
  { slug: "typescript",      label: "TypeScript",    category: "LANG" },
  { slug: "javascript",      label: "JavaScript",    category: "LANG" },
  { slug: "dart",            label: "Dart",          category: "LANG" },
  { slug: "php",             label: "PHP",           category: "LANG" },
  { slug: "go",              label: "Go",            category: "LANG" },
  { slug: "flutter",         label: "Flutter",       category: "FE"   },
  { slug: "html5",           label: "HTML5",         category: "FE"   },
  { slug: "css3",            label: "CSS3",          category: "FE"   },
  { slug: "nodedotjs",       label: "Node.js",       category: "BE"   },
  { slug: "express",         label: "Express",       category: "BE"   },
  { slug: "laravel",         label: "Laravel",       category: "BE"   },
  { slug: "dotnet",          label: ".NET",          category: "BE"   },
  { slug: "firebase",        label: "Firebase",      category: "BE"   },
  { slug: "jest",            label: "Jest",          category: "TEST" },
  { slug: "playwright",      label: "Playwright",    category: "TEST" },
  { slug: "docker",          label: "Docker",        category: "OPS"  },
  { slug: "nginx",           label: "Nginx",         category: "OPS"  },
  { slug: "git",             label: "Git",           category: "OPS"  },
  { slug: "github",          label: "GitHub",        category: "OPS"  },
  { slug: "jira",            label: "Jira",          category: "TOOL" },
  { slug: "visualstudiocode",label: "VS Code",       category: "TOOL" },
  { slug: "figma",           label: "Figma",         category: "TOOL" },
  { slug: "postman",         label: "Postman",       category: "TOOL" },
];

const categoryAccent: Record<StackItem["category"], string> = {
  LANG: "#22c55e",
  FE:   "#38bdf8",
  BE:   "#a78bfa",
  TEST: "#fb923c",
  OPS:  "#f43f5e",
  TOOL: "#facc15",
};

const images = stack.map(
  ({ slug }) => `https://cdn.simpleicons.org/${slug}/${slug}`
);

export default function StackSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: ".stack-title", start: "top 85%" },
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
          scrollTrigger: { trigger: ".stack-cloud", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".stack-tag",
        { opacity: 0, y: 24, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".stack-tags", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Subtle grid background behind tags */}
      <style>{`
        .stack-tag {
          position: relative;
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stack-tag::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.015) 3px,
            rgba(255,255,255,0.015) 4px
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .stack-tag:hover::before {
          opacity: 1;
        }
        .stack-tag:hover {
          transform: translateY(-2px);
        }
        .stack-tag .cat-badge {
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          padding: 1px 5px;
          border-radius: 2px;
          font-weight: 700;
          line-height: 1.4;
          transition: background 0.2s ease, color 0.2s ease;
        }
      `}</style>

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
        <div className="stack-cloud flex justify-center mb-14">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <IconCloud images={images} />
          </div>
        </div>

        {/* Tags — circuit chip style */}
        <div className="stack-tags flex flex-wrap justify-center gap-2 max-w-3xl mx-auto perspective-[800px]">
          {stack.map(({ slug, label, category }) => {
            const accent = categoryAccent[category];
            return (
              <span
                key={slug}
                className="stack-tag group inline-flex items-center gap-2 px-3 py-1.5 text-sm cursor-default select-none"
                style={{
                  border: `1px solid ${accent}28`,
                  backgroundColor: `${accent}08`,
                  borderRadius: "4px",
                  boxShadow: `inset 0 0 0 0 ${accent}22`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 14px ${accent}44, inset 0 0 8px ${accent}18`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${accent}66`;
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    `${accent}12`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `inset 0 0 0 0 ${accent}22`;
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `${accent}28`;
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    `${accent}08`;
                }}
              >
                {/* Category badge */}
                <span
                  className="cat-badge"
                  style={{
                    backgroundColor: `${accent}22`,
                    color: accent,
                  }}
                >
                  {category}
                </span>
                {/* Label */}
                <span
                  className="text-white/70 group-hover:text-white/95 transition-colors duration-200"
                  style={{ fontSize: "0.78rem", letterSpacing: "0.03em" }}
                >
                  {label}
                </span>
              </span>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-8 opacity-40">
          {(Object.entries(categoryAccent) as [StackItem["category"], string][]).map(
            ([cat, color]) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 text-xs"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color,
                  letterSpacing: "0.06em",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: color,
                    display: "inline-block",
                  }}
                />
                {cat}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
