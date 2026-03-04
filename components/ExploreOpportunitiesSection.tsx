"use client";

import { InteractiveGlobe } from "@/components/ui/interactive-globe";

export default function ExploreOpportunitiesSection() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#000000] text-white py-24 overflow-hidden border-t border-white/10">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                {/* Ambient glow (subtle) */}
                <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-yellow-900/10 blur-[100px] pointer-events-none" />

                {/* Left content */}
                <div className="flex-1 flex flex-col justify-center relative z-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/70 mb-8 w-fit backdrop-blur-sm">
                        <span className="size-1.5 rounded-full bg-yellow-500 animate-pulse" />
                        Alcance Global Ativo
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1] mb-6">
                        Explorar <br />
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-[#F3EFE9]">
                            Oportunidades
                        </span>
                    </h2>

                    <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed mb-12 font-light">
                        Conectando investidores de alto padrão e projetos exclusivos de arquitetura em múltiplos continentes. Gire o globo para interagir e explorar nossas áreas de atuação internacionais.
                    </p>

                    <div className="flex flex-wrap items-center gap-8 md:gap-12">
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-white mb-1">15+</p>
                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/50">Projetos Exclusivos</p>
                        </div>
                        <div className="w-px h-10 bg-white/20 hidden md:block" />
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-white mb-1">3</p>
                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/50">Continentes Atuantes</p>
                        </div>
                        <div className="w-px h-10 bg-white/20 hidden md:block" />
                        <div>
                            <p className="text-3xl font-bold tracking-tight text-white mb-1">100%</p>
                            <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/50">Excelência e Rigor</p>
                        </div>
                    </div>
                </div>

                {/* Right — Globe */}
                <div className="flex-1 flex items-center justify-center relative min-h-[400px] md:min-h-[600px] z-10">
                    <InteractiveGlobe
                        size={550}
                        dotColor="rgba(255, 255, 255, ALPHA)"
                        arcColor="rgba(202, 138, 4, 0.4)"
                        markerColor="rgba(234, 179, 8, 1)"
                        className="md:scale-125"
                    />
                </div>
            </div>
        </section>
    );
}
