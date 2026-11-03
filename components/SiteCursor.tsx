"use client";

import TargetCursor from "@/components/ui/target-cursor";

const TARGETS = 'a[href], button, [role="button"], [data-orbit-item], .cursor-target';

export default function SiteCursor() {
  return (
    <TargetCursor
      targetSelector={TARGETS}
      cursorColor="var(--color-primary)"
      cursorColorOnTarget="var(--foreground)"
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

