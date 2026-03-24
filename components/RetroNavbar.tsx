"use client";

import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransitionProvider";

const menuItems = [
  { label: "Homepage", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function RetroNavbar() {
  const pathname = usePathname();
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  return (
    <header className="retro-shell sticky top-4 z-40 mx-auto mt-6 flex w-[min(1100px,92vw)] items-center justify-between px-4 py-3 md:px-6">
      <p className="retro-title text-sm md:text-base">Fauza Portfolio</p>
      <nav className="flex items-center gap-2 md:gap-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <button
              key={item.href}
              type="button"
              onClick={() => navigateWithTransition(item.href)}
              disabled={isTransitioning}
              className={`retro-link px-3 py-2 text-xs font-semibold md:text-sm ${
                isActive ? "retro-link-active" : ""
              } ${isTransitioning ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
