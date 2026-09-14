"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import BigPhoto from "@/components/ui/BigPhoto";
import LazyCanvas from "@/components/ui/LazyCanvas";
import Magnetic from "@/components/ui/Magnetic";
import { SplitWordsFancy, TaglineSplit, SplitWave } from "@/components/ui/SplitText";
import { use3DEnabled } from "@/lib/use3DEnabled";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const HERO_SKILLS = [
  { icon: "https://api.iconify.design/lucide/languages.svg?color=%23BC002D", label: "Japanese" },
  { icon: "https://api.iconify.design/lucide/graduation-cap.svg?color=%23BC002D", label: "JLPT" },
  { icon: "https://cdn.simpleicons.org/react/61DAFB", label: "React" },
  { icon: "https://cdn.simpleicons.org/nextdotjs/000000", label: "Next.js" },
  { icon: "https://cdn.simpleicons.org/cloudflareworkers/F38020", label: "Cloudflare Workers" },
  { icon: "https://api.iconify.design/lucide/route.svg?color=%23E5533C", label: "REST API" },
  { icon: "https://cdn.simpleicons.org/pwa/5A0FC8", label: "PWA" },
  { icon: "https://cdn.simpleicons.org/figma/F24E1E", label: "UI/UX" },
];

function TiltHeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const base = "rotate(-4deg)";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
      const rx = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10;
      el.style.transform = `${base} rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = `${base} rotateX(0deg) rotateY(0deg)`;
    };

    let gyro = false;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      gyro = true;
      const ry = Math.max(-10, Math.min(10, e.gamma / 3));
      const rx = Math.max(-10, Math.min(10, -(e.beta - 45) / 4));
      el.style.transform = `${base} rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onTouch = (e: TouchEvent) => {
      if (gyro || !e.touches[0]) return;
      const t = e.touches[0];
      const ry = (t.clientX / window.innerWidth - 0.5) * 14;
      const rx = -(t.clientY / window.innerHeight - 0.5) * 14;
      el.style.transform = `${base} rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("deviceorientation", onOrient, true);
    document.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient, true);
      document.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div className="photo-frame" ref={ref} id="tiltPhoto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/profile-hero.jpg"
        alt="Foto profil Maul"
        className="hero-photo"
        fetchPriority="high"
        decoding="async"
      />
      <div className="photo-shine auto-shine" />
    </div>
  );
}

export default function Hero() {
  const enabled3D = use3DEnabled();

  return (
    <section className="hero" id="home">
      {enabled3D && (
        <LazyCanvas>
          <HeroScene />
        </LazyCanvas>
      )}
      <div className="hero-bg-text" aria-hidden="true">
        ようこそ
      </div>

      <Reveal className="hero-text reveal">
        <h1 className="hero-title">
          <span className="line split-words-fancy hero-line-1">
            <SplitWordsFancy lines={["Japanese Literature × Caregiving"]} />
          </span>
          <span className="line highlight split-words-fancy hero-line-2">
            <SplitWordsFancy lines={["× Web Development."]} baseDelay={0.35} />
          </span>
        </h1>
        <p className="hero-tagline tagline-split">
          <TaglineSplit text="Maul — Irfan Faiz Maulana" />
        </p>
        <p className="hero-desc split-chars-wave">
          <SplitWave text="Saya bekerja di Jepang sebagai care worker sambil mengembangkan web tools untuk pembelajaran bahasa Jepang dan eksplorasi teknologi." />
        </p>
        <ul className="hero-skills" aria-label="Keahlian utama">
          {HERO_SKILLS.map((s) => (
            <li key={s.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero-skill-icon" src={s.icon} alt="" loading="lazy" />
              {s.label}
            </li>
          ))}
        </ul>
        <div className="hero-buttons btn-pop-group">
          <Magnetic href="#projects" className="btn btn-primary magnetic btn-pop">
            <span>Lihat Proyek Saya</span>
          </Magnetic>
          <Magnetic href="#about" className="btn btn-outline magnetic btn-pop">
            <span>Tentang Saya</span>
          </Magnetic>
        </div>
      </Reveal>

      <BigPhoto className="hero-photo-wrap">
        <div className="photo-zoom-in">
          <TiltHeroPhoto />
        </div>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="sticker sticker-torii">⛩️</div>
        <div className="badge-float badge-pop">
          <span className="badge-emoji">🎯</span>
          <span>Self Improvement</span>
        </div>
      </BigPhoto>
    </section>
  );
}
