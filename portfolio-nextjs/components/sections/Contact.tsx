"use client";

import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import LazyCanvas from "@/components/ui/LazyCanvas";
import Magnetic from "@/components/ui/Magnetic";
import { SplitWordsFancy } from "@/components/ui/SplitText";
import { use3DEnabled } from "@/lib/use3DEnabled";

const AmbientParticles = dynamic(() => import("@/components/three/AmbientParticles"), {
  ssr: false,
});

export default function Contact() {
  const enabled3D = use3DEnabled();

  return (
    <section className="contact" id="contact">
      {enabled3D && (
        <LazyCanvas>
          <AmbientParticles />
        </LazyCanvas>
      )}
      <Reveal className="contact-box reveal">
        <div className="contact-deco contact-deco-breathe" aria-hidden="true">
          また会いましょう
        </div>
        <span className="eyebrow-tag eyebrow-light about-eyebrow-pop">Punya ide?</span>
        <h2 className="split-words-fancy">
          <SplitWordsFancy
            lines={["Ngobrolin proyek, kolaborasi,", "atau cuma mau tanya soal JLPT — gaskeun."]}
            baseDelay={0.15}
          />
        </h2>
        <div className="contact-links contact-links-pop contact-links-primary">
          <Magnetic href="mailto:irfanfzm10@gmail.com" className="contact-pill magnetic contact-pill-anim">
            ✉️ irfanfzm10@gmail.com
          </Magnetic>
          <span className="contact-pill contact-pill-anim is-placeholder" aria-disabled="true">
            💻 GitHub segera hadir
          </span>
          <span className="contact-pill contact-pill-anim is-placeholder" aria-disabled="true">
            🔗 LinkedIn segera hadir
          </span>
        </div>
        <div className="contact-links contact-links-pop contact-links-social">
          <Magnetic
            href="https://tiktok.com/@themars227"
            target="_blank"
            rel="noopener"
            className="contact-pill magnetic contact-pill-anim"
          >
            🎵 TikTok @themars227
          </Magnetic>
          <Magnetic
            href="https://instagram.com/i_fzml"
            target="_blank"
            rel="noopener"
            className="contact-pill magnetic contact-pill-anim"
          >
            📷 Instagram @i_fzml
          </Magnetic>
        </div>
      </Reveal>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Maul. Dibuat dengan ⛩️, kopi, dan beberapa kali refresh CSS.</p>
      </footer>
    </section>
  );
}
