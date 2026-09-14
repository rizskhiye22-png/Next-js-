"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Skill" },
  { href: "#experience", label: "Pengalaman" },
  { href: "#projects", label: "Proyek" },
  { href: "#certificates", label: "Sertifikat" },
  { href: "#gallery", label: "Galeri" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = LINKS[0].href;
      const trigger = window.scrollY + window.innerHeight * 0.35;
      LINKS.forEach(({ href }) => {
        const el = document.querySelector(href);
        if (el && (el as HTMLElement).offsetTop <= trigger) current = href;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (!open) return;
      if (navRef.current && navRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickOutside);
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  return (
    <header className={`navbar${scrolled ? " is-scrolled" : ""}`} ref={navRef}>
      <a href="#home" className="logo">
        Maul<span className="dot">.</span>
      </a>
      <nav className={`nav-links${open ? " open" : ""}`} id="navLinks">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-text={l.label}
            className={active === l.href ? "is-active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <button
        className="burger"
        aria-label="Buka menu"
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
