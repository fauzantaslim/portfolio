import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StackSection from "@/components/StackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fauzan Taslim Hidayat",
  jobTitle: "Software Quality Engineer",
  url: "https://fauzantaslim.my.id",
  image: "https://fauzantaslim.my.id/ojan.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogor",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  email: "fauzantaslim123@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/fauzan-taslim-hidayat",
    "https://github.com/fauzantaslim",
  ],
  knowsAbout: ["Software Quality Assurance", "Test Automation", "REST API Development", "CI/CD", "Node.js", "TypeScript"],
};

export default function Home() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30 selection:text-foreground"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
