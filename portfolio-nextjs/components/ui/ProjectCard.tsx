"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import TiltCard3D from "./TiltCard3D";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "@/lib/use3DEnabled";

type Props = {
  img: string;
  imgAlt: string;
  number: string;
  title: string;
  desc: string;
  tags: string[];
  link?: { href: string; label: string; placeholder?: boolean };
};

// Kartu proyek: border SVG "digambar" saat masuk viewport + tilt 3D.
export default function ProjectCard({ img, imgAlt, number, title, desc, tags, link }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const reduced = usePrefersReducedMotion();
  const [perimeter, setPerimeter] = useState(0);
  const [sketched, setSketched] = useState(false);
  const inView = useInView(cardRef, { once: true, amount: 0.25 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const measure = () => setPerimeter(2 * (el.offsetWidth + el.offsetHeight));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduced) {
      setSketched(true);
      return;
    }
    if (!inView || perimeter === 0) return;
    const raf = requestAnimationFrame(() => {
      if (rectRef.current) rectRef.current.style.strokeDashoffset = "0";
    });
    const t = window.setTimeout(() => setSketched(true), 700);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [inView, perimeter, reduced]);

  return (
    <Reveal className="reveal" threshold={0.1}>
      <div ref={cardRef}>
      <TiltCard3D
        className={`project-card${sketched ? " is-sketched" : ""}`}
        maxTilt={7}
      >
        {!reduced && (
          <svg className="project-card-sketch" preserveAspectRatio="none" aria-hidden="true">
            <rect
              ref={rectRef}
              x="1.5"
              y="1.5"
              width="calc(100% - 3px)"
              height="calc(100% - 3px)"
              rx="13"
              style={{
                strokeDasharray: perimeter,
                strokeDashoffset: perimeter,
                transition: "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)",
              }}
            />
          </svg>
        )}
        <div className="project-card-inner-content">
          <div className="project-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={imgAlt} loading="lazy" decoding="async" />
            <span className="project-number">{number}</span>
          </div>
          <div className="project-body">
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="project-tags">
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            {link &&
              (link.placeholder ? (
                <span className="project-link is-placeholder" aria-disabled="true">
                  {link.label}
                </span>
              ) : (
                <a href={link.href} className="project-link">
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </TiltCard3D>
      </div>
    </Reveal>
  );
}
