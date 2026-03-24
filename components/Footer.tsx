"use client";

import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
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
            className="flex flex-col items-center justify-center group transition-transform duration-300 hover:scale-110"
          >
            <Image 
              src="/logo-fauzan.svg" 
              alt="Fauzan Logo" 
              width={160} 
              height={60} 
              className="h-10 md:h-14 w-auto object-contain bg-white hover:bg-[#1DCD9F] rounded-xl shadow-lg mb-3"
            />
            <span className="text-2xl font-bold tracking-tight transition-colors">
              <span className="text-[#1DCD9F] group-hover:text-white transition-colors duration-300">F</span>
              <span className="text-white group-hover:text-[#1DCD9F] transition-colors duration-300">auzan</span>
              <span className="text-[#1DCD9F] group-hover:text-white transition-colors duration-300">.</span>
            </span>
          </a>
        </div>

        {/* Middle: Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm md:text-base font-medium text-white">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-4xl border-t border-dashed border-neutral-dark/50 my-2"></div>

        {/* Bottom: Copyright and Socials */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-white text-sm">
          <div>
            &copy; {currentYear} Fauzan Taslim Hidayat.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/fauzan-taslim-hidayat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/fauzantaslim" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110" aria-label="GitHub">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/fauzntaslm16" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
