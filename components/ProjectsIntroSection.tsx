"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function ProjectsIntroSection() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const observerRefs = useRef<Array<HTMLElement | null>>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1 based on screen width/height
            // This allows us to slightly move the floating images for a parallax effect
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    el.classList.remove("opacity-0", "translate-y-24", "scale-95");
                    el.classList.add("opacity-100", "translate-y-0", "scale-100");
                } else {
                    el.classList.remove("opacity-100", "translate-y-0", "scale-100");
                    el.classList.add("opacity-0", "translate-y-24", "scale-95");
                }
            });
        }, observerOptions);

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            observer.disconnect();
        };
    }, []);

    const setRef = (index: number) => (el: HTMLElement | null) => {
        observerRefs.current[index] = el;
    };

    // Placeholder images (using frames) with rotation, positions, sizes, blurs, and parallax speeds
    // In a real app these would be the actual property thumbnails
    const floatingImages = [
        { src: "/frames/ezgif-frame-001.png", top: "10%", left: "15%", rotate: -15, width: 280, blur: "blur-[2px]", speed: 1.5, opacity: 0.6, delay: 120 },
        { src: "/frames/ezgif-frame-020.png", top: "70%", left: "5%", rotate: -5, width: 320, blur: "blur-[5px]", speed: 2, opacity: 0.4, delay: 350 },
        { src: "/frames/ezgif-frame-040.png", top: "25%", left: "80%", rotate: 20, width: 250, blur: "blur-[3px]", speed: 1, opacity: 0.5, delay: 50 },
        { src: "/frames/ezgif-frame-060.png", top: "65%", left: "85%", rotate: 10, width: 380, blur: "blur-[1px]", speed: 1.8, opacity: 0.7, delay: 420 },
        { src: "/frames/ezgif-frame-080.png", top: "8%", left: "55%", rotate: -8, width: 200, blur: "blur-[4px]", speed: 0.8, opacity: 0.4, delay: 210 },
        { src: "/frames/ezgif-frame-100.png", top: "85%", left: "35%", rotate: 15, width: 300, blur: "blur-[6px]", speed: 1.2, opacity: 0.3, delay: 490 },
        { src: "/frames/ezgif-frame-120.png", top: "45%", left: "10%", rotate: -25, width: 220, blur: "blur-[3px]", speed: 0.9, opacity: 0.5, delay: 80 },
        { src: "/frames/ezgif-frame-140.png", top: "50%", left: "75%", rotate: -10, width: 270, blur: "blur-[4px]", speed: 1.5, opacity: 0.4, delay: 290 },
    ];

    return (
        <section className="relative min-h-[120vh] w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center">

            {/* Very faint abstract lighting */}
            <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] bg-white/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {/* Floating Images Container */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {floatingImages.map((img, idx) => {
                    // Calculate parallax based on mouse
                    const xOffset = mousePos.x * 20 * img.speed;
                    const yOffset = mousePos.y * 20 * img.speed;

                    return (
                        <div
                            key={idx}
                            ref={setRef(idx)}
                            className={`absolute transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform opacity-0 translate-y-24 scale-95 ${img.blur}`}
                            style={{
                                top: img.top,
                                left: img.left,
                                width: `${img.width}px`,
                                // Deterministic delay to prevent hydration mismatches
                                transitionDelay: `${img.delay}ms`
                            }}
                        >
                            <div
                                className="relative w-full aspect-[4/3] rounded-sm shadow-2xl overflow-hidden border border-white/5"
                                style={{
                                    transform: `translate(-50%, -50%) rotate(${img.rotate}deg) translate(${xOffset}px, ${yOffset}px)`,
                                    opacity: img.opacity,
                                    transition: "transform 1s ease-out",
                                }}
                            >
                                {/* Slight dark/multiply overlay on each image to keep them moody */}
                                <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
                                <Image
                                    src={img.src}
                                    alt={`Floating element ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Center Content (COSMOS Style) */}
            <div
                ref={setRef(100)}
                className="relative z-10 flex flex-col items-center justify-center pointer-events-none text-center px-4 transition-all duration-1000 delay-300 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
            >
                <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-medium tracking-tighter text-white mb-6 drop-shadow-2xl">
                    Empreendimentos<sup className="text-2xl md:text-4xl -top-12 md:-top-20 ml-2 font-light"></sup>
                </h2>

                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl mt-4">
                    <span className="text-sm md:text-base font-light text-zinc-300 tracking-wide">
                        Sua coleção exclusiva de
                    </span>
                    <span className="text-sm md:text-base font-medium text-white px-3 py-1 rounded-full border border-white/20 bg-white/5">
                        Lançamentos
                    </span>
                </div>
            </div>

            {/* Scroll Indication */}
            <div
                ref={setRef(101)}
                className="absolute bottom-12 right-12 z-20 flex items-center gap-4 transition-all duration-1000 delay-500 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
            >
                <span className="text-zinc-500 text-sm tracking-widest uppercase mb-1">
                    Role para visualizar
                </span>
                <div className="w-8 h-12 border border-zinc-700/50 rounded-full flex justify-center p-2 mb-2">
                    <div className="w-1 h-3 bg-zinc-400 rounded-full animate-bounce" />
                </div>
            </div>

            {/* Gradient transitions into the next true projects section if needed */}
            <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-[#8A9081]/30 to-transparent pointer-events-none z-10" />

        </section>
    );
}
