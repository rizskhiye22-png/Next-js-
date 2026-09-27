"use client";

import { useEffect } from "react";

// Parallax ringan berbasis scroll untuk semua elemen ber-atribut
// data-parallax="<kecepatan>". Memakai properti CSS `translate` (bukan
// `transform`) supaya tidak bentrok dengan transform/animasi yang sudah ada.
export default function ScrollParallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!els.length) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0");
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -vh || rect.top > vh * 2) return;
        // 0 saat pusat elemen berada di tengah layar
        const offset = rect.top + rect.height / 2 - vh / 2;
        el.style.translate = `0 ${(-offset * speed).toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
