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
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
      const dots = gsap.utils.toArray<HTMLElement>(".timeline-dot");

      // Initial state: first card visible, the rest are pushed down below the viewport
      gsap.set(cards[0], { yPercent: 0, opacity: 1, scale: 1 });
      gsap.set(cards.slice(1), { yPercent: 120, opacity: 0, scale: 1 });
      gsap.set(dots, { backgroundColor: "#1e1e1e" }); 
      gsap.set(dots[0], { backgroundColor: "#1dcd9f", scale: 1.2 }); 

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top", // Pin exactly when container hits top of viewport
          end: () => `+=${window.innerHeight * cards.length}`, // Dynamic scroll distance based on viewport height
          pin: true,
          pinSpacing: true, // Crucial: dynamically pads the pin spacer to push sections below
          scrub: 1,
          invalidateOnRefresh: true, // Recalculate on window resize
        }
      });

      // Animate the timeline progress bar scaling vertically over the total scroll
      const totalDuration = (cards.length - 1) * 2;
      tl.to(".timeline-progress", {
        scaleY: 1,
        duration: totalDuration || 1, // fallback to avoid 0 duration
        ease: "none"
      }, 0);

      cards.forEach((card, index) => {
        const startTime = index * 2; // Time marker for this card's activation

        // Slide up the current card (if it's not the first one)
        if (index > 0) {
          tl.to(card, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          }, startTime);

          // Animate the corresponding timeline dot actively
          tl.to(dots[index], {
            backgroundColor: "#1dcd9f",
            scale: 1.2,
            duration: 0.1,
          }, startTime);
          
          // Optionally scale down the previous dot slightly
          tl.to(dots[index - 1], {
            scale: 1,
            duration: 0.1,
          }, startTime);
        }

        // Scale down and fade this card when the NEXT card slides up
        if (index < cards.length - 1) {
          tl.to(card, {
            scale: 0.95,
            opacity: 0.4,
            yPercent: -5,
            duration: 1, 
            ease: "power2.inOut"
          }, startTime + 2); 
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative z-20 bg-black">
      {/* 
        We wrap the entire animated content block in containerRef. 
        When GSAP pins this container, it creates a pin-spacer INSIDE the section.
        This allows the spacer's height to expand the <section> normally in the Next.js flex column,
        pushing footer/contact/projects cleanly out of the way.
      */}
      <div ref={containerRef} className="py-16 md:py-24 relative min-h-screen w-full flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-dark/20 to-transparent pointer-events-none" />

        <div className="section-container relative z-10 w-full flex flex-col items-center flex-grow h-full">
          {/* Section header */}
          <div className="text-center mb-10 shrink-0 z-50">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-3 text-shadow">
              Experience
            </p>
            <h2 className="text-3xl md:text-5xl font-bold">
              Work <span className="text-primary">Experience</span>
            </h2>
          </div>

          {/* Main Content Flex */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12 flex-grow h-[650px] md:h-[500px] px-4 md:px-0">
            
            {/* Vertical Timeline Indicator (Desktop Only) */}
            <div className="hidden md:flex flex-col items-center py-10 relative z-50 w-8 shrink-0">
               {/* Background Track Line */}
               <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-px bg-card-border" aria-hidden="true" />
               {/* Active Progress Line */}
               <div className="timeline-progress absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-px bg-primary origin-top scale-y-0 shadow-[0_0_15px_rgba(29,205,159,0.8)]" aria-hidden="true" />
               
               {/* Timeline Dots Container */}
               <div className="flex flex-col justify-between items-center relative z-10 h-full">
                  {experiences.map((_, i) => (
                     <div
                       key={i} 
                       className="timeline-dot w-4 h-4 rounded-full bg-card-border z-10 shadow-lg border-[3px] border-black transition-colors duration-300" 
                     />
                  ))}
               </div>
            </div>

            {/* Cards Stack Container */}
            <div className="relative w-full max-w-4xl flex-grow h-full">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className="exp-card absolute top-0 left-0 w-full h-full p-6 md:p-10 rounded-3xl bg-card-bg border border-card-border shadow-[0_-15px_40px_rgba(0,0,0,0.5)] flex flex-col"
                  style={{ zIndex: index + 1 }}
                >
                  <div className="flex flex-col gap-2 mb-6 shrink-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-white transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-medium text-lg">{exp.company}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-light mt-2 border-b border-card-border pb-4">
                      <span className="flex items-center gap-2">
                        <FaCalendarDays className="w-4 h-4 text-primary/70" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaLocationDot className="w-4 h-4 text-primary/70" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="text-neutral-light/80 leading-relaxed space-y-4">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary mt-2 min-w-[6px] h-[6px] rounded-full bg-primary inline-block shrink-0"></span>
                          <span className="text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-card-border shrink-0">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-mono rounded-lg bg-primary/5 text-primary border border-primary/20"
                      >
                        {tag}
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
