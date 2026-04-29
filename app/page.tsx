import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Lives from "@/components/Lives";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Events />
      <About />
      <Schedule />
      <Gallery />
      <Lives />
      <Donate />
      <Contact />
      <Footer />
    </>
  );
}
