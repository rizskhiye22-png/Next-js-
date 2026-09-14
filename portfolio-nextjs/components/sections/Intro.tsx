"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import LazyCanvas from "@/components/ui/LazyCanvas";
import { use3DEnabled } from "@/lib/use3DEnabled";

const IntroParticles = dynamic(() => import("@/components/three/IntroParticles"), { ssr: false });

export default function Intro() {
  const photoRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const enabled3D = use3DEnabled();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;
    let fallback = 0;

    const start = () => {
      setStarted(true);
      const photo = photoRef.current;
      const caption = captionRef.current;
      const hint = hintRef.current;

      tl = gsap.timeline();
      if (photo) {
        tl.fromTo(
          photo,
          { opacity: 0, y: -320, rotate: -6, scale: 0.9 },
          { y: 0, rotate: 0, scale: 1, duration: 1.1, delay: 0.25, ease: "bounce.out" },
          0
        ).to(photo, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.25);
      }
      if (caption) tl.call(() => caption.classList.add("is-dropped"), undefined, 1.35);
      if (hint) {
        tl.fromTo(
          hint,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power1.out", onComplete: () => hint.classList.add("is-floating") },
          0.9
        );
      }
    };

    const onDone = () => start();
    window.addEventListener("maul:preloader-done", onDone, { once: true });
    // Fallback kalau event preloader tidak terkirim
    fallback = window.setTimeout(start, 3500);

    return () => {
      window.removeEventListener("maul:preloader-done", onDone);
      window.clearTimeout(fallback);
      tl?.kill();
    };
  }, []);

  return (
    <section className="intro" id="intro">
      <div className="intro-poster-text" aria-hidden="true">
        PORTFOLIO
      </div>
      <div className="intro-poster-label">JAPANESE LANGUAGE</div>
      {enabled3D && started && (
        <LazyCanvas>
          <IntroParticles />
        </LazyCanvas>
      )}
      <div className="intro-photo-frame" ref={photoRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/profile.jpg"
          alt="Foto profil Maul"
          className="intro-photo"
          fetchPriority="high"
          decoding="async"
        />
        <div className="intro-photo-shine" />
      </div>
      <div className="intro-caption" ref={captionRef}>
        <h1 className="intro-name">Halo, saya Maul.</h1>
      </div>
      <div className="intro-scroll-hint" ref={hintRef}>
        <span className="scroll-line" /> Gulir untuk cerita selengkapnya
      </div>
    </section>
  );
}
