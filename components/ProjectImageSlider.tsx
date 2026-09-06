"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
}

export default function ProjectImageSlider({ images, title }: ProjectImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = images.length;
  const hasMultiple = total > 1;

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (isAnimating || next === current) return;
      setDirection(dir);
      setIsAnimating(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCurrent(next);
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating, current]
  );

  const prev = useCallback(() => {
    go((current - 1 + total) % total, "left");
  }, [current, total, go]);

  const next = useCallback(() => {
    go((current + 1) % total, "right");
  }, [current, total, go]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Auto cleanup
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full group" role="region" aria-label="Project image gallery">
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft  { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideOutRight { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-40px); } }
        @keyframes slideOutLeft  { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(40px); } }
        .slide-in-right  { animation: slideInRight  0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slide-in-left   { animation: slideInLeft   0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slide-out-right { animation: slideOutRight 0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slide-out-left  { animation: slideOutLeft  0.4s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slider-arrow {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .slider-arrow:hover { transform: scale(1.1); }
        .slider-dot {
          transition: all 0.25s ease;
        }
      `}</style>

      {/* Image container */}
      <div
        className="relative w-full aspect-video overflow-hidden rounded-xl dark:bg-[#0a0a0a] bg-gray-100 border dark:border-white/8 border-black/8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 3px)",
          }}
          aria-hidden="true"
        />

        {/* Current image */}
        <div
          key={current}
          className={isAnimating
            ? direction === "right" ? "slide-in-right" : "slide-in-left"
            : ""}
        >
          <Image
            src={images[current]}
            alt={`${title} — screenshot ${current + 1} of ${total}`}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
          {/* Subtle gradient bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[1]" />
        </div>

        {/* Counter badge */}
        {hasMultiple && (
          <div
            className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md text-white backdrop-blur-md"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            aria-live="polite"
          >
            {current + 1} / {total}
          </div>
        )}

        {/* Arrow buttons — only visible on hover when hasMultiple */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="slider-arrow absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={next}
              className="slider-arrow absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
              style={{
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
              }}
              aria-label="Next image"
            >
              <FaChevronRight className="w-3.5 h-3.5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="flex justify-center gap-1.5 mt-3" role="tablist" aria-label="Image navigation">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to image ${i + 1}`}
              onClick={() => go(i, i > current ? "right" : "left")}
              className="slider-dot rounded-full"
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                background: i === current ? "#1DCD9F" : "var(--border-subtle)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
