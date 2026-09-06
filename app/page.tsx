import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// ── Below-fold sections lazy-loaded to reduce initial JS bundle & TBT ──────
const AboutSection     = dynamic(() => import("@/components/AboutSection"));
const StackSection     = dynamic(() => import("@/components/StackSection"));
const ExperienceSection = dynamic(() => import("@/components/ExperienceSection"));
const ProjectsSection  = dynamic(() => import("@/components/ProjectsSection"));
const ContactSection   = dynamic(() => import("@/components/ContactSection"));
const Footer           = dynamic(() => import("@/components/Footer"));

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
