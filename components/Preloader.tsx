"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SESSION_KEY = "retro_preloader_seen";

export default function Preloader() {
  const [isReady, setIsReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const hasSeen = sessionStorage.getItem(SESSION_KEY);
      setIsReady(true);
      setVisible(!hasSeen);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible || !wrapperRef.current || !titleRef.current || !barRef.current) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "true");
        setVisible(false);
      },
    });

    timeline
      .fromTo(titleRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.85, ease: "power2.inOut" },
        "-=0.1",
      )
      .to(wrapperRef.current, { opacity: 0, duration: 0.4, delay: 0.2 });

    return () => {
      timeline.kill();
    };
  }, [visible]);

  if (!isReady || !visible) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2b2d42]"
    >
      <div className="w-[min(460px,90vw)] space-y-5 px-6">
        <p ref={titleRef} className="retro-title text-center text-xl text-[#fff9db]">
          Loading Retro Portfolio...
        </p>
        <div className="h-5 overflow-hidden border-2 border-[#fff9db] bg-[#118ab2]">
          <div ref={barRef} className="h-full w-full bg-[#06d6a0]" />
        </div>
      </div>
    </div>
  );
}
