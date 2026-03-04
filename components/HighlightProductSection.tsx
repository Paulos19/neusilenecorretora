"use client";

import Image from "next/image";
import { useRef } from "react";

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

    if (!product) return null;

    // We will split the title into multiple words and render each on a strict block line
    const words = product.title ? product.title.split(" ") : ["EMPRE", "ENDIMENTO"];

    return (
        <section ref={containerRef} className="relative w-full h-[110vh] bg-[#F3EFE9] flex flex-col lg:flex-row overflow-hidden text-[#000000] border-t border-[#1A1A1A]/10">

            {/* Left Typography Block (Fits inside 70% width on Desktop, full on Mobile) */}
            <div className="w-full lg:w-[70%] h-[55vh] lg:h-[110vh] flex flex-col justify-center pt-24 lg:pt-0 z-10 relative px-6 md:px-12 lg:px-16">

                {/* Title as a literal Grid / Block - scaled down to fit */}
                <h2 className="text-[16vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.8] tracking-[-0.05em] uppercase flex flex-col shrink-0 break-words">
                    {words.map((word, index) => (
                        <span key={index} className="block w-full">
                            {word}
                        </span>
                    ))}
                </h2>

                <div className="mt-8 lg:mt-12 max-w-lg px-2 lg:px-4 hidden md:block">
                    <p className="text-sm md:text-lg font-medium leading-relaxed text-[#1A1A1A]/90 line-clamp-4">
                        {product.description}
                    </p>
                </div>
            </div>

            {/* Right Image Container - 30% Grid Split */}
            <div className="w-full lg:w-[30%] relative h-[55vh] lg:h-[110vh] bg-zinc-300">
                <Image
                    src={product.imageUrl}
                    alt={product.title || "Produto Destaque"}
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-105"
                />

                {/* Prominent Price Tag Overlay on the image */}
                <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 z-10 flex flex-col items-center lg:items-end w-full lg:w-auto px-6">
                    <div className="bg-[#1A1A1A] text-white px-8 py-4 lg:px-10 lg:py-6 rounded-2xl shadow-2xl flex items-center gap-6 group cursor-pointer transition-colors hover:bg-black">
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] tracking-widest uppercase font-semibold text-white/60 mb-1">A partir de</span>
                            <span className="text-2xl lg:text-4xl tracking-tighter font-bold">{product.price}</span>
                        </div>
                        <span className="text-3xl lg:text-5xl font-light transform transition-transform group-hover:translate-x-2">→</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
