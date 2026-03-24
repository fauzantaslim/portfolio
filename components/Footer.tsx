"use client";

import { FaXTwitter, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Particles } from "@/components/ui/particles";
import { useTheme } from "next-themes";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "light" ? "#000000" : "#ffffff");
  }, [resolvedTheme]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const footer = footerRef.current;
    const container = containerRef.current;
    
    if (!footer || !container) return;

    const ctx = gsap.context(() => {
      // GSAP parallax effect for the footer elements
      gsap.fromTo(
        container,
        { yPercent: -50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-black min-h-[400px] flex items-center justify-center overflow-hidden border-t border-card-border"
    >
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      
      <div 
        ref={containerRef}
        className="section-container relative z-10 w-full flex flex-col items-center justify-center gap-10 py-16"
      >
        {/* Top: Logo */}
        <div className="text-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="flex flex-col items-center justify-center group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-black font-bold text-2xl mb-3 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              F
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              Fauzan.
            </span>
          </a>
        </div>

        {/* Middle: Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm md:text-base font-medium text-neutral-light">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-4xl border-t border-dashed border-neutral-dark/50 my-2"></div>

        {/* Bottom: Copyright and Socials */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-light text-sm">
          <div>
            &copy; {currentYear} Fauzan Taslim Hidayat.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110" aria-label="GitHub">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
