import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/Navbar";
import Intro from "@/components/sections/Intro";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Certificates from "@/components/sections/Certificates";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

export const runtime = "edge";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Langsung ke konten utama
      </a>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Intro />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Certificates />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
