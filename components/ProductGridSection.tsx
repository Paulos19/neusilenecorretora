"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Product {
    id: string;
    title: string | null;
    description: string;
    price: string;
    imageUrl: string;
}

interface ProductGridSectionProps {
    title: string;
    products: Product[];
    reverseLayout?: boolean;
}

export default function ProductGridSection({ title, products, reverseLayout = false }: ProductGridSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
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

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (!products || products.length === 0) return null;

    const renderConvergingText = (text: string) => {
        let globalIndex = 0;
        const totalChars = text.replace(/\s/g, "").length;

        return text.split(" ").map((word, wIdx, wordsArr) => (
            <span key={wIdx} className="inline-block whitespace-nowrap">
                {word.split("").map((char) => {
                    const i = globalIndex++;
                    const distFromCenter = i - totalChars / 2;
                    const xOffset = -distFromCenter * 3;
                    const yOffset = Math.abs(distFromCenter) * 1.5;
                    const initialRotation = distFromCenter * 8;

                    return (
                        <span
                            key={i}
                            className={`inline-block transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter] ${isVisible
                                ? "opacity-100 blur-0"
                                : "opacity-0 blur-2xl"
                                }`}
                            style={{
                                transform: isVisible
                                    ? "translate(0, 0) scale(1) rotate(0deg)"
                                    : `translate(${xOffset}vw, ${yOffset}vh) scale(0) rotate(${initialRotation}deg)`,
                                transitionDelay: `${Math.abs(distFromCenter) * 40}ms`
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
                {wIdx < wordsArr.length - 1 && " "}
            </span>
        ));
    };

    return (
        <section ref={sectionRef} className="w-full bg-[#F3EFE9] text-[#1A1A1A] border-t border-[#1A1A1A]/20">

            {/* Header Block */}
            <div className={`w-full border-b border-[#1A1A1A]/20 px-8 py-16 lg:py-20 flex justify-center overflow-visible`}>
                <div className="perspective-1000 w-full text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase text-[#1A1A1A] text-center inline-block">
                        {renderConvergingText(title)}
                    </h2>
                </div>
            </div>

            {/* Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full auto-rows-fr">
                {products.map((product, idx) => {
                    const isHero = idx === 0;
                    // On desktop, we handle reversing placement by tweaking flex order.
                    const orderClass = reverseLayout && isHero ? "lg:order-last" : "";
                    const borderClass = reverseLayout && isHero ? "border-b lg:border-b-0 border-[#1A1A1A]/20" : "border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/20";

                    // Hero Block (Large background image with massive text layer)
                    if (isHero) {
                        return (
                            <div
                                key={product.id}
                                className={`col-span-1 md:col-span-2 lg:col-span-2 ${orderClass} ${borderClass} relative aspect-square lg:aspect-auto min-h-[500px] overflow-hidden group transition-all duration-1000 delay-100 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}
                            >
                                <Image
                                    src={product.imageUrl}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                    alt={product.title || "Projeto"}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Vignette to ensure text pops */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />

                                <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12 flex flex-col justify-end text-white pointer-events-none">
                                    <h3 className="text-5xl md:text-6xl lg:text-[5vw] font-bold leading-[0.85] tracking-tighter text-white drop-shadow-2xl uppercase mb-6">
                                        {product.title?.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
                                    </h3>
                                    <div className="w-12 h-[2px] bg-white mb-4" />
                                    <p className="text-white/90 font-bold tracking-widest text-sm uppercase drop-shadow-md">
                                        A partir de {product.price}
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    // Product Card Block
                    return (
                        <div
                            key={product.id}
                            className={`col-span-1 border-b lg:border-b-0 lg:border-r last:lg:border-r-0 border-[#1A1A1A]/20 flex flex-col items-center justify-between p-8 bg-[#FDFBF7] group relative overflow-hidden transition-all duration-1000 ease-out`}
                            style={{
                                transitionDelay: `${isVisible ? 200 + idx * 100 : 0}ms`,
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "translateY(0)" : "translateY(24px)"
                            }}
                        >
                            {/* Top decorative element */}
                            <div className="w-full flex justify-between items-center mb-10">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/50">ID {product.id.substring(0, 6)}</span>
                                <span className="w-2 h-2 rounded-full bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A] transition-colors duration-500" />
                            </div>

                            {/* Image inside a precise container */}
                            <div className="relative w-full aspect-[4/5] bg-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.15)] mb-10 overflow-hidden border border-[#1A1A1A]/10 transition-transform duration-700 group-hover:-translate-y-4">
                                <Image
                                    src={product.imageUrl}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    alt={product.title || "Projeto"}
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                />
                            </div>

                            {/* Text structured at bottom */}
                            <div className="w-full flex flex-col items-center text-center pb-2">
                                <h4 className="text-2xl font-black uppercase tracking-[-0.03em] text-[#1A1A1A] mb-3 leading-none">{product.title}</h4>
                                <p className="text-[10px] tracking-widest font-bold text-[#1A1A1A]/50 uppercase mb-4 line-clamp-1">
                                    {product.description}
                                </p>
                                <span className="text-sm font-bold tracking-widest text-[#1A1A1A] bg-[#1A1A1A]/5 px-4 py-2 rounded-full">
                                    {product.price}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
