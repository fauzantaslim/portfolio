"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const logo = logoRef.current;

    if (!preloader || !leftPanel || !rightPanel || !logo) return;

    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsVisible(false);
      },
    });

    // 1. Fade-in + scale logo
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    )
    // 2. Brief hold so user can see the logo
    .to(logo, { duration: 0.8 })
    // 3. Fade out logo slightly before panels slide out
    .to(logo, { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" }, "-=0.1")
    // 4. Left panel slides left, right panel slides right (simultaneous)
    .to(
      leftPanel,
      { xPercent: -100, duration: 0.8, ease: "power4.inOut" },
      "-=0.1"
    )
    .to(
      rightPanel,
      { xPercent: 100, duration: 0.8, ease: "power4.inOut" },
      "<" // Start at the same time as left panel
    );
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex pointer-events-none"
      aria-hidden="true"
    >
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        className="w-1/2 h-full bg-black flex items-center justify-end pr-1"
      />

      {/* Right Panel */}
      <div
        ref={rightPanelRef}
        className="w-1/2 h-full bg-black flex items-center justify-start pl-1"
      />

      {/* Centered Logo (sits on top of both panels) */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0"
      >
        <div className="bg-white rounded-2xl shadow-[0_0_60px_rgba(29,205,159,0.3)]">
          <Image
            src="/logo-fauzan.svg"
            alt="Fauzan"
            width={180}
            height={70}
            className="h-28 w-auto object-contain"
            priority
          />
        </div>
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-[#1DCD9F]">F</span>
          <span className="text-white">auzan</span>
          <span className="text-[#1DCD9F]">.</span>
        </span>
      </div>
    </div>
  );
}
