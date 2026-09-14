"use client";

import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { lenisEasing } from "@/lib/animations";

function AnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
      } else {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: lenisEasing,
        smoothWheel: true,
        touchMultiplier: 1.4,
      }}
    >
      <AnchorHandler />
      {children}
    </ReactLenis>
  );
}
