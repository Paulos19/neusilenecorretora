"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AboutSection() {
    const observerRefs = useRef<Array<HTMLElement | null>>([]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    // Start removing opacity-0 and transform offsets
                    el.classList.remove("opacity-0", "translate-y-24", "scale-95", "scale-105");
                    el.classList.add("opacity-100", "translate-y-0", "scale-100");
                } else {
                    // Add them back when scrolled away
                    el.classList.remove("opacity-100", "translate-y-0", "scale-100");
                    if (el.dataset.zoom) {
                        el.classList.add("opacity-0", "scale-105"); // Image zooms out slightly
                    } else {
                        el.classList.add("opacity-0", "translate-y-24", "scale-95"); // Text slides down
                    }
                }
            });
        }, observerOptions);

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const setRef = (index: number) => (el: HTMLElement | null) => {
        observerRefs.current[index] = el;
    };

    return (
        <section
            id="sobre"
            className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
            style={{ backgroundColor: "#8A9081" }}
        >
            {/* Background/Subject Placeholder (centered) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Subtile gradient to keep texts readable */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent z-10" />

                <div
                    ref={setRef(0)}
                    data-zoom="true"
                    className="absolute inset-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 scale-105 will-change-transform"
                >
                    <Image
                        src="/neusilene-portrait.jpg"
                        alt="Neusilene Dias"
                        fill
                        className="object-cover object-center md:object-top opacity-90 mix-blend-normal"
                        priority
                    />
                </div>
            </div>

            {/* Top Content Row */}
            <div className="relative z-20 w-full px-6 pt-32 pb-8 flex flex-col md:flex-row-reverse justify-between items-start">

                {/* Left (now Right) Paragraph Copy */}
                <p
                    ref={setRef(1)}
                    className="text-white max-w-md text-lg md:text-xl font-light leading-relaxed drop-shadow-md z-20 mt-8 md:mt-24 md:mr-12 lg:mr-24 text-right transition-all duration-1000 delay-200 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
                >
                    Intrigada pela beleza, fascinada pela arquitetura e impulsionada por uma devoção eterna a conexões significativas e lares extraordinários.
                </p>

                {/* Right (now Left) Info Box (Desktop) */}
                <div
                    ref={setRef(2)}
                    className="hidden md:flex flex-col items-start mt-8 ml-12 lg:ml-24 z-20 transition-all duration-1000 delay-100 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
                >
                    <span className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium tracking-[0.2em] uppercase border border-white/20 shadow-lg">
                        Creci: 77668
                    </span>
                </div>
            </div>

            {/* Mobile Info Box */}
            <div
                ref={setRef(3)}
                className="md:hidden relative z-20 px-6 mt-4 mb-4 transition-all duration-1000 delay-100 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
            >
                <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium tracking-widest uppercase border border-white/20">
                    Creci: 77668
                </span>
            </div>

            {/* Huge Editorial Typography at the Bottom/Center */}
            <div className="relative z-10 w-full px-4 md:px-12 pb-12 md:pb-24 mt-auto flex flex-col justify-end">
                <h2
                    ref={setRef(4)}
                    className="text-[25vw] sm:text-[22vw] md:text-[18vw] font-medium leading-[0.85] tracking-tighter text-white z-10 w-full max-w-[1400px] mx-auto drop-shadow-2xl transition-all duration-1000 delay-300 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
                >
                    Neusilene
                    <br />
                    Dias
                </h2>
            </div>

            {/* Subtle bottom scroll indicator */}
            <div
                ref={setRef(5)}
                className="absolute bottom-8 right-8 z-20 hidden md:block transition-all duration-1000 delay-500 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
            >
                <span className="text-white/60 text-xs tracking-widest uppercase font-light mix-blend-difference">
                    Role para explorar
                </span>
            </div>
        </section>
    );
}
