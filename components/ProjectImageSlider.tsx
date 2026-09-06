"use client";

import { useState, useCallback, useEffect, useRef, useId } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaMagnifyingGlassPlus } from "react-icons/fa6";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface ProjectImageSliderProps {
  images: string[];
  title: string;
}

export default function ProjectImageSlider({ images, title }: ProjectImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useId() produces a stable, SSR-safe ID — avoids hydration mismatch from Math.random()
  const reactId = useId();
  const galleryId = `gallery${reactId.replace(/:/g, "-")}`;

  const total = images.length;
  const hasMultiple = total > 1;

  // Bind Fancybox after mount (client-only)
  useEffect(() => {
    Fancybox.bind(`[data-fancybox="${galleryId}"]`, {
      Images: { zoom: true },
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [],
          right: ["slideshow", "fullscreen", "download", "close"],
        },
      },
    });

    return () => {
      Fancybox.unbind(`[data-fancybox="${galleryId}"]`);
      Fancybox.close();
    };
  }, [galleryId]);

  const go = useCallback(
    (next: number, dir: "left" | "right") => {
      if (isAnimating || next === current) return;
      setDirection(dir);
      setIsAnimating(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCurrent(next);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating, current]
  );

  const prev = useCallback(() => go((current - 1 + total) % total, "left"), [current, total, go]);
  const next = useCallback(() => go((current + 1) % total, "right"), [current, total, go]);

  // Keyboard navigation — skip when Fancybox is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector(".fancybox__container")) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Cleanup timeout on unmount
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full group" role="region" aria-label="Project image gallery">
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(36px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft  { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: translateX(0); } }
        .slide-in-right { animation: slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slide-in-left  { animation: slideInLeft  0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
        .slider-arrow { transition: opacity 0.2s ease, transform 0.2s ease; }
        .slider-arrow:hover { transform: scale(1.1); }
        .slider-dot { transition: all 0.25s ease; }
        .zoom-hint {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
          background: rgba(0,0,0,0.22);
          z-index: 5;
          cursor: zoom-in;
          border-radius: inherit;
        }
        .group:hover .zoom-hint { opacity: 1; }
        .fancybox__container {
          --fancybox-accent-color: #1DCD9F;
          --fancybox-bg: rgba(5,5,5,0.96);
        }
        .fancybox__toolbar { background: rgba(10,10,10,0.85); backdrop-filter: blur(12px); }
        .fancybox__caption {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.55);
        }
      `}</style>

      {/* Hidden gallery anchors for Fancybox — all images linked as a group */}
      <div aria-hidden="true" className="sr-only">
        {images.map((src, i) => (
          <a
            key={i}
            href={src}
            data-fancybox={galleryId}
            data-caption={`${title} — ${i + 1} / ${total}`}
          />
        ))}
      </div>

      {/* Main image container */}
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

        {/* Clickable image — opens Fancybox at current index */}
        <a
          href={images[current]}
          data-fancybox={galleryId}
          data-caption={`${title} — ${current + 1} / ${total}`}
          className="block absolute inset-0"
          aria-label={`View ${title} screenshot ${current + 1} of ${total} in fullscreen`}
        >
          <div
            key={current}
            className={`absolute inset-0 ${
              isAnimating
                ? direction === "right"
                  ? "slide-in-right"
                  : "slide-in-left"
                : ""
            }`}
          >
            <Image
              src={images[current]}
              alt={`${title} — screenshot ${current + 1} of ${total}`}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-[1]" />
          </div>

          {/* Zoom hover hint */}
          <span className="zoom-hint" aria-hidden="true">
            <span
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white text-xs font-mono tracking-widest"
              style={{
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(29,205,159,0.35)",
              }}
            >
              <FaMagnifyingGlassPlus className="w-3.5 h-3.5 text-primary" />
              CLICK TO ZOOM
            </span>
          </span>
        </a>

        {/* Counter badge */}
        {hasMultiple && (
          <div
            className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md text-white pointer-events-none"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
            aria-live="polite"
          >
            {current + 1} / {total}
          </div>
        )}

        {/* Arrow buttons — stopPropagation prevents Fancybox trigger */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }}
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
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }}
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
