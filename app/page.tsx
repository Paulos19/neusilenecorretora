import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ProjectsIntroSection from "@/components/ProjectsIntroSection";
import ProjectsPreviewSection from "@/components/ProjectsPreviewSection";
import LiaSection from "@/components/LiaSection";
import ArchitectureBannerSection from "@/components/ArchitectureBannerSection";
import ExploreOpportunitiesSection from "@/components/ExploreOpportunitiesSection";
import FooterSection from "@/components/FooterSection";
import HighlightProductSection from "@/components/HighlightProductSection";
import ProductGridSection from "@/components/ProductGridSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { ContactPage } from "@/components/ui/contact-page";
import prisma from "@/lib/prisma";

export const revalidate = 0; // Ensure fresh data from DB on every request for dynamic products

export default async function Home() {
  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const highlightProduct = allProducts.find((p) => p.isHighlight) || null;
  const gridProducts = allProducts.filter((p) => !p.isHighlight);

  const half = Math.ceil(gridProducts.length / 2);
  const firstGrid = gridProducts.slice(0, half);
  const secondGrid = gridProducts.slice(half);

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

      <div className="relative z-45 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <ExploreOpportunitiesSection />
      </div>

      {/* Dynamic Products Sections - Continuing the same z-index layering pattern */}
      {highlightProduct && (
        <div className="relative z-50 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <HighlightProductSection product={highlightProduct} />
        </div>
      )}

      {firstGrid.length > 0 && (
        <div className="relative z-60 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
          <ProductGridSection title="Portfólio" products={firstGrid} />
        </div>
      )}

      {secondGrid.length > 0 && (
        <div className="relative z-70 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
          <ProductGridSection title="Obras Concluídas" products={secondGrid} reverseLayout />
        </div>
      )}

      {/* Testimonials Masonry Section */}
      <div className="relative z-80 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <TestimonialsSection />
      </div>

      {/* Contact & Footer Section */}
      <div className="relative z-90 w-full shadow-[0_-20px_60px_rgba(0,0,0,0.95)]">
        <ContactPage />
      </div>

      <div className="relative z-100 w-full shadow-[0_-20px_60px_rgba(0,0,0,0.95)]">
        <FooterSection />
      </div>
    </main>
  );
}
