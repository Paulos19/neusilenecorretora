"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ArchitectureBannerSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        }, observerOptions);

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Deterministic pseudo-random delay generator for the out-of-order effect
    // This avoids React hydration mismatches while still looking randomized
    const getPseudoRandomDelay = (index: number) => {
        // A simple math trick to get a bouncy, scattered array of values between 0 and 1
        const pseudoRandom = Math.abs(Math.sin(index * 13.579));
        return Math.round(pseudoRandom * 1200) + 100; // Between 100ms and 1300ms, strictly rounded
    };

    const renderScrambledText = (text: string, customBaseDelay = 0) => {
        return text.split('').map((char, i) => {
            const delay = getPseudoRandomDelay(i) + customBaseDelay;

            return (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[filter,opacity] ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-[12px]"
                        }`}
                    style={{
                        transitionDelay: `${delay}ms`
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            );
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-[#F5F5F5] overflow-hidden flex items-center"
        >
            {/* Background Image (The Architecture Sketch) 
                Object position is set to object-right to ensure the sketch on the right stays visible 
                while the left side remains blank for text.
            */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/banner.png"
                    alt="Architecture Blueprint Sketch"
                    fill
                    className="object-cover object-right md:object-center opacity-90 mix-blend-multiply"
                    priority
                />
            </div>

            {/* Gradient to ensure text readability on the left side, fading out towards the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/70 to-transparent z-0 pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-2xl flex flex-col items-start gap-8">

                    <div className="flex items-center gap-3">
                        <span className={`w-8 h-[1px] bg-[#1A1A1A] transition-all duration-1000 delay-500 origin-left ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />
                        <span className={`text-xs md:text-sm tracking-[0.3em] uppercase font-bold text-[#1A1A1A] transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                            Visão Arquitetônica
                        </span>
                    </div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-medium leading-[0.95] tracking-tighter text-[#1A1A1A]">
                        <div className="overflow-visible block">
                            {renderScrambledText("A fundação", 0)}
                        </div>
                        <div className="overflow-visible block">
                            {renderScrambledText("de cada", 200)} <span className="text-[#8A9081]">{renderScrambledText("sonho.", 300)}</span>
                        </div>
                    </h2>

                    <p className={`text-lg md:text-xl font-light leading-relaxed text-[#1A1A1A]/70 max-w-lg mt-4 transition-all duration-1000 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        Onde linhas precisas encontram propósitos profundos. A arquitetura não é apenas sobre erguer paredes, é sobre esculpir o espaço impecável onde a sua história vai se desdobrar.
                    </p>

                </div>
            </div>
        </section>
    );
}
