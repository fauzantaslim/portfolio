"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const BOOT_LINES = [
  "initializing runtime...",
  "loading assets...",
  "mounting components...",
  "establishing connection...",
  "ready.",
];

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const logo = logoRef.current;
    const terminal = terminalRef.current;
    const progressBar = progressBarRef.current;

    if (!preloader || !leftPanel || !rightPanel || !logo || !terminal || !progressBar) return;

    document.body.style.overflow = "hidden";

    // Set initial states
    gsap.set(logo, { opacity: 0, y: 10 });
    gsap.set(terminal, { opacity: 0 });

    // Fade logo in immediately
    gsap.to(logo, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
    // Fade terminal in slightly after
    gsap.to(terminal, { opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.3 });

    // Typewriter boot lines
    let lineIdx = 0;
    const lineDelay = 320;
    const typeInterval = setInterval(() => {
      if (lineIdx < BOOT_LINES.length) {
        setTerminalLines((prev) => [...prev, BOOT_LINES[lineIdx]]);
        lineIdx++;
        setProgress(Math.round(((lineIdx) / BOOT_LINES.length) * 100));
      } else {
        clearInterval(typeInterval);
      }
    }, lineDelay);

    const totalBootTime = BOOT_LINES.length * lineDelay + 100;

    const tl = gsap.timeline({
      delay: totalBootTime / 1000,
      onComplete: () => {
        clearInterval(typeInterval);
        document.body.style.overflow = "";
        setIsVisible(false);
      },
    });

    // Fade logo & terminal out
    tl.to([logo, terminal], {
      opacity: 0,
      y: -12,
      duration: 0.35,
      ease: "power2.in",
      stagger: 0.05,
    })
    // Panels slide apart
    .to(
      leftPanel,
      { xPercent: -100, duration: 0.85, ease: "expo.inOut" },
      "-=0.05"
    )
    .to(
      rightPanel,
      { xPercent: 100, duration: 0.85, ease: "expo.inOut" },
      "<"
    );

    return () => {
      clearInterval(typeInterval);
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex pointer-events-none"
      aria-hidden="true"
    >
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-cursor {
          display: inline-block;
          width: 7px;
          height: 13px;
          background: #1DCD9F;
          vertical-align: middle;
          margin-left: 3px;
          animation: cursor-blink 0.9s step-end infinite;
        }
        .boot-line {
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          line-height: 1.8;
        }
        .boot-line.done {
          color: rgba(255,255,255,0.35);
        }
        .boot-line.done::before {
          content: '✓ ';
          color: #1DCD9F;
        }
        .boot-line.last {
          color: #1DCD9F;
          font-weight: 700;
        }
        .progress-track {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 1px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #1DCD9F;
          border-radius: 1px;
          box-shadow: 0 0 8px #1DCD9F88;
          transition: width 0.3s ease;
        }
        .scanlines-preloader::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(255,255,255,0.012) 3px,
            rgba(255,255,255,0.012) 4px
          );
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="scanlines-preloader w-1/2 h-full bg-[#050505] relative"
      />

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="scanlines-preloader w-1/2 h-full bg-[#050505] relative"
      />

      {/* ── Centered overlay: Logo + Terminal ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        {/* Logo */}
        <div
          ref={logoRef}
          className="flex flex-col items-center gap-3"
        >
          {/* Logo image on white bg */}
          <div className="bg-white rounded-xl px-4 py-2 shadow-[0_0_40px_rgba(29,205,159,0.2)]">
            <Image
              src="/logo-fauzan.svg"
              alt="Fauzan"
              width={160}
              height={60}
              className="h-20 w-auto object-contain"
              priority
            />
          </div>
          {/* Name */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <span style={{ color: "#1DCD9F" }}>F</span>
            auzan
            <span style={{ color: "#1DCD9F" }}>.</span>
          </span>
        </div>

        {/* Terminal block */}
        <div
          ref={terminalRef}
          className="w-full max-w-xs px-4"
        >
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between mb-1.5">
              <span
                className="text-primary/60"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.08em" }}
              >
                BOOT SEQUENCE
              </span>
              <span
                className="text-primary/60"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
              >
                {progress}%
              </span>
            </div>
            <div className="progress-track">
              <div ref={progressBarRef} className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Boot lines */}
          <div className="space-y-0.5 min-h-[120px]">
            {terminalLines.map((line, i) => {
              const isLast = i === terminalLines.length - 1;
              return (
                <div
                  key={i}
                  className={`boot-line ${isLast ? "last" : "done"}`}
                >
                  {!isLast && <span className="text-primary/40 mr-2">$</span>}
                  {line}
                  {isLast && <span className="terminal-cursor" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
