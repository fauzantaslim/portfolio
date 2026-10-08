"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects-data";


gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Web", "API", "Manual Test", "Automation Test", "Bug Reporting"];

const VISIBLE_LAYERS = 3;
const LAYER_OFFSET = 5; // % of stack size, per layer, up-right
const LAYER_SCALE_STEP = 0.06;
const pad = (n: number) => String(n).padStart(2, "0");

const categoryColor: Record<string, string> = {
  Web: "#22c55e",
  API: "#38bdf8",
  "Manual Test": "#a78bfa",
  "Automation Test": "#fb923c",
  "Bug Reporting": "#f43f5e",
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredProjects = (
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  ).slice().reverse();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-eyebrow",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-eyebrow", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".proj-headline",
        { opacity: 0, y: 50, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".proj-headline", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".proj-filter-btn",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-filters", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-heading" ref={sectionRef} className="pt-24 md:pt-36 relative bg-background">
      <style>{`
        .proj-num {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }
        .proj-filter-btn {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          transition: all 0.2s ease;
        }
        .proj-stack-size {
          width: 100%;
          max-width: 56rem;
          aspect-ratio: 4 / 5;
        }
        @media (min-width: 768px) {
          .proj-stack-size { aspect-ratio: 16 / 10; }
        }
      `}</style>


      <div className="section-container relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-14 md:mb-18 [@media(max-height:500px)]:mb-4">
          <div className="flex items-center gap-3 mb-4 [@media(max-height:500px)]:mb-2">
            <span className="proj-eyebrow font-mono text-xs tracking-[0.25em] uppercase text-primary">
              Selected Work
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-primary/60" />
          </div>
          <h2 id="projects-heading" className="proj-headline text-4xl md:text-6xl [@media(max-height:500px)]:text-2xl font-black tracking-tight leading-[1.05] text-foreground">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </div>

        {/* ── Filter bar — industrial chip style ── */}
        <div 
          className="proj-filters flex flex-wrap gap-2 mb-12 [@media(max-height:500px)]:mb-6"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            const isActive = activeFilter === cat;
            const accent = cat === "All" ? "#1DCD9F" : (categoryColor[cat] ?? "#1DCD9F");

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setActiveIndex(0);
                }}
                aria-pressed={isActive}
                className="proj-filter-btn inline-flex items-center gap-2 px-3 py-1.5 uppercase cursor-pointer"
                style={{
                  border: `1px solid ${isActive ? accent : accent + "28"}`,
                  backgroundColor: isActive ? accent + "18" : accent + "08",
                  borderRadius: "4px",
                  color: isActive ? accent : "var(--text-muted)",
                  boxShadow: isActive ? `0 0 12px ${accent}33` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = accent + "55";
                    (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = accent + "28";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  }
                }}
              >
                {cat}
                <span
                  style={{
                    fontSize: "0.6rem",
                    backgroundColor: accent + "22",
                    color: accent,
                    padding: "1px 5px",
                    borderRadius: "2px",
                    fontWeight: 700,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Project card stack ── */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-32 [@media(max-height:500px)]:mb-12">
        {filteredProjects.length === 0 ? (
          <div className="proj-stack-size mx-auto flex items-center justify-center rounded-2xl border border-dashed border-black/15 dark:border-white/15">
            <p className="proj-num text-xs tracking-widest uppercase text-[var(--text-muted)]">
              No projects in this category yet
            </p>
          </div>
        ) : (
          <>
            <div className="proj-stack proj-stack-size relative mx-auto">
              {filteredProjects.map((project, index) => {
                const layer = (index - activeIndex + filteredProjects.length) % filteredProjects.length;
                const depth = Math.min(layer, VISIBLE_LAYERS - 1);
                const isFront = layer === 0;
                const accent = categoryColor[project.category] ?? "#1DCD9F";

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    aria-label={`View details for ${project.title}`}
                    tabIndex={isFront ? 0 : -1}
                    className={`proj-card absolute block overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 dark:border-white/10 bg-gray-200 dark:bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${isFront ? "" : "pointer-events-none"}`}
                    style={{
                      width: "90%",
                      height: "90%",
                      left: `${depth * LAYER_OFFSET}%`,
                      bottom: `${depth * LAYER_OFFSET}%`,
                      transformOrigin: "bottom left",
                      transform: `scale(${1 - depth * LAYER_SCALE_STEP})`,
                      filter: `brightness(${1 - depth * 0.2})`,
                      opacity: layer < VISIBLE_LAYERS ? 1 : 0,
                      zIndex: filteredProjects.length - layer,
                    }}
                  >
                    <Image
                      src={project.images[0]}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 60vw, 90vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <span
                      className="absolute top-4 left-4 md:top-6 md:left-6 inline-block px-3 py-1 text-[10px] md:text-xs font-mono tracking-widest uppercase rounded-sm border backdrop-blur-md"
                      style={{ color: accent, borderColor: accent + "40", backgroundColor: accent + "10" }}
                    >
                      {project.category}
                    </span>
                    <h3 className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-2xl md:text-5xl [@media(max-height:500px)]:text-xl font-black text-white tracking-tight leading-[1.05] drop-shadow-2xl">
                      {project.title}
                    </h3>
                  </Link>
                );
              })}
            </div>

            <p className="proj-num mt-8 text-center text-sm tracking-[0.25em] text-[var(--text-muted)]">
              <span className="text-primary">{pad(activeIndex + 1)}</span> / {pad(filteredProjects.length)}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
