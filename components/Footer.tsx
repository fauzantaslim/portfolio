"use client";

import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Particles } from "@/components/ui/particles";
import { useTheme } from "next-themes";

const footerLinks = [
  { label: "About",      href: "#about",      idx: "01" },
  { label: "Stack",      href: "#stack",      idx: "02" },
  { label: "Experience", href: "#experience", idx: "03" },
  { label: "Projects",   href: "#projects",   idx: "04" },
  { label: "Contact",    href: "#contact",    idx: "05" },
];

const socials = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/fauzan-taslim-hidayat",
    label: "LinkedIn",
    accent: "#38bdf8",
  },
  {
    icon: FaGithub,
    href: "https://github.com/fauzantaslim",
    label: "GitHub",
    accent: "#a78bfa",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/fauzntaslm16",
    label: "Instagram",
    accent: "#fb923c",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "light" ? "#000000" : "#ffffff");
  }, [resolvedTheme]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const container = containerRef.current;
    const bigText = bigTextRef.current;

    if (!footer || !container) return;

    const ctx = gsap.context(() => {
      // Parallax: content rises up as footer enters viewport
      gsap.fromTo(
        container,
        { yPercent: -40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "center bottom",
            scrub: true,
          },
        }
      );

      // Parallax: large background text moves slower (depth effect)
      if (bigText) {
        gsap.fromTo(
          bigText,
          { yPercent: 30 },
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      // Stagger footer links on scroll
      gsap.fromTo(
        ".footer-link",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
          },
        }
      );

      // Social icons pop in
      gsap.fromTo(
        ".footer-social",
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black min-h-[480px] flex items-center justify-center overflow-hidden border-t border-white/8"
    >
      <style>{`
        .footer-link {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          position: relative;
          transition: color 0.2s ease;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #1DCD9F;
          transition: width 0.25s ease;
        }
        .footer-link:hover::after { width: 100%; }
        .footer-link:hover { color: #1DCD9F; }

        .footer-social {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .footer-social:hover {
          transform: translateY(-3px);
        }

        .footer-divider {
          background: linear-gradient(90deg, transparent, rgba(29,205,159,0.25), transparent);
          height: 1px;
        }

        .back-to-top {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          border: 1px solid rgba(29,205,159,0.2);
        }
        .back-to-top:hover {
          border-color: rgba(29,205,159,0.5);
          box-shadow: 0 0 16px rgba(29,205,159,0.2);
          color: #1DCD9F;
        }
      `}</style>

      {/* ── Particles layer ── */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={120}
        ease={80}
        color={color}
        refresh
      />

      {/* ── Large parallax background text ── */}
      <div
        ref={bigTextRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]"
      >
        <span
          className="text-[18vw] font-black text-white/[0.025] leading-none tracking-tight"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          FAUZAN.
        </span>
      </div>

      {/* ── Main content ── */}
      <div
        ref={containerRef}
        className="section-container relative z-10 w-full flex flex-col items-center justify-center gap-10 py-16"
      >
        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToTop(); }}
            className="group flex flex-col items-center gap-2"
            aria-label="Back to top"
          >
            <Image
              src="/logo-fauzan.svg"
              alt="Fauzan Logo"
              width={160}
              height={60}
              className="h-10 md:h-14 w-auto object-contain bg-white group-hover:bg-[#1DCD9F] rounded-xl shadow-lg transition-colors duration-300"
            />
            <span
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-[#1DCD9F]">F</span>
              <span className="text-white group-hover:text-[#1DCD9F] transition-colors duration-300">auzan</span>
              <span className="text-[#1DCD9F]">.</span>
            </span>
          </a>
          <p
            className="text-white/30 max-w-xs text-center leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.08em" }}
          >
            Backend Developer &amp; Software Quality Engineer<br />
            based in Bogor, Indonesia.
          </p>
        </div>

        {/* Nav links */}
        <nav
          className="flex flex-wrap justify-center gap-x-7 gap-y-4"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="footer-link text-white/45 flex items-center gap-1.5"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-primary/30" style={{ fontSize: "0.52rem" }}>{link.idx}</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="footer-divider w-full max-w-2xl" />

        {/* Bottom row */}
        <div className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p
            className="text-white/25 order-2 md:order-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.06em" }}
          >
            &copy; {currentYear} Fauzan Taslim Hidayat. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {socials.map(({ icon: Icon, href, label, accent }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  border: `1px solid ${accent}28`,
                  backgroundColor: `${accent}0a`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}55`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px ${accent}33`;
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${accent}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}28`;
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${accent}0a`;
                }}
              >
                <Icon className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="back-to-top text-white/30 px-4 py-2 rounded-lg"
          aria-label="Back to top"
        >
          ↑ &nbsp;back to top
        </button>
      </div>
    </footer>
  );
}
