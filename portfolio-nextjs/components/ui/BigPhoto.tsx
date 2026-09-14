"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

const INTRO_ANIM_DURATION_MS = 1600;

// Replika setupBigPhotoReveal vanilla: setelah intro selesai, kalau elemen
// sudah terlihat → tampil langsung tanpa animasi; kalau belum → observe
// dengan rootMargin -35% supaya animasi besar jalan saat discroll.
export default function BigPhoto({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [cls, setCls] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let observer: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.65;
      if (alreadyVisible) {
        setCls(" no-anim-on-load is-visible");
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setCls(" is-visible");
                observer?.disconnect();
              }
            });
          },
          { threshold: 0.01, rootMargin: "0px 0px -35% 0px" }
        );
        observer.observe(el);
      }
    }, INTRO_ANIM_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`${className}${cls}`}>
      {children}
    </div>
  );
}
