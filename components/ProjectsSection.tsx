"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import Image from "next/image";

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
    image: "/simaru.png",
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

      // Pinned Single Container Stack Effect
      const container = document.querySelector(".proj-container");
      const panels = gsap.utils.toArray<HTMLElement>(".proj-panel");

      if (container && panels.length > 0) {
        // Set initial states: all panels are stacked perfectly.
        gsap.set(panels, { yPercent: 0, transformOrigin: "top center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "center center",
            end: () => `+=${window.innerHeight * (panels.length - 0.5)}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        panels.forEach((panel, i) => {
          const img = panel.querySelector(".proj-image");
          const content = panel.querySelector(".proj-content");
          const elements = content ? gsap.utils.toArray(content.children) : [];
          const dimmer = panel.querySelector(".proj-dimmer");

          // Initial states for panels beneath the first one
          if (i > 0) {
            gsap.set(panel, { scale: 0.95 });
            gsap.set(dimmer, { opacity: 0.7 });
            // Start far below the panel's bottom edge so they emerge from below the image
            gsap.set(elements, { opacity: 0, y: 800 }); 
          } else {
            gsap.set(dimmer, { opacity: 0 });
            gsap.fromTo(
              elements,
              { opacity: 0, y: 100 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: container,
                  start: "top 75%",
                },
              }
            );
          }

          // 1. Current Panel Disappearing (Sliding UP out of view)
          if (i < panels.length - 1) {
            tl.to(
              panel,
              { yPercent: -100, duration: 1, ease: "none" },
              i
            );

            // Parallax image slides down slightly as panel slides up
            tl.to(
              img,
              { yPercent: 15, duration: 1, ease: "none" },
              i
            );
          }

          // 2. Next Panel Revealing (Scaling UP and brightening)
          if (i > 0) {
            tl.to(
              panel,
              { scale: 1, duration: 1, ease: "none" },
              i - 1
            );
            
            tl.to(
              dimmer,
              { opacity: 0, duration: 1, ease: "none" },
              i - 1
            );

            // Text elements are pulled up sequentially from below the image exactly as scroll begins
            tl.to(
              elements,
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.05, 
                ease: "none" 
              },
              i - 1 // pas baru discroll langsung ketarik
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section id="projects" ref={sectionRef} className="pt-24 md:pt-36 relative bg-black">
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
      `}</style>

      {/* Faint background index */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-32 text-[22vw] font-black text-white/[0.02] select-none leading-none pointer-events-none"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        04
      </span>

      <div className="section-container relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-14 md:mb-18 [@media(max-height:500px)]:mb-4">
          <div className="flex items-center gap-3 mb-4 [@media(max-height:500px)]:mb-2">
            <span className="proj-eyebrow font-mono text-xs tracking-[0.25em] uppercase text-primary">
              Selected Work
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-primary/60" />
          </div>
          <h2 className="proj-headline text-4xl md:text-6xl [@media(max-height:500px)]:text-2xl font-black tracking-tight leading-[1.05]">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </div>

        {/* ── Filter bar — industrial chip style ── */}
        <div className="proj-filters flex flex-wrap gap-2 mb-12 [@media(max-height:500px)]:mb-6">
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
      </div>

      {/* ── Projects Single Pinned Container (One Card Stack) ── */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <div className="proj-container relative w-full h-[75vh] md:h-[85vh] overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 bg-[#050505]">
        {filteredProjects.map((project, index) => {
          const accent = categoryColor[project.category] ?? "#1DCD9F";
          return (
            <div
              key={`${project.title}-${index}`}
              className="proj-panel absolute inset-0 w-full h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              style={{
                zIndex: filteredProjects.length - index,
              }}
            >
              {/* Dark overlay for dimming effect via GSAP */}
              <div className="proj-dimmer absolute inset-0 bg-black z-20 pointer-events-none" />

              {/* Parallax Image Background */}
              <div className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="proj-image object-cover filter grayscale-[30%] transition-all duration-700"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-black/50 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full px-6 md:px-16 py-12 [@media(max-height:500px)]:py-4 [@media(max-height:500px)]:px-6 flex flex-col justify-center">
                  <div className="proj-content max-w-4xl">
                    <span
                      className="inline-block px-3 py-1 mb-6 [@media(max-height:500px)]:mb-2 text-xs [@media(max-height:500px)]:text-[10px] font-mono tracking-widest uppercase rounded-sm border backdrop-blur-md"
                      style={{ color: accent, borderColor: accent + "40", backgroundColor: accent + "10" }}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-5xl md:text-8xl [@media(max-height:500px)]:text-3xl font-black text-white tracking-tight leading-[1] mb-6 [@media(max-height:500px)]:mb-2 drop-shadow-2xl">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-xl [@media(max-height:500px)]:text-[11px] [@media(max-height:500px)]:leading-snug leading-relaxed mb-10 [@media(max-height:500px)]:mb-4 max-w-2xl drop-shadow-lg font-medium">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-10 [@media(max-height:500px)]:mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs md:text-sm [@media(max-height:500px)]:text-[9px] [@media(max-height:500px)]:px-2 [@media(max-height:500px)]:py-1 font-mono text-white/80 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 [@media(max-height:500px)]:gap-2">
                      {project.links.live && project.links.live !== "#" && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 border border-white/40 px-6 py-3 [@media(max-height:500px)]:px-3 [@media(max-height:500px)]:py-1.5 text-xs md:text-sm [@media(max-height:500px)]:text-[10px] font-mono tracking-widest text-white hover:bg-white hover:text-black transition-colors rounded-sm"
                        >
                          FIND OUT MORE <FaArrowUpRightFromSquare />
                        </a>
                      )}
                      {project.links.github && project.links.github !== "#" && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 border border-white/40 px-6 py-3 [@media(max-height:500px)]:px-3 [@media(max-height:500px)]:py-1.5 text-xs md:text-sm [@media(max-height:500px)]:text-[10px] font-mono tracking-widest text-white hover:bg-white hover:text-black transition-colors rounded-sm"
                        >
                          GITHUB <FaGithub />
                        </a>
                      )}
                    </div>
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
