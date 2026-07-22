import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CatalogCarousel } from "@/components/sections/CatalogCarousel";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Technologies } from "@/components/sections/Technologies";
import { Projects } from "@/components/sections/Projects";
import { Differentials } from "@/components/sections/Differentials";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/BackToTop";
import KineticGrid from "@/components/ui/kinetic-grid";

export default function HomePage() {
  return (
    <KineticGrid className="overflow-x-clip">
      <Header />
      <main>
        <Hero />
        <CatalogCarousel />
        <Services />
        <Process />
        <Technologies />
        <Projects />
        <Differentials />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </KineticGrid>
  );
}
