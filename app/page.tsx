import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ProjectsIntroSection from "@/components/ProjectsIntroSection";
import ProjectsPreviewSection from "@/components/ProjectsPreviewSection";
import LiaSection from "@/components/LiaSection";
import ArchitectureBannerSection from "@/components/ArchitectureBannerSection";
import HighlightProductSection from "@/components/HighlightProductSection";
import ProductGridSection from "@/components/ProductGridSection";
import prisma from "@/lib/prisma";

export const revalidate = 0; // Ensure fresh data from DB on every request for dynamic products

export default async function Home() {
  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const highlightProduct = allProducts.find(p => p.isHighlight) || null;
  const gridProducts = allProducts.filter(p => !p.isHighlight);

  const half = Math.ceil(gridProducts.length / 2);
  const firstGrid = gridProducts.slice(0, half);
  const secondGrid = gridProducts.slice(half);

  return (
    <main className="relative min-h-screen bg-black text-white font-sans antialiased overflow-hidden flex flex-col">
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

      {/* Dynamic Products Sections */}
      {highlightProduct && (
        <div className="relative z-50 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <HighlightProductSection product={highlightProduct} />
        </div>
      )}

      {firstGrid.length > 0 && (
        <div className={`relative z-50 w-full ${!highlightProduct ? 'shadow-[0_-20px_50px_rgba(0,0,0,0.5)]' : ''}`}>
          <ProductGridSection title="Portfólio" products={firstGrid} />
        </div>
      )}

      {secondGrid.length > 0 && (
        <div className="relative z-50 w-full">
          <ProductGridSection title="Obras Concluídas" products={secondGrid} reverseLayout />
        </div>
      )}
    </main>
  );
}
