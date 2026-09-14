"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/use3DEnabled";

const CERTS = [
  {
    img: "/assets/certs/cert1.jpg",
    alt: "Sertifikat JLPT N2",
    title: "JLPT N2",
    desc: "Passed — Desember 2025",
  },
  {
    img: "/assets/certs/cert2.jpg",
    alt: "Sertifikat JLPT N3",
    title: "JLPT N3",
    desc: "Passed — Desember 2024",
  },
  {
    img: "/assets/certs/cert3.jpg",
    alt: "Sertifikat Evaluasi Bahasa Jepang Kaigo",
    title: "Nursing Care Japanese Language Evaluation Test",
    desc: "Pass — Skor 86%",
  },
  {
    img: "/assets/certs/cert4.jpg",
    alt: "Sertifikat Kaigo Kiso Kenshuu",
    title: "Ninchishou Kaigo Kiso Kenshuu",
    desc: "認知症介護基礎研修",
  },
];

const AUTO_FLIP_INTERVAL = 3500;
const MANUAL_PAUSE_DURATION = 6000;

function CertCard({
  cert,
  index,
  clone = false,
}: {
  cert: (typeof CERTS)[number];
  index: number;
  clone?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const reduced = usePrefersReducedMotion();
  const autoRef = useRef<number | null>(null);
  const resumeRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const startAuto = () => {
      autoRef.current = window.setInterval(() => setFlipped((f) => !f), AUTO_FLIP_INTERVAL);
    };
    const starter = window.setTimeout(startAuto, index * 700);
    return () => {
      window.clearTimeout(starter);
      if (autoRef.current) window.clearInterval(autoRef.current);
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    };
  }, [index, reduced]);

  const onClick = () => {
    if (autoRef.current) window.clearInterval(autoRef.current);
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
    setFlipped((f) => !f);
    if (!reduced) {
      resumeRef.current = window.setTimeout(() => {
        autoRef.current = window.setInterval(() => setFlipped((f) => !f), AUTO_FLIP_INTERVAL);
      }, MANUAL_PAUSE_DURATION);
    }
  };

  return (
    <div
      className={`cert-card${flipped ? " is-flipped" : ""}`}
      style={{ "--i": index } as React.CSSProperties}
      onClick={onClick}
      role="button"
      tabIndex={clone ? -1 : 0}
      aria-hidden={clone || undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="cert-card-inner">
        <div className="cert-face cert-front">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cert.img} alt={clone ? "" : cert.alt} loading="lazy" decoding="async" />
          <span className="cert-flip-hint">Tap untuk detail</span>
        </div>
        <div className="cert-face cert-back">
          <p className="cert-back-title">{cert.title}</p>
          <p className="cert-back-desc">{cert.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="certificates" id="certificates">
      <Reveal className="section-heading reveal">
        <span className="eyebrow-tag">Sertifikasi</span>
        <h2>Beberapa sertifikasi bahasa dan pengetahuan umum kaigo.</h2>
      </Reveal>
      <Reveal className="cert-marquee reveal">
        <div
          className={`cert-track${paused ? " is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {CERTS.map((c, i) => (
            <CertCard key={`a-${i}`} cert={c} index={i} />
          ))}
          {CERTS.map((c, i) => (
            <CertCard key={`b-${i}`} cert={c} index={i} clone />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
