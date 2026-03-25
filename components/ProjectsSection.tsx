"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { Lens } from "@/components/ui/lens";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Articles Website",
    description:
      "Build a web application for Islamic news articles with a focus on user experience and accessibility. Designed a responsive layout and implemented key features such as article browsing, search, and categorization.",
    image: "/religi-id.png",
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    links: {
      github: "#",
      live: "https://religi.id",
    },
  },
  {
    title: "SIMARU API",
    description:
      "Built a RESTful API for a Hospital Asset Management System with a focus on reliability and scalability. Designed a database schema and implemented key modules such as asset lifecycle management, procurement, inventory auditing, and depreciation tracking.",
    image: "/simaru.png",
    category: "API",
    tags: ["TypeScript", "Express", "MySQL", "Sequelize"],
    links: {
      github: "https://github.com/fauzantaslim/api-simaru",
      live: "#",
    },
  },
  {
    title: "Asia Tiga Utama",
    description:
      "Build a company profile website for Asia Tiga Utama with a focus on user experience. Designed a responsive layout and implemented key features: company info, services, blog, portfolio, gallery, and contact.",
    image: "/asia-tiga-utama.png",
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Filament"],
    links: {
      live: "https://evenly.fauzantaslim.biz.id/",
      github: "https://github.com/fauzantaslim/asia-tiga-utama-company-profile",
    },
  },
  {
    title: "Finance Tracker API",
    description:
      "Build a RESTful API for a Finance Tracker App with modular architecture, JWT auth, and structured endpoints for transaction management.",
    image: "/finance-tracker.png",
    category: "API",
    tags: ["TypeScript", "Express", "MySQL", "Knex"],
    links: {
      github:
        "https://github.com/fauzantaslim/finance-tracker-app/tree/main/backend-finance-tracker",
      live: "#",
    },
  },
  {
    title: "Finance Tracker Web",
    description:
      "Build a Finance Tracker App with a focus on user experience. Implemented transaction tracking, budget management, and expense visualization with smooth interactive UI.",
    image: "/finance-tracker.png",
    category: "Web",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    links: {
      github:
        "https://github.com/fauzantaslim/finance-tracker-app/tree/main/finance-tracker-react",
      live: "#",
    },
  },
  {
    title: "Manual Test SIMARU Web",
    description:
      "Write a manual test case for SIMARU Web",
    image: "/finance-tracker.png",
    category: "Manual Test",
    tags: ["Manual Test", "Test Case"],
    links: {
      live: "https://shorturl.at/smXcw",
    },
  },
];

const categories = ["All", "Web", "API", "Manual Test", "Automation Test", "Bug Reporting"];

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

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-eyebrow",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
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

      gsap.fromTo(
        ".proj-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards whenever filter changes
  useEffect(() => {
    gsap.fromTo(
      ".proj-card",
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeFilter]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden">
      <style>{`
        .proj-card {
          will-change: transform, opacity;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .proj-card:hover {
          border-color: rgba(29,205,159,0.25);
          box-shadow: 0 0 40px rgba(29,205,159,0.08), 0 20px 60px rgba(0,0,0,0.4);
        }
        .proj-num {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
        }
        .proj-filter-btn {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          transition: all 0.2s ease;
        }
      `}</style>

      {/* Faint background index */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[22vw] font-black text-white/[0.02] select-none leading-none pointer-events-none"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        04
      </span>

      <div className="section-container relative z-10">
        {/* ── Header ── */}
        <div className="mb-14 md:mb-18">
          <div className="flex items-center gap-3 mb-4">
            <span className="proj-eyebrow font-mono text-xs tracking-[0.25em] uppercase text-primary">
              Selected Work
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-primary/60" />
          </div>
          <h2 className="proj-headline text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </div>

        {/* ── Filter bar — industrial chip style ── */}
        <div className="proj-filters flex flex-wrap gap-2 mb-12">
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
                onClick={() => setActiveFilter(cat)}
                className="proj-filter-btn inline-flex items-center gap-2 px-3 py-1.5 uppercase cursor-pointer"
                style={{
                  border: `1px solid ${isActive ? accent : accent + "28"}`,
                  backgroundColor: isActive ? accent + "18" : accent + "08",
                  borderRadius: "4px",
                  color: isActive ? accent : "#ffffff80",
                  boxShadow: isActive ? `0 0 12px ${accent}33` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = accent + "55";
                    (e.currentTarget as HTMLElement).style.color = "#ffffffcc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = accent + "28";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff80";
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

        {/* ── Projects Grid ── */}
        <div className="proj-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const accent = categoryColor[project.category] ?? "#1DCD9F";
            return (
              <div
                key={`${project.title}-${index}`}
                className="proj-card group flex flex-col rounded-xl bg-white/[0.02] border border-white/8 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Lens zoomFactor={2} lensSize={150} isStatic={false} ariaLabel="Zoom Area">
                    <div className="relative h-48 w-full">
                      <div className="absolute inset-0 bg-primary/15 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                  </Lens>

                  {/* Category chip on image */}
                  <span
                    className="absolute top-3 left-3 z-20 text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm pointer-events-none"
                    style={{
                      backgroundColor: accent + "22",
                      color: accent,
                      border: `1px solid ${accent}44`,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {project.category}
                  </span>

                  {/* Link buttons */}
                  <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {project.links.live && project.links.live !== "#" && (
                      <a
                        href={project.links.live}
                        className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(29,205,159,0.4)]"
                        aria-label="View live site"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaArrowUpRightFromSquare className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                    {project.links.github && project.links.github !== "#" && (
                      <a
                        href={project.links.github}
                        className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(29,205,159,0.4)]"
                        aria-label="View source code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Index + Title */}
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="proj-num text-primary/40 text-xs font-bold shrink-0"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-white/50 text-xs leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.6rem] font-mono text-primary/70 bg-primary/5 px-2 py-0.5 rounded-sm border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
