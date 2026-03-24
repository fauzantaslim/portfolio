"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "RS UMMI Bogor",
    role: "Backend Developer Internship",
    period: "Feb 2025 - Jul 2025",
    location: "Bogor, Indonesia",
    description: [
      "Developed a backend service (REST API) for a Hospital Asset Management System to track, manage, and monitor medical and non-medical assets across multiple locations, and designed the database schema consisting of 45+ tables to support the entire asset management workflow",
      "Built core business modules including asset lifecycle management, procurement workflow, inventory auditing (stock opname), and asset depreciation tracking",
      "Implemented user authentication, role-based access control, and security configurations to ensure data protection and access management",
      "Created and executed test scenarios and test cases for each module, and wrote automated integration tests to ensure system reliability and minimize production bugs",
      "Integrated third-party services including push notifications (WhatsApp), QR code generation, API documentation, and Excel based reporting to support daily operational needs"
    ],
    tags: ["REST API", "Database Design", "Typescript", "Integration Testing", "API Documentation"],
  },
  {
    company: "Robinson Mart, Mall BTM",
    role: "Staff Warehouse Intern",
    period: "Mar 2021 - May 2022",
    location: "Bogor, Indonesia",
    description: [
      "Managed daily inventory operations including stock receiving, storage, and processing to ensure timely product availability on the sales floor",
      "Handled product return processes using Warehouse Management System (WMS), ensuring accurate data entry and stock reconciliation",
      "Assisted in optimizing storage layouts to improve picking efficiency and maximize warehouse space utilization",
      "Collaborated with warehouse and store teams to maintain seamless workflows, minimize stock discrepancies, and support smooth daily operations"
    ],
    tags: ["WMS", "Inventory Management", "Operations", "Team Collaboration"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".exp-title",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".exp-card",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-timeline",
            start: "top 80%",
          },
        }
      );

      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".exp-timeline",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-dark/30 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="exp-title text-primary font-mono text-sm tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="exp-title text-3xl md:text-5xl font-bold">
            Work <span className="text-primary">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="exp-timeline relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top" aria-hidden="true" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="exp-card relative pl-12 md:pl-20">
                {/* Dot */}
                <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(29,205,159,0.5)]" aria-hidden="true" />

                <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-card-border hover:border-primary/20 transition-all duration-500 group hover:shadow-[0_0_40px_rgba(29,205,159,0.06)]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-primary/80 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 text-sm text-neutral-light">
                      <span className="flex items-center gap-1">
                        <FaCalendarDays className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaLocationDot className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="text-neutral-light/80 leading-relaxed mb-6 space-y-3">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary mt-2 min-w-[6px] h-[6px] rounded-full bg-primary inline-block shrink-0"></span>
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
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
      </div>
    </section>
  );
}
