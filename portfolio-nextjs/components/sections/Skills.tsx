"use client";

import Reveal from "@/components/ui/Reveal";
import SkillMarquee from "@/components/three/SkillMarquee";

const GROUPS: { title: string; items: { icon: string; label: string }[] }[] = [
  {
    title: "Frontend",
    items: [
      { icon: "https://cdn.simpleicons.org/html5/E34F26", label: "HTML5 & CSS3" },
      { icon: "https://cdn.simpleicons.org/javascript/F7DF1E", label: "JavaScript (Vanilla)" },
      { icon: "https://cdn.simpleicons.org/react/61DAFB", label: "React" },
      { icon: "https://cdn.simpleicons.org/nextdotjs/000000", label: "Next.js (App Router)" },
      { icon: "https://cdn.simpleicons.org/typescript/3178C6", label: "TypeScript" },
      { icon: "https://cdn.simpleicons.org/pwa/5A0FC8", label: "PWA & Service Worker" },
      { icon: "https://api.iconify.design/lucide/smartphone.svg?color=%23FF6B6B", label: "Responsive Design" },
    ],
  },
  {
    title: "Backend",
    items: [
      { icon: "https://cdn.simpleicons.org/cloudflareworkers/F38020", label: "Cloudflare Workers" },
      { icon: "https://api.iconify.design/lucide/route.svg?color=%23E5533C", label: "REST API Design" },
      { icon: "https://cdn.simpleicons.org/websocket/000000", label: "WebSocket (realtime)" },
      { icon: "https://api.iconify.design/lucide/box.svg?color=%23F38020", label: "Durable Objects" },
      { icon: "https://api.iconify.design/lucide/key-round.svg?color=%233C4B64", label: "Token / Bearer Auth" },
      { icon: "https://api.iconify.design/lucide/shield-check.svg?color=%232E7D32", label: "Rate Limiting & CORS" },
    ],
  },
  {
    title: "Database & Storage",
    items: [
      { icon: "https://cdn.simpleicons.org/sqlite/003B57", label: "Cloudflare D1 (SQLite)" },
      { icon: "https://cdn.simpleicons.org/cloudflare/F38020", label: "Cloudflare KV (cache/session)" },
      { icon: "https://cdn.simpleicons.org/cloudflare/F38020", label: "Cloudflare R2 (object storage)" },
      { icon: "https://api.iconify.design/lucide/database-zap.svg?color=%23003B57", label: "SQL Migrations" },
    ],
  },
  {
    title: "Tools & Platform",
    items: [
      { icon: "https://cdn.simpleicons.org/cloudflarepages/F38020", label: "Cloudflare Pages" },
      { icon: "https://cdn.simpleicons.org/netlify/00C7B7", label: "Netlify" },
      { icon: "https://cdn.simpleicons.org/github/181717", label: "Git & GitHub" },
      { icon: "https://cdn.simpleicons.org/cloudflare/F38020", label: "Wrangler CLI" },
      { icon: "https://cdn.simpleicons.org/python/3776AB", label: "Python (build scripts)" },
    ],
  },
  {
    title: "Japanese & Other",
    items: [
      { icon: "https://api.iconify.design/lucide/graduation-cap.svg?color=%23BC002D", label: "JLPT N2" },
      { icon: "https://api.iconify.design/lucide/book-open.svg?color=%23BC002D", label: "Japanese Literature" },
      { icon: "https://cdn.simpleicons.org/figma/F24E1E", label: "UI/UX Design" },
      { icon: "https://api.iconify.design/lucide/search.svg?color=%23555555", label: "Research" },
      { icon: "https://api.iconify.design/lucide/pen-tool.svg?color=%23E5533C", label: "Content Creation" },
    ],
  },
];

// Gabungkan semua skill dari tiap kategori jadi list datar,
// lalu bagi rata jadi 2 baris untuk marquee (baris genap ke kiri, ganjil ke kanan).
const ALL_SKILLS = GROUPS.flatMap((g) => g.items);
const MID = Math.ceil(ALL_SKILLS.length / 2);
const MARQUEE_ROWS = [ALL_SKILLS.slice(0, MID), ALL_SKILLS.slice(MID)];

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <Reveal className="section-heading reveal">
        <span className="eyebrow-tag">Kemampuan</span>
      </Reveal>
      <SkillMarquee rows={MARQUEE_ROWS} />
      <div className="skills-grid">
        {GROUPS.map((g) => (
          <Reveal key={g.title} className="skill-group reveal">
            <h3>{g.title}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="skill-icon" src={it.icon} alt="" loading="lazy" decoding="async" />
                  {it.label}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
