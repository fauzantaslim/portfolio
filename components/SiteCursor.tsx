"use client";

import { useTheme } from "next-themes";
import TargetCursor from "@/components/ui/target-cursor";

const TARGETS = 'a[href], button, [role="button"], [data-orbit-item], .cursor-target';

export default function SiteCursor() {
  const { resolvedTheme } = useTheme();

  return (
    <TargetCursor
      targetSelector={TARGETS}
      cursorColor="#1DCD9F"
      cursorColorOnTarget={resolvedTheme === "light" ? "#0a0a0a" : "#ffffff"}
      blendMode="normal"
      spinDuration={2}
      hoverDuration={0.2}
      size={36}
      cornerSize={12}
      thickness={3}
      padding={6}
      dotSize={4}
      parallaxOn
      matchRadius
      clickEffect
      hideDefaultCursor
    />
  );
}

