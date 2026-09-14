import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <Reveal className="section-heading reveal">
        <span className="eyebrow-tag">Karya</span>
        <h2>Featured Web Projects</h2>
        <p>Tiap satu dibuat karena saya butuh alatnya sendiri — semoga kamu juga.</p>
      </Reveal>
      <div className="project-grid">
        <ProjectCard
          img="/assets/images/project1.jpg"
          imgAlt="Screenshot N2 Goii"
          number="01"
          title="N2 語彙 — Kosakata JLPT N2"
          desc="PWA belajar kosakata JLPT N2 berbasis Shinkanzen Master Goi — flashcard, furigana, progress tracking, dan bookmark. Versi terbaru dibangun ulang dengan Next.js (App Router) di frontend, terhubung ke backend Cloudflare Worker dengan database D1, cache KV, dan sistem akun anonim berbasis token untuk sinkronisasi progress lintas perangkat."
          tags={["JLPT N2", "語彙 · Kosakata"]}
        />
        <ProjectCard
          img="/assets/images/project4.jpg"
          imgAlt="Logo JLPT Live Chat"
          number="02"
          title="JLPT Live Chat — Hub Materi & Komunitas"
          desc="Landing page pusat semua tools JLPT (N2–N3) sekaligus live chat komunitas realtime. Backend Cloudflare Worker terpisah menangani chat via WebSocket & Durable Object, histori pesan tersimpan di D1, file/avatar di R2, dengan panel admin untuk kelola room dan integrasi GIPHY API untuk stiker."
          tags={["JLPT N2–N3", "Komunitas Jepang"]}
        />
      </div>
    </section>
  );
}
