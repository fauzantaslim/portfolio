"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const navLinks = [
  { label: "Home",       href: "#hero",       idx: "00" },
  { label: "About",      href: "#about",      idx: "01" },
  { label: "Stack",      href: "#stack",      idx: "02" },
  { label: "Experience", href: "#experience", idx: "03" },
  { label: "Projects",   href: "#projects",   idx: "04" },
  { label: "Contact",    href: "#contact",    idx: "05" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll + active section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance: stagger links + logo
  useEffect(() => {
    if (!navRef.current) return;
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }
    ).fromTo(
      ".nav-link-item",
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <style>{`
        .nav-link-item {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          position: relative;
        }
        .nav-link-item .nav-idx {
          font-size: 0.55rem;
          transition: opacity 0.2s ease;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: #1DCD9F;
          transition: width 0.25s ease;
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after {
          width: 100%;
        }
        .nav-link-item.active {
          color: #1DCD9F;
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #1DCD9F;
          transition: all 0.3s ease;
          transform-origin: center;
        }
      `}</style>

      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-3 relative z-50 transition-transform hover:scale-[1.03] duration-300"
        >
          <Image
            src="/logo-fauzan.svg"
            alt="Fauzan Logo"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto object-contain bg-white hover:bg-[#1DCD9F] rounded-lg shadow-sm transition-colors duration-300"
            priority
          />
          <span
            className="text-xl font-bold tracking-tight hidden sm:block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[#1DCD9F]">F</span>
            <span className="text-white">auzan</span>
            <span className="text-[#1DCD9F]">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`nav-link-item uppercase flex items-center gap-1.5 text-neutral-light hover:text-primary transition-colors duration-200 ${
                  isActive ? "active" : ""
                }`}
              >
                <span className="nav-idx text-primary/40">{link.idx}</span>
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative z-50"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <span
            className="hamburger-line"
            style={{ transform: isMobileOpen ? "rotate(45deg) translateY(5px)" : "none" }}
          />
          <span
            className="hamburger-line"
            style={{ opacity: isMobileOpen ? 0 : 1 }}
          />
          <span
            className="hamburger-line"
            style={{ transform: isMobileOpen ? "rotate(-45deg) translateY(-5px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-container flex flex-col gap-1 py-6 border-t border-white/8 mt-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex items-center gap-3 py-2.5 text-sm transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-white/60 hover:text-white"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-primary/40 text-xs">{link.idx}</span>
                <span className="uppercase tracking-wider text-xs">{link.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
