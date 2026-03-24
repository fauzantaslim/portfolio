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
    description:"Built a RESTful API for a Hospital Asset Management System with a focus on reliability and scalability. Designed a database schema and implemented key modules such as asset lifecycle management, procurement, inventory auditing, and depreciation tracking. Applied role-based authentication, developed integration tests, and created test scenarios to ensure system stability.",
    image: "/simaru.png",
    category: "API",
    tags: ["Typescript", "Express", "Mysql", "Sequelize"],
    links: {
      github: "https://github.com/fauzantaslim/api-simaru",
      live: "#",
    },
  },
  {
    title: "Asia Tiga Utama Company Profile",
    description: "Build a company profile website for Asia Tiga Utama with a focus on user experience and accessibility. Designed a responsive layout and implemented key features such as company information, services,, blog, portfolio, gallery, and contact.",
    image: "/asia-tiga-utama.png",
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Filament"],
    links: {
      live: "https://evenly.fauzantaslim.biz.id/",
      github: "https://github.com/fauzantaslim/asia-tiga-utama-company-profile",
    },
  },
  {
    title: "Finance Tracker App API",
    description: "Build a RESTful API for a Finance Tracker App",
    image: "/finance-tracker.png",
    category: "API",
    tags: ["Typescript", "Express", "Mysql", "Knex"],
    links: {
      github: "https://github.com/fauzantaslim/finance-tracker-app/tree/main/backend-finance-tracker",
      live: "#",
    },
  },
  {
    title: "Finance Tracker Web App",
    description: "Build a Finance Tracker App with a focus on user experience and accessibility. Designed a responsive layout and implemented key features such as transaction tracking, budget management, and expense visualization.",
    image: "/finance-tracker.png",
    category: "Web",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    links: {
      github: "https://github.com/fauzantaslim/finance-tracker-app/tree/main/finance-tracker-react",
      live: "#",
    },
  },
];

const categories = ["All", "Web", "API", "Manual Test", "Automation Test", "Bug Reporting"];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".proj-title",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".proj-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".proj-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="proj-title text-primary font-mono text-sm tracking-widest uppercase mb-3">
            Selected Work
          </p>
          <h2 className="proj-title text-3xl md:text-5xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-primary text-black shadow-[0_0_15px_rgba(29,205,159,0.3)]"
                    : "bg-card-bg border border-card-border text-neutral-light hover:border-primary/50 hover:text-white"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="proj-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="proj-card group rounded-2xl bg-card-bg border border-card-border overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(29,205,159,0.1)] flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full">
                <div className="absolute inset-0">
                  <Lens zoomFactor={2} lensSize={150} isStatic={false} ariaLabel="Zoom Area">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" aria-hidden="true" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover filter grayscale group-hover:grayscale-0"
                      />
                    </div>
                  </Lens>
                </div>
                
                {/* Floating Links on Hover */}
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-auto">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(29,205,159,0.4)]"
                      aria-label="View live site"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaArrowUpRightFromSquare className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(29,205,159,0.4)]"
                      aria-label="View source code"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-5 h-5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors pr-6">
                    {project.title}
                  </h3>
                </div>

                <p className="text-neutral-light/80 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-card-border">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
