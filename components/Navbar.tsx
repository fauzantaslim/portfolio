"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-3 relative z-50 transition-transform hover:scale-105 duration-300"
        >
          <Image 
            src="/logo-fauzan.svg" 
            alt="Fauzan Logo" 
            width={120} 
            height={40} 
            className="h-8 md:h-10 w-auto object-contain bg-white hover:bg-[#1DCD9F] rounded-lg shadow-sm"
            priority
          />
          <span className="text-2xl font-bold tracking-tight transition-colors">
              <span className="text-[#1DCD9F] group-hover:text-white transition-colors duration-300">F</span>
              <span className="text-white group-hover:text-[#1DCD9F] transition-colors duration-300">auzan</span>
              <span className="text-[#1DCD9F] group-hover:text-white transition-colors duration-300">.</span>
            </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="animated-underline text-sm text-neutral-light hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
              isMobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
              isMobileOpen ? "opacity-0" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
              isMobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-container flex flex-col gap-4 py-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-neutral-light hover:text-primary transition-colors duration-300 text-lg"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
