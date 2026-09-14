import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Research() {
  return (
    <section className="projects projects-research" id="research">
      <Reveal className="section-heading reveal">
        <span className="eyebrow-tag">Riset</span>
        <h2>Research &amp; Academic Projects</h2>
      </Reveal>
      <div className="project-grid">
        <ProjectCard
          img="/assets/images/project2.jpg"
          imgAlt="Screenshot Hototogisu"
          number="01"
          title="不如帰 Hototogisu — Ringkasan Sastra"
          desc="Presentasi interaktif membahas novel klasik Jepang era Meiji karya Tokutomi Roka — tragedi, kritik sosial, dan suara perempuan yang dibungkam dalam sastra 1898."
          tags={["Sastra Jepang", "Era Meiji"]}
          link={{ href: "#", label: "Live demo segera hadir", placeholder: true }}
        />
        <ProjectCard
          img="/assets/images/project3.jpg"
          imgAlt="Screenshot Metodologi Onomatope"
          number="02"
          title="Metodologi Penelitian — Onomatope One Piece"
          desc="Ringkasan bab metodologi penelitian deskriptif kualitatif tentang penggunaan dan penerjemahan onomatope (giongo & gitaigo) Jepang pada anime One Piece episode 1071."
          tags={["Linguistik Jepang", "Giongo & Gitaigo"]}
          link={{ href: "#", label: "Live demo segera hadir", placeholder: true }}
        />
      </div>
    </section>
  );
}
