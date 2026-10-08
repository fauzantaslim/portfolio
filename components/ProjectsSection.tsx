"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects-data";

import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

const categories = ["All", "Web", "API", "Manual Test", "Automation Test", "Bug Reporting"];

const VISIBLE_LAYERS = 3;
const CARD_SIZE = 90; // % of stack size (matches card width/height below)
const LAYER_OFFSET_X = 6; // % of card width to shift right
const LAYER_OFFSET_Y = 8; // % of card height to shift up
const LAYER_SCALE_STEP = 0.05;
const DIM_STEP = 0.4;
const FLY_OUT = 0.4;
const FLY_IN = 0.5;
const SHIFT = 0.5;
const pad = (n: number) => String(n).padStart(2, "0");

const poseAtDepth = (depth: number, opacity: number) => {
  return {
    x: 0,
    y: 0,
    rotation: 0,
    xPercent: depth * LAYER_OFFSET_X,
    yPercent: -depth * LAYER_OFFSET_Y,
    scale: 1 - depth * LAYER_SCALE_STEP,
    opacity,
  };
};
const cardPose = (layer: number) =>
  poseAtDepth(Math.min(layer, VISIBLE_LAYERS - 1), layer < VISIBLE_LAYERS ? 1 : 0);
const dimFor = (layer: number) => Math.min(layer, VISIBLE_LAYERS - 1) * DIM_STEP;
const getCards = (root: HTMLElement | null) =>
  Array.from(root?.querySelectorAll<HTMLElement>(".proj-card") ?? []);

const categoryColor: Record<string, string> = {
  Web: "#22c55e",
  API: "#38bdf8",
  "Manual Test": "#a78bfa",
  "Automation Test": "#fb923c",
  "Bug Reporting": "#f43f5e",
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackWrapRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const animatingRef = useRef(false);
  const activeRef = useRef(0);
  const dragState = useRef({ isDragging: false, startX: 0, hasDragged: false });
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (dragState.current.hasDragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const filteredProjects = (
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)
  ).slice().reverse();

  useLayoutEffect(() => {
    tlRef.current?.kill();
    activeRef.current = 0;
    const cards = getCards(stackRef.current);
    
    if (cards.length === 0) {
      animatingRef.current = false;
      return;
    }

    animatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
      }
    });
    tlRef.current = tl;

    cards.forEach((card, i) => {
      const pose = cardPose(i);
      const z = cards.length - i;
      const dim = card.querySelector(".proj-card-dim");
      
      tl.fromTo(card, 
        { ...pose, yPercent: pose.yPercent - 40, opacity: 0, zIndex: z },
        { ...pose, opacity: pose.opacity, duration: 0.6, ease: "back.out(1.2)" },
        i * 0.12
      );
      
      if (dim) {
        tl.fromTo(dim, 
          { opacity: 0 },
          { opacity: dimFor(i), duration: 0.6, ease: "power2.out" },
          i * 0.12
        );
      }
    });
  }, [activeFilter]);

  const goTo = useCallback((dir: 1 | -1, customFlyOutX?: number) => {
    const cards = getCards(stackRef.current);
    const n = cards.length;
    const ctx = ctxRef.current;
    if (n < 2 || animatingRef.current || !ctx) return;

    animatingRef.current = true;
    const from = activeRef.current;
    const to = (from + dir + n) % n;
    activeRef.current = to;
    setActiveIndex(to);

    ctx.add(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false;
        },
      });
      tlRef.current = tl;

      cards.forEach((card, i) => {
        const layer = (i - to + n) % n;
        const pose = cardPose(layer);
        const z = n - layer;
        const dim = card.querySelector(".proj-card-dim");
        const isOutgoing = dir === 1 && i === from;
        const isIncoming = dir === -1 && i === to;

        if (isOutgoing) {
          const xOut = customFlyOutX !== undefined ? customFlyOutX : (dir === 1 ? -110 : 110);
          const rotOut = customFlyOutX !== undefined ? (customFlyOutX > 0 ? 10 : -10) : (dir === 1 ? -10 : 10);
          tl.set(card, { zIndex: n + 1 }, 0)
            .to(card, { xPercent: xOut, rotation: rotOut, opacity: 0, duration: FLY_OUT, ease: "power2.in" }, 0)
            .set(card, { ...pose, opacity: 0, zIndex: z }, FLY_OUT)
            .to(card, { opacity: pose.opacity, duration: 0.3, ease: "power1.out" }, FLY_OUT);
          if (dim) tl.set(dim, { opacity: dimFor(layer) }, FLY_OUT);
          return;
        }

        if (isIncoming) {
          gsap.set(card, { zIndex: n + 1, x: 0, y: 0, xPercent: -110, yPercent: 0, scale: 1, rotation: -10, opacity: 0 });
          tl.to(card, { ...pose, duration: FLY_IN, ease: "power3.out" }, 0).set(card, { zIndex: z }, FLY_IN);
        } else {
          const prevLayer = (i - from + n) % n;
          const entersStack = prevLayer >= VISIBLE_LAYERS && layer < VISIBLE_LAYERS;
          const leavesStack = prevLayer < VISIBLE_LAYERS && layer >= VISIBLE_LAYERS;
          tl.set(card, { zIndex: z }, 0);
          if (entersStack) {
            tl.fromTo(card, poseAtDepth(VISIBLE_LAYERS, 0), { ...pose, duration: FLY_IN, ease: "power3.out" }, 0);
          } else if (leavesStack) {
            tl.to(card, { ...poseAtDepth(VISIBLE_LAYERS, 0), duration: SHIFT, ease: "power3.in" }, 0)
              .set(card, pose, SHIFT);
          } else {
            tl.to(card, { ...pose, duration: SHIFT, ease: "power3.out" }, 0);
          }
        }
        if (dim) tl.to(dim, { opacity: dimFor(layer), duration: SHIFT, ease: "power3.out" }, 0);
      });
    });
  }, []);

  useEffect(() => {
    const wrap = stackWrapRef.current;
    if (!wrap) return;

    let inView = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );
    io.observe(wrap);

    const obs = Observer.create({
      target: wrap,
      type: "touch,pointer",
      dragMinimum: 5,
      onPress: (self) => {
        dragState.current.hasDragged = false;
        dragState.current.startX = self.x;
      },
      onDragStart: () => {
        dragState.current.isDragging = true;
        dragState.current.hasDragged = true;
      },
      onDrag: (self) => {
        if (animatingRef.current || !dragState.current.isDragging) return;
        const cards = getCards(stackRef.current);
        if (cards.length < 2) return;
        const dx = self.x - dragState.current.startX;
        const front = cards[activeRef.current];
        if (front) {
          gsap.set(front, { x: dx, rotation: dx * 0.04 });
        }
      },
      onDragEnd: (self) => {
        if (!dragState.current.isDragging) return;
        dragState.current.isDragging = false;
        
        if (animatingRef.current) return;
        
        const cards = getCards(stackRef.current);
        if (cards.length < 2) return;

        const dx = self.x - dragState.current.startX;
        const velocity = self.velocityX;
        
        if (dx < -40 || velocity < -200) {
          goTo(1, -110);
        } else if (dx > 40 || velocity > 200) {
          goTo(1, 110);
        } else {
          const cards = getCards(stackRef.current);
          const front = cards[activeRef.current];
          if (front) {
            gsap.to(front, { x: 0, rotation: 0, duration: 0.4, ease: "power3.out" });
          }
        }
      }
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (!inView || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      goTo(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      io.disconnect();
      obs.kill();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goTo]);

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
    ctxRef.current = ctx;

    return () => {
      tlRef.current?.kill();
      ctxRef.current = null;
      ctx.revert();
    };
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
          aspect-ratio: 4 / 5;
          touch-action: pan-y;
        }
        @media (min-width: 768px) {
          .proj-stack-size { aspect-ratio: 16 / 9; }
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
      <div ref={stackWrapRef} onClickCapture={onClickCapture} className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-32 [@media(max-height:500px)]:mb-12">
        {filteredProjects.length === 0 ? (
          <div className="proj-stack-size mx-auto flex items-center justify-center rounded-2xl border border-dashed border-black/15 dark:border-white/15">
            <p className="proj-num text-xs tracking-widest uppercase text-[var(--text-muted)]">
              No projects in this category yet
            </p>
          </div>
        ) : (
          <>
            <div key={activeFilter} ref={stackRef} className="proj-stack proj-stack-size relative mx-auto">
              {filteredProjects.map((project, index) => {
                const layer = (index - activeIndex + filteredProjects.length) % filteredProjects.length;
                const isFront = layer === 0;
                const accent = categoryColor[project.category] ?? "#1DCD9F";
                const initial = cardPose(index);

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    draggable={false}
                    aria-label={`View details for ${project.title}`}
                    tabIndex={isFront ? 0 : -1}
                    className={`proj-card absolute block select-none overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 dark:border-white/10 bg-gray-200 dark:bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.45)] ${isFront ? "" : "pointer-events-none"}`}
                    style={{
                      width: `${CARD_SIZE}%`,
                      height: `${CARD_SIZE}%`,
                      left: "5%",
                      top: "5%",
                      transformOrigin: "center center",
                      transform: `translate(${initial.xPercent}%, ${initial.yPercent}%) scale(${initial.scale})`,
                      opacity: initial.opacity,
                      zIndex: filteredProjects.length - index,
                    }}
                  >
                    <Image
                      src={project.images[0]}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 60vw, 90vw"
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div
                      className="proj-card-dim absolute inset-0 bg-black pointer-events-none"
                      style={{ opacity: dimFor(index) }}
                    />
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
