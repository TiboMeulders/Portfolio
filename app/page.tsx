import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ParticleField from "@/components/ParticleField";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <ParticleField />
      <Cursor />
      <Nav />
      <main className="site">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
