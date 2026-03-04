"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface HighlightProductSectionProps {
    product: {
        title: string | null;
        description: string;
        price: string;
        imageUrl: string;
    } | null;
}

export default function HighlightProductSection({ product }: HighlightProductSectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    if (!product) return null;

    return (
        <section ref={containerRef} className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden border-t border-[#1A1A1A]/20 bg-[#F3EFE9]">
            {/* Left Block (35%) */}
            <div className={`w-full lg:w-[35%] flex flex-col items-center justify-between py-12 px-8 lg:py-16 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/20 z-10 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>
                {/* Tagline */}
                <p className="text-xl md:text-2xl font-medium tracking-tight text-[#1A1A1A] mt-4 text-center">
                    A essência do luxo<br />contemporâneo.
                </p>

                {/* Product Box simulation */}
                <div className="flex flex-col items-center mt-12 mb-8 w-full max-w-[280px]">
                    <div className="w-[85%] aspect-square relative shadow-2xl bg-zinc-200 shrink-0 overflow-hidden border border-[#1A1A1A]/10 z-20 -mb-6">
                        <Image
                            src={product.imageUrl}
                            alt="Product Preview"
                            fill
                            className="object-cover transition-transform duration-[2s] hover:scale-105"
                        />
                    </div>

                    {/* Brand / Logo representation block */}
                    <div className="bg-[#FDFBF7] w-full pt-16 pb-8 px-6 text-center shadow-md flex flex-col items-center border border-[#1A1A1A]/10 z-10 relative">
                        <h2 className="text-4xl font-black tracking-[-0.05em] uppercase leading-none mb-6 text-[#1A1A1A]">
                            NEUSI<br />LENE
                        </h2>
                        <div className="w-8 h-[2px] bg-red-700/80 mb-6" />
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">
                            Nova Coleção Exclusiva
                        </p>
                        <p className="text-xs text-[#1A1A1A]/70 mt-2 font-medium">
                            Edição Limitada
                        </p>
                    </div>
                </div>

                {/* Bottom Details */}
                <div className="flex flex-col items-center text-center pb-4">
                    <span className="text-sm font-bold tracking-widest uppercase text-[#1A1A1A] mb-3">
                        {product.title}
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-[#1A1A1A]/60">
                        PROJETO <span className="ml-2 font-black text-[#1A1A1A]">{product.price}</span>
                    </span>
                </div>
            </div>

            {/* Right Block (65%) */}
            <div className={`w-full lg:w-[65%] relative flex items-center justify-center p-8 lg:p-24 bg-[#748782] overflow-hidden min-h-[60vh] transition-all duration-1000 delay-200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>
                <div className="relative w-full max-w-2xl aspect-[4/3] rounded-sm bg-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform transition-transform duration-[2.5s] hover:scale-105">
                    <Image
                        src={product.imageUrl}
                        alt={product.title || "Destaque"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                </div>

                {/* The Arrow Overlay matching the visual reference */}
                <div className="absolute top-[65%] right-[10%] lg:top-[55%] lg:right-[15%] w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] translate-x-12 translate-y-12 mix-blend-multiply opacity-90">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#1A1A1A] rotate-45 transform">
                        <path d="M 10 40 L 60 40 L 60 10 L 100 50 L 60 90 L 60 60 L 10 60 Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
