"use client";

import Reveal from "@/components/ui/Reveal";
import BigPhoto from "@/components/ui/BigPhoto";
import TiltCard3D from "@/components/ui/TiltCard3D";
import CountUp from "@/components/ui/CountUp";
import { SplitWords, SplitWordsFancy, SplitCharsFancy } from "@/components/ui/SplitText";

const PILLARS = [
  {
    index: "01",
    icon: "https://api.iconify.design/lucide/languages.svg?color=%23BC002D",
    title: "Japanese",
    desc: "Latar belakang Sastra Jepang, pembelajaran JLPT, dan pengalaman menggunakan bahasa Jepang dalam kehidupan sehari-hari di Jepang.",
  },
  {
    index: "02",
    icon: "https://api.iconify.design/lucide/heart-handshake.svg?color=%23E5533C",
    title: "Caregiving",
    desc: "Pengalaman bekerja sebagai care worker dan berinteraksi langsung dengan lansia di lingkungan kerja Jepang.",
  },
  {
    index: "03",
    icon: "https://api.iconify.design/lucide/code-2.svg?color=%233178C6",
    title: "Technology",
    desc: "Mengembangkan web tools dan learning tools untuk menyelesaikan kebutuhan nyata, terutama dalam pembelajaran bahasa Jepang.",
  },
];

export default function About() {
  return (
    <section className="about" id="about">
      <Reveal className="section-heading reveal about-heading">
        <span className="eyebrow-tag about-eyebrow-pop">Kenalan dulu</span>
        <h2 className="split-words">
          <SplitWords
            lines={[
              "Japanese Literature, Caregiving, dan Web Development",
              "— tiga hal yang membentuk cara saya bekerja.",
            ]}
          />
        </h2>
      </Reveal>

      <div className="about-grid">
        <BigPhoto className="about-photo">
          <TiltCard3D className="tilt-card about-tilt" maxTilt={8}>
            <div className="photo-rotate-in">
              <div className="about-photo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/about.jpg" alt="Foto Maul sedang bekerja" loading="lazy" decoding="async" />
                <div className="about-photo-shine" />
              </div>
            </div>
            <div className="about-photo-tag badge-pop">📚 Sedang riset soal penerjemahan bahasa Indonesia</div>
          </TiltCard3D>
        </BigPhoto>

        <Reveal className="about-text reveal about-text-stagger">
          <p lang="id" className="about-p split-words-fancy">
            <SplitWordsFancy
              lines={[
                "Halo semua, nama saya Irfan Faiz Maulana, biasa dipanggil Maul. Saya kerja di Jepang sebagai kaigo, sekaligus aktif kuliah sebagai mahasiswa Sastra Jepang secara online. Selain itu saya juga content creator kecil-kecilan, sekaligus bikin web-web belajar bahasa Jepang.",
              ]}
            />
          </p>
          <p lang="ja" className="about-p split-chars-fancy">
            <SplitCharsFancy text="みんな、こんにちは！イルファン・ファイズ・マウラナです、マウルって呼んでね。日本で介護の仕事をしながら、日本文学科の学生としてオンラインで大学にも通ってる。あと、小さなコンテンツクリエイターもやってて、日本語学習用のウェブサイトも作ってるよ。" />
          </p>
          <div className="about-facts">
            <div className="fact fact-pop">
              <span className="fact-number">N2</span>
              <span className="fact-label">Level JLPT</span>
            </div>
            <div className="fact fact-pop">
              <CountUp target={3} suffix="+" className="fact-number" />
              <span className="fact-label">Tahun Pengalaman Kaigo</span>
            </div>
            <div className="fact fact-pop">
              <CountUp target={4} suffix="+" className="fact-number" />
              <span className="fact-label">Web Project</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="about-pillars">
        {PILLARS.map((p) => (
          <Reveal key={p.index} className="pillar">
            <span className="pillar-index">{p.index}</span>
            <h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="pillar-icon" src={p.icon} alt="" loading="lazy" />
              {p.title}
            </h3>
            <p>{p.desc}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="philosophy-block reveal">
        <span className="eyebrow-tag">Personal philosophy</span>
        <h3>Stoicism · Mindfulness · Self-awareness</h3>
        <p>
          Saya percaya proses belajar bukan hanya tentang mencapai tujuan, tetapi juga memahami diri
          sendiri selama proses tersebut.
        </p>
      </Reveal>
    </section>
  );
}
