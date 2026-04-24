"use client";

import { useEffect, useState } from "react";
import { FaRotate } from "react-icons/fa6";

export default function LandscapeOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Show overlay if it's a mobile device turned portrait (width < 768 & height > width)
      const isPortrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
      setShowOverlay(isPortrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
      <div className="mb-6 animate-[spin_3s_linear_infinite]">
        <FaRotate className="w-16 h-16 text-primary" />
      </div>
      <h2 className="text-2xl font-black mb-3">Please Rotate Device</h2>
      <p className="text-white/70 text-sm max-w-xs leading-relaxed">
        This immersive portfolio is best experienced in <strong className="text-white">Landscape Mode</strong> on mobile devices.
      </p>
    </div>
  );
}
