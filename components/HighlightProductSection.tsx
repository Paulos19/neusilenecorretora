"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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

    // We will split the title to mimic the DS&D URGA reference image typography
    const words = product.title ? product.title.split(" ") : ["EMPRE", "ENDIMENTO"];
    const word1 = words[0] || "HIGH";
    const word2 = words.length > 1 ? words.slice(1).join(" ") : "LIGHT";

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#FDFBF7] flex flex-col lg:flex-row overflow-hidden text-[#1A1A1A] border-t border-[#1A1A1A]/10">

            {/* Left Typography Block (Massive Font) */}
            <div className="w-full lg:w-[60%] min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-24 lg:pt-0 z-10 relative">
                <h2 className="text-[28vw] lg:text-[22vw] font-bold leading-[0.75] tracking-tighter uppercase flex flex-col shrink-0">
                    <span className="block">{word1}</span>
                    <span className="block">{word2}</span>
                </h2>
                <div className="mt-12 lg:mt-24 max-w-md">
                    <p className="text-base md:text-lg font-light leading-relaxed text-[#1A1A1A]/80">
                        {product.description}
                    </p>
                </div>
            </div>

            {/* Right Image Container */}
            <div className="w-full lg:w-[40%] relative min-h-[60vh] lg:min-h-screen bg-zinc-200">
                <Image
                    src={product.imageUrl}
                    alt={product.title || "Produto Destaque"}
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-105"
                />

                {/* Price Tag Overlay on the image */}
                <div className="absolute bottom-12 right-12 z-10 flex flex-col items-end">
                    <span className="text-sm tracking-widest uppercase font-medium bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-xl">
                        {product.price}
                    </span>
                </div>
            </div>
        </section>
    );
}
