"use client";

import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";

const ITEMS = [
  {
    logo: "/assets/images/exp1-logo.png",
    date: "2025 — Sekarang",
    role: "Care Worker",
    roleJa: "（介護職員）",
    org: "Living Platform Care (リビングプラットフォームケア)",
    desc: "Memberikan perawatan harian dan pendampingan bagi lansia di fasilitas perawatan, dengan fokus pada ketelitian, empati, dan kerja sama tim di lingkungan kerja Jepang.",
  },
  {
    logo: "/assets/images/exp2-logo.png",
    date: "2023 — 2024",
    role: "Operator",
    roleJa: "",
    org: "Yamae Hisano Co., Ltd (ヤマエ久野株式会社)",
    desc: "Menjalankan proses operasional produksi/gudang sesuai standar perusahaan, dengan perhatian pada efisiensi, kedisiplinan, dan ketepatan kerja.",
  },
  {
    logo: "/assets/images/exp3-logo.png",
    date: "2020 — 2022",
    role: "Operator",
    roleJa: "",
    org: "PT. Denso Indonesia",
    desc: "Mengoperasikan lini produksi komponen otomotif dengan mengikuti standar kualitas dan keselamatan kerja yang ketat di lingkungan manufaktur.",
  },
];

const SPEED = 32; // px per detik

export default function Experience() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let rafId = 0;
    let loopHeight = 0;
    let y = 0;
    let last = 0;

    const measure = () => {
      const originals = track.querySelectorAll<HTMLElement>(".timeline-item:not([data-clone='1'])");
      if (!originals.length) return;
      const first = originals[0];
      const lastOriginal = originals[originals.length - 1];
      const marginBottom = parseFloat(getComputedStyle(lastOriginal).marginBottom) || 0;
      loopHeight = lastOriginal.offsetTop + lastOriginal.offsetHeight + marginBottom - first.offsetTop;
    };

    const tick = (timestamp: number) => {
      if (!last) last = timestamp;
      const dt = (timestamp - last) / 1000;
      last = timestamp;
      if (!paused && loopHeight > 0) {
        y += SPEED * dt;
        if (y >= loopHeight) y -= loopHeight;
        track.style.transform = `translateY(${-y}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    measure();
    const t1 = window.setTimeout(measure, 500);
    const t2 = window.setTimeout(measure, 1500);
    window.addEventListener("resize", measure);
    rafId = requestAnimationFrame(tick);

    const pause = () => (paused = true);
    const resume = () => (paused = false);
    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resume);
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("touchend", resume, { passive: true });
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", resume);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", measure);
      viewport.removeEventListener("mouseenter", pause);
      viewport.removeEventListener("mouseleave", resume);
      viewport.removeEventListener("touchstart", pause);
      viewport.removeEventListener("touchend", resume);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", resume);
    };
  }, []);

  const renderItem = (item: (typeof ITEMS)[number], i: number, clone = false) => (
    <div
      key={`${clone ? "clone" : "orig"}-${i}`}
      className="timeline-item"
      data-clone={clone ? "1" : undefined}
      aria-hidden={clone || undefined}
      style={{ "--i": i } as React.CSSProperties}
    >
      <div className="timeline-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.logo} alt={clone ? "" : `Logo ${item.org}`} loading="lazy" decoding="async" />
      </div>
      <div className="timeline-content">
        <span className="timeline-date">{item.date}</span>
        <h3>
          {item.role}
          {item.roleJa && <span lang="ja">{item.roleJa}</span>}
        </h3>
        <p className="timeline-org">{item.org}</p>
        <p>{item.desc}</p>
      </div>
    </div>
  );

  return (
    <section className="experience" id="experience">
      <Reveal className="section-heading reveal">
        <span className="eyebrow-tag">Jejak langkah</span>
        <h2>Beberapa tempat yang membentuk cara saya kerja.</h2>
      </Reveal>
      <div className="timeline-viewport" ref={viewportRef}>
        <div className="timeline" ref={trackRef}>
          {ITEMS.map((item, i) => renderItem(item, i))}
          {ITEMS.map((item, i) => renderItem(item, i, true))}
        </div>
      </div>
    </section>
  );
}
