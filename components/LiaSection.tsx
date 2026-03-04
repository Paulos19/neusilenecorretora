"use client";

import { useEffect, useRef } from "react";

export default function LiaSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const videoElementRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2, // Trigger when 20% visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (textRef.current) {
                        textRef.current.classList.remove("opacity-0", "translate-y-24", "scale-95");
                        textRef.current.classList.add("opacity-100", "translate-y-0", "scale-100");
                    }
                    if (videoWrapperRef.current) {
                        videoWrapperRef.current.classList.remove("opacity-0", "translate-y-24", "scale-95");
                        videoWrapperRef.current.classList.add("opacity-100", "translate-y-0", "scale-100");
                        if (videoElementRef.current) {
                            videoElementRef.current.play().catch(e => console.log("Video autoplay prevented:", e));
                        }
                    }
                } else {
                    if (textRef.current) {
                        textRef.current.classList.remove("opacity-100", "translate-y-0", "scale-100");
                        textRef.current.classList.add("opacity-0", "translate-y-24", "scale-95");
                    }
                    if (videoWrapperRef.current) {
                        videoWrapperRef.current.classList.remove("opacity-100", "translate-y-0", "scale-100");
                        videoWrapperRef.current.classList.add("opacity-0", "translate-y-24", "scale-95");
                        if (videoElementRef.current) {
                            videoElementRef.current.pause();
                        }
                    }
                }
            });
        }, observerOptions);

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="lia-ai"
            className="relative w-full min-h-screen bg-[#050505] text-white py-24 md:py-32 overflow-hidden flex items-center"
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-[#8A9081]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">

                {/* Text Content */}
                <div
                    ref={textRef}
                    className="w-full md:w-1/2 flex flex-col items-start transition-all duration-1000 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#8A9081] animate-pulse" />
                        <span className="text-xs md:text-sm tracking-[0.2em] uppercase font-medium text-[#8A9081]">
                            Inteligência Artificial
                        </span>
                    </div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6vw] leading-[0.9] tracking-tighter font-medium mb-8">
                        Conheça <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Lia.</span>
                    </h2>

                    <p className="text-lg md:text-xl font-light leading-relaxed text-zinc-300 max-w-lg mb-10">
                        Sua secretária virtual exclusiva. Desenvolvida com IA de ponta para entender seus desejos e ajudar você a encontrar a moradia dos seus sonhos com precisão e sofisticação.
                    </p>

                    <button className="group flex items-center gap-4 border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                        <span className="text-sm tracking-widest uppercase font-medium">Falar com Lia</span>
                        <div className="w-8 h-[1px] bg-white group-hover:bg-black transition-colors duration-500 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white group-hover:border-black transform rotate-45 transition-colors duration-500" />
                        </div>
                    </button>
                </div>

                {/* Video Content */}
                <div
                    ref={videoWrapperRef}
                    className="w-full md:w-1/2 flex justify-center md:justify-end transition-all duration-1000 delay-200 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
                >
                    {/* Adjusted size: Constrain by height to always fit the screen */}
                    <div className="relative h-[85vh] max-h-[800px] aspect-[9/16] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10 p-2 bg-gradient-to-b from-white/5 to-transparent">
                        <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black isolation-isolate">
                            <video
                                ref={videoElementRef}
                                src="/video/Smartphone_animation_lia_reveal_416235f413.mp4"
                                className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
