"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const VIDEOS = [
  { c: "/assets/videos/2026-09-09-141404954_c.mp4", full: "/assets/videos/2026-09-09-141404954_full.mp4" },
  { c: "/assets/videos/2026-09-12-150724419_c.mp4", full: "/assets/videos/2026-09-12-150724419_full.mp4" },
  { c: "/assets/videos/lv_0_20260718141925_c.mp4", full: "/assets/videos/lv_0_20260718141925_full.mp4" },
  { c: "/assets/videos/lv_0_20260819213141_c.mp4", full: "/assets/videos/lv_0_20260819213141_full.mp4" },
  { c: "/assets/videos/lv_7580363292967963909_20260811223918_c.mp4", full: "/assets/videos/lv_7580363292967963909_20260811223918_full.mp4" },
  { c: "/assets/videos/final_clip_c.mp4", full: "/assets/videos/final_clip_full.mp4" },
];

function GalleryItem({
  video,
  delay,
  onOpen,
}: {
  video: (typeof VIDEOS)[number];
  delay: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" as never, amount: 0.15 });
  const revealed = useInView(ref, { once: true, amount: 0.15 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const vid = vidRef.current;
    if (!vid) return;
    if (inView) {
      if (!vid.src) vid.src = video.c;
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [inView, video.c]);

  return (
    <div
      ref={ref}
      className={`gallery-item gallery-reveal${revealed ? " is-visible" : ""}`}
      style={{ "--stagger": delay } as React.CSSProperties}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <video
        ref={vidRef}
        className="gallery-video"
        muted
        loop
        playsInline
        preload="none"
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
      />
      <div className="gallery-progress">
        <div className="gallery-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="gallery-play-overlay">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [current, setCurrent] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef(0);

  const open = (i: number) => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setCurrent(i);
  };

  const close = useCallback(() => {
    setCurrent(null);
    lastFocusRef.current?.focus();
  }, []);

  const go = useCallback(
    (delta: number) => {
      setCurrent((c) =>
        c === null ? c : (c + delta + VIDEOS.length) % VIDEOS.length
      );
    },
    []
  );

  useEffect(() => {
    if (current === null) return;
    document.body.classList.add("preloader-active");
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("preloader-active");
      document.removeEventListener("keydown", onKey);
    };
  }, [current !== null, close, go]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (current === null) return;
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [current]);

  return (
    <section className="gallery" id="gallery">
      <Reveal className="section-heading reveal">
        <span className="eyebrow-tag">Di balik layar</span>
        <h2>Cuplikan dari konten live.</h2>
      </Reveal>
      <div className="gallery-grid">
        {VIDEOS.map((v, i) => (
          <GalleryItem key={v.c} video={v} delay={i} onOpen={() => open(i)} />
        ))}
      </div>

      {current !== null && (
        <div
          className="video-lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau video galeri"
          onTouchStart={(e) => (touchStartX.current = e.changedTouches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
          }}
        >
          <div className="video-lightbox-backdrop" onClick={close} />
          <div className="video-lightbox-stage">
            <button className="lightbox-close" aria-label="Tutup" onClick={close} autoFocus>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" />
              </svg>
            </button>
            <button className="lightbox-nav lightbox-prev" aria-label="Sebelumnya" onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z" />
              </svg>
            </button>
            <video
              ref={videoRef}
              className="lightbox-video"
              playsInline
              controls
              src={VIDEOS[current].full}
            />
            <button className="lightbox-nav lightbox-next" aria-label="Berikutnya" onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="m8.6 16.6 1.4 1.4 6-6-6-6-1.4 1.4 4.6 4.6z" />
              </svg>
            </button>
            <div className="lightbox-dots">
              {VIDEOS.map((_, i) => (
                <span key={i} className={`dot${i === current ? " is-active" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
