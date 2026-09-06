"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";

const navLinks = [
  { label: "Home",       href: "#hero",       idx: "00" },
  { label: "About",      href: "#about",      idx: "01" },
  { label: "Stack",      href: "#stack",      idx: "02" },
  { label: "Experience", href: "#experience", idx: "03" },
  { label: "Projects",   href: "#projects",   idx: "04" },
  { label: "Contact",    href: "#contact",    idx: "05" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-toggle-btn relative w-8 h-8 rounded-lg flex items-center justify-center"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className="absolute inset-0 rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-primary/8 transition-all duration-200"
      />
      <span className="relative z-10 transition-all duration-300">
        {isDark ? (
          <FaSun className="w-3.5 h-3.5 text-primary" />
        ) : (
          <FaMoon className="w-3.5 h-3.5 text-primary" />
        )}
      </span>
    </button>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  // ESC key closes mobile menu (WCAG 2.1.2 — No Keyboard Trap)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen]);

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

  const isLight = mounted && resolvedTheme === "light";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      aria-label="Main navigation"
    >
      {/* Header bar with its own solid background */}
      <div
        className={`transition-all duration-500 ${
          isScrolled || isMobileOpen
            ? isLight
              ? "bg-white/85 backdrop-blur-xl border-b border-black/8 py-3"
              : "bg-black/80 backdrop-blur-xl border-b border-primary/10 py-3"
            : "bg-transparent py-5"
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
        .hamburger-btn {
          display: block;
          position: relative;
          width: 22px;
          height: 16px;
        }
        .hamburger-line {
          display: block;
          position: absolute;
          left: 0;
          width: 22px;
          height: 1.5px;
          background: #1DCD9F;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center center;
        }
        .hamburger-line:nth-child(1) { top: 0px; }
        .hamburger-line:nth-child(2) { top: 7.25px; }
        .hamburger-line:nth-child(3) { top: 14.5px; }
        .theme-toggle-btn {
          transition: none;
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
            <span className="dark:text-white text-neutral-dark">auzan</span>
            <span className="text-[#1DCD9F]">.</span>
          </span>
        </a>

        {/* Desktop Links + Theme Toggle */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link-item uppercase dark:text-neutral-light text-neutral-gray hover:text-primary transition-colors duration-200 ${
                  isActive ? "active" : ""
                }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 relative z-50"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="hamburger-btn">
              <span
                className="hamburger-line"
                style={{
                  transform: isMobileOpen
                    ? "translateY(7.25px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="hamburger-line"
                style={{ opacity: isMobileOpen ? 0 : 1, transform: "none" }}
              />
              <span
                className="hamburger-line"
                style={{
                  transform: isMobileOpen
                    ? "translateY(-7.25px) rotate(-45deg)"
                    : "none",
                }}
              />
            </span>
          </button>
        </div>
      </div>
      </div> {/* end header bar */}

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-modal="false"
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-container glass flex flex-col gap-1 py-6 border-t border-primary/10 mt-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`flex items-center gap-3 py-2.5 text-sm transition-colors duration-200 ${
                  isActive ? "text-primary" : "dark:text-white/60 text-black/60 hover:text-primary"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
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
