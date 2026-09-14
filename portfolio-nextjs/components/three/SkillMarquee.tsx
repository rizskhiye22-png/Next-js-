"use client";

import { usePrefersReducedMotion } from "@/lib/use3DEnabled";

type SkillChip = { icon: string; label: string };

function Row({
  items,
  direction,
  duration,
}: {
  items: SkillChip[];
  direction: "left" | "right";
  duration: number;
}) {
  // Duplikasi item agar loop terlihat mulus tanpa jeda.
  const looped = [...items, ...items];
  return (
    <div className="skill-marquee-row" aria-hidden={false}>
      <div
        className={`skill-marquee-track marquee-${direction}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {looped.map((it, i) => (
          <span className="skill-chip" key={`${it.label}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.icon} alt="" loading="lazy" decoding="async" />
            {it.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillMarquee({ rows }: { rows: SkillChip[][] }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    // Fallback statis: tampilkan semua chip tanpa animasi bila user minta reduced motion.
    const all = rows.flat();
    return (
      <div className="skill-marquee is-static" aria-label="Daftar kemampuan">
        <div className="skill-marquee-row">
          <div className="skill-marquee-track">
            {all.map((it, i) => (
              <span className="skill-chip" key={`${it.label}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.icon} alt="" loading="lazy" decoding="async" />
                {it.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-marquee" aria-label="Daftar kemampuan, bergulir otomatis">
      {rows.map((rowItems, i) => (
        <Row
          key={i}
          items={rowItems}
          direction={i % 2 === 0 ? "left" : "right"}
          duration={26 + i * 6}
        />
      ))}
    </div>
  );
}
