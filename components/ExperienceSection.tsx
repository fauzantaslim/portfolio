"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

type TagCategory = "api" | "test" | "db" | "ops" | "collab";

const tagMeta: Record<TagCategory, string> = {
  api:    "#38bdf8",
  test:   "#fb923c",
  db:     "#a78bfa",
  ops:    "#f43f5e",
  collab: "#facc15",
};

type ExpTag = { label: string; cat: TagCategory };

const experiences: {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  tags: ExpTag[];
}[] = [
  {
    company: "RS UMMI Bogor",
    role: "Backend Developer Internship",
    type: "Internship",
    period: "Feb 2025 – Jul 2025",
    location: "Bogor, Indonesia",
    description: [
      "Developed a REST API for a Hospital Asset Management System; designed a table database schema supporting the full asset management workflow.",
      "Built core business modules: asset lifecycle management, procurement workflow, inventory auditing (stock opname), and depreciation assets.",
      "Implemented role-based access control, user authentication, and security configurations for data protection.",
      "Created and executed test scenarios per module; wrote automated integration tests to ensure system reliability.",
      "Integrated push notifications (WhatsApp), QR code generation, API documentation, and Excel-based reporting.",
    ],
    tags: [
      { label: "REST API",            cat: "api"  },
      { label: "DB Design",           cat: "db"   },
      { label: "TypeScript",          cat: "api"  },
      { label: "Integration Testing", cat: "test" },
      { label: "API Docs",            cat: "ops"  },
    ],
  },
  {
    company: "Robinson Mart, Mall BTM",
    role: "Staff Warehouse Intern",
    type: "Internship",
    period: "Mar 2021 – May 2022",
    location: "Bogor, Indonesia",
    description: [
      "Managed daily inventory operations: stock receiving, storage, and processing for timely product floor availability.",
      "Handled product return processes using a Warehouse Management System (WMS), ensuring accurate data entry and reconciliation.",
      "Assisted in optimizing storage layouts to improve picking efficiency and maximize space utilization.",
      "Collaborated with warehouse and store teams to minimize stock discrepancies and support smooth daily operations.",
    ],
    tags: [
      { label: "WMS",                cat: "ops"    },
      { label: "Inventory Mgmt",     cat: "db"     },
      { label: "Operations",         cat: "ops"    },
      { label: "Team Collaboration", cat: "collab" },
    ],
  },
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
      const dots  = gsap.utils.toArray<HTMLElement>(".timeline-dot");

      // Set transform origin so scaling down doesn't shift the top edge
      gsap.set(cards, { transformOrigin: "top center" });
      gsap.set(cards[0], { yPercent: 0, y: 0, opacity: 1, scale: 1 });
      gsap.set(cards.slice(1), { yPercent: 120, y: 0, opacity: 0, scale: 1 });
      gsap.set(dots, { backgroundColor: "#1e1e1e" });
      gsap.set(dots[0], { backgroundColor: "#1dcd9f", scale: 1.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * cards.length}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      const totalDuration = (cards.length - 1) * 2;
      tl.to(".timeline-progress", { scaleY: 1, duration: totalDuration || 1, ease: "none" }, 0);

      cards.forEach((card, index) => {
        const startTime = index * 2;

        if (index > 0) {
          // Slide in new card
          tl.to(card, { yPercent: 0, y: 0, opacity: 1, duration: 1, ease: "power2.out" }, startTime);
          tl.to(dots[index], { backgroundColor: "#1dcd9f", scale: 1.2, duration: 0.1 }, startTime);
          tl.to(dots[index - 1], { scale: 1, duration: 0.1 }, startTime);
        }

        // Push previous cards up into a visible stack
        for (let j = 0; j < index; j++) {
          const stackPos = index - j; 
          tl.to(
            cards[j],
            {
              y: -(stackPos * 70), // Push up by 70px to keep the header visible
              scale: 1 - (stackPos * 0.04), // Shrink slightly to create depth
              opacity: Math.max(1 - (stackPos * 0.3), 0.2), // Fade out gradually but keep visible
              duration: 1,
              ease: "power2.out"
            },
            startTime
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative z-20 bg-black">
      <style>{`
        .exp-tag {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.07em;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 3px;
        }
        .exp-bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1DCD9F;
          margin-top: 9px;
          flex-shrink: 0;
        }
        .exp-type-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 2px;
          border: 1px solid rgba(29,205,159,0.3);
          color: #1DCD9F;
          background: rgba(29,205,159,0.08);
        }
      `}</style>

      {/* Single container — pinned GSAP on all screen sizes */}
      <div
        ref={containerRef}
        className="py-16 md:py-24 [@media(max-height:500px)]:py-6 relative min-h-screen w-full flex flex-col items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-dark/20 to-transparent pointer-events-none" />

        <div className="section-container relative z-10 w-full flex flex-col items-center flex-grow h-full">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24 [@media(max-height:500px)]:mb-6 shrink-0 z-50">
            <div className="flex items-center justify-center gap-3 mb-4 [@media(max-height:500px)]:mb-2">
              <div className="h-px w-12 bg-primary/60" />
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary">
                Experience
              </span>
              <div className="h-px w-12 bg-primary/60" />
            </div>
            <h2 className="text-3xl md:text-5xl [@media(max-height:500px)]:text-2xl font-black tracking-tight">
              Work <span className="text-primary">Experience</span>
            </h2>
          </div>

          {/* Main content — timeline left + cards right, on all screen sizes */}
          <div className="relative w-full max-w-7xl mx-auto flex flex-row gap-4 md:gap-12 flex-grow h-[70vh] min-h-[400px] max-h-[580px] md:h-[500px] px-2 md:px-0">

            {/* Timeline sidebar — visible on all screens */}
            <div className="flex flex-col items-center py-6 md:py-10 relative z-50 w-6 md:w-8 shrink-0">
              <div
                className="absolute top-6 bottom-6 md:top-10 md:bottom-10 left-1/2 -translate-x-1/2 w-px bg-white/10"
                aria-hidden="true"
              />
              <div
                className="timeline-progress absolute top-6 bottom-6 md:top-10 md:bottom-10 left-1/2 -translate-x-1/2 w-px bg-primary origin-top scale-y-0 shadow-[0_0_15px_rgba(29,205,159,0.8)]"
                aria-hidden="true"
              />
              <div className="flex flex-col justify-between items-center relative z-10 h-full">
                {experiences.map((_, i) => (
                  <div
                    key={i}
                    className="timeline-dot w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white/10 z-10 shadow-lg border-2 border-black"
                  />
                ))}
              </div>
            </div>

            {/* Cards stack */}
            <div className="relative w-full max-w-6xl flex-grow h-full">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="exp-card absolute top-0 left-0 w-full h-full p-5 md:p-8 [@media(max-height:500px)]:p-4 rounded-2xl bg-[#0a0a0a] border border-white/8 shadow-[0_-20px_60px_rgba(0,0,0,0.6)] flex flex-col"
                  style={{ zIndex: index + 1 }}
                >
                  {/* Card header */}
                  <div className="flex flex-col gap-2 mb-4 md:mb-5 [@media(max-height:500px)]:mb-2 shrink-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="text-base md:text-2xl [@media(max-height:500px)]:text-sm font-black text-white leading-tight mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-primary font-semibold text-sm md:text-base [@media(max-height:500px)]:text-xs">{exp.company}</p>
                      </div>
                      <span className="exp-type-badge shrink-0 [@media(max-height:500px)]:text-[0.5rem]">{exp.type}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/45 border-b border-white/8 pb-3 md:pb-4 mt-1">
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <FaCalendarDays className="w-3 h-3 text-primary/60" />
                        {exp.period}
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <FaLocationDot className="w-3 h-3 text-primary/60" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-grow overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
                    <ul className="space-y-2 md:space-y-3 [@media(max-height:500px)]:space-y-1">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 [@media(max-height:500px)]:gap-2">
                          <span className="exp-bullet" aria-hidden="true" />
                          <span className="text-white/60 text-xs md:text-sm [@media(max-height:500px)]:text-[10px] [@media(max-height:500px)]:leading-tight leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 pt-3 md:pt-5 mt-3 md:mt-4 border-t border-white/8 shrink-0">
                    {exp.tags.map(({ label, cat }) => (
                      <span
                        key={label}
                        className="exp-tag"
                        style={{
                          color: tagMeta[cat],
                          backgroundColor: tagMeta[cat] + "14",
                          border: `1px solid ${tagMeta[cat]}30`,
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}