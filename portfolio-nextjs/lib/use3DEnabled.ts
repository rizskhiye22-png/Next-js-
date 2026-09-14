"use client";

import { useEffect, useState } from "react";

// Deteksi apakah efek 3D WebGL boleh jalan:
// - mati kalau user minta reduced-motion
// - mati di device low-end (<= 4 core atau <= 4GB RAM)
// Default false saat SSR/hydration supaya tidak ada flash canvas.
export function use3DEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
    setEnabled(!reduced && cores > 4 && memory > 4);
  }, []);

  return enabled;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
