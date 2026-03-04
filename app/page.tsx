import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ProjectsIntroSection from "@/components/ProjectsIntroSection";
import ProjectsPreviewSection from "@/components/ProjectsPreviewSection";
import LiaSection from "@/components/LiaSection";
import ArchitectureBannerSection from "@/components/ArchitectureBannerSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white font-sans antialiased">
      <Header />
      <HeroSection />

      {/* AboutSection rolls normally, keeping its background color and styling */}
      <div className="relative z-10 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <AboutSection />
      </div>

      <ProjectsIntroSection />

      <div className="relative z-20 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <ProjectsPreviewSection />
      </div>

      <div className="relative z-30 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <LiaSection />
      </div>

      <div className="relative z-40 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <ArchitectureBannerSection />
      </div>
    </main>
  );
}
