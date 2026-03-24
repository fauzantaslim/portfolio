"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type TransitionContextValue = {
  navigateWithTransition: (href: string) => void;
  isTransitioning: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
}

export default function PageTransitionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const navigateWithTransition = (href: string) => {
    if (href === pathname || isTransitioning || !overlayRef.current) return;

    setIsTransitioning(true);
    setPendingPath(href);

    const overlay = overlayRef.current;
    gsap.killTweensOf(overlay);
    gsap.set(overlay, { xPercent: -100 });
    gsap.to(overlay, {
      xPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => router.push(href),
    });
  };

  useEffect(() => {
    if (!pendingPath || pathname !== pendingPath || !overlayRef.current) return;

    const overlay = overlayRef.current;
    gsap.to(overlay, {
      xPercent: 100,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(overlay, { xPercent: -100 });
        setPendingPath(null);
        setIsTransitioning(false);
      },
    });
  }, [pathname, pendingPath]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-50 -translate-x-full bg-[#ef476f]"
        aria-hidden="true"
      />
    </TransitionContext.Provider>
  );
}
