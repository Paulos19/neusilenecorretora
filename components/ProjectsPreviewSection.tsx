"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
    { id: "001", title: "Residencial Vista", category: "Lançamento", year: "2024", image: "/projects/1.jpg" },
    { id: "002", title: "Jardins do Éden", category: "Em Construção", year: "2025", image: "/projects/2.jpg" },
    { id: "003", title: "Torre Lumina", category: "Pronto para Morar", year: "2023", image: "/projects/3.jpg" },
    { id: "004", title: "Villa Serena", category: "Breve Lançamento", year: "2026", image: "/projects/4.jpg" },
];

export default function ProjectsPreviewSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // We only need one ref to track entrance for the dancing items if we want, 
    // but the horizontal translation will handle movement.
    const [isTitleVisible, setIsTitleVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Intersection Observer for Title and Text entrances
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.15,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement;

                if (el === titleRef.current) {
                    setIsTitleVisible(entry.isIntersecting);
                    return;
                }

                if (entry.isIntersecting) {
                    el.classList.remove("opacity-0", "translate-y-24", "scale-95");
                    el.classList.add("opacity-100", "translate-y-0", "scale-100");
                } else {
                    el.classList.remove("opacity-100", "translate-y-0", "scale-100");
                    el.classList.add("opacity-0", "translate-y-24", "scale-95");
                }
            });
        }, observerOptions);

        if (titleRef.current) observer.observe(titleRef.current);
        if (textRef.current) observer.observe(textRef.current);

        return () => observer.disconnect();
    }, []);

    // Scroll listener for the horizontal scroll-dive effect
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const { top, height } = rect;
            const windowHeight = window.innerHeight;

            // Start scrolling when the top of the section hits the top of the viewport
            // Finish scrolling when the bottom of the section hits the bottom of the viewport
            const scrollableDistance = height - windowHeight;

            // Calculate progress (0 to 1)
            let progress = -top / scrollableDistance;

            // Clamp between 0 and 1
            progress = Math.max(0, Math.min(1, progress));

            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const renderCinematicText = (text: string, rowIdx: number) => {
        return text.split("").map((char, i) => {
            const distFromCenter = i - text.length / 2;
            const xOffset = -distFromCenter * 3;
            const yOffset = rowIdx === 0 ? 15 : -15;
            const initialRotation = distFromCenter * 15;

            return (
                <span
                    key={i}
                    className={`inline-block transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter] ${isTitleVisible
                        ? "opacity-100 blur-0"
                        : "opacity-0 blur-2xl"
                        }`}
                    style={{
                        transform: isTitleVisible
                            ? "translate(0, 0) scale(1) rotate(0deg)"
                            : `translate(${xOffset}vw, ${yOffset}vh) scale(0) rotate(${initialRotation}deg)`,
                        transitionDelay: `${Math.abs(distFromCenter) * 40 + (rowIdx * 100)}ms`
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            );
        });
    };

    // Calculate maximum horizontal translation based on number of items and device width
    // We want the last item to be fully visible at progress = 1
    // This is a CSS transform percentage mapping
    const transformX = `translateX(-${scrollProgress * 80}vw)`;

    return (
        // The section itself is very tall to allow for scrolling
        <section
            ref={sectionRef}
            id="projetos"
            className="w-full bg-[#E5E5E5] text-[#1A1A1A] relative h-[400vh]"
        >
            {/* The sticky container that holds the visible content */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center">

                {/* Horizontal Scroll Track - transformed based on scroll progress */}
                <div className="w-full relative flex items-center z-10">
                    <div
                        className="flex gap-16 md:gap-32 px-6 md:px-12 will-change-transform ease-out transition-transform duration-300"
                        style={{ transform: transformX }}
                    >
                        {/* Title and Description - Now inline with the scroll track as the first item */}
                        <div className="shrink-0 w-[90vw] md:w-[75vw] lg:w-[65vw] flex flex-col justify-center gap-12 lg:gap-16 pt-0 md:pt-16">
                            {/* Animated Title */}
                            <div className="w-full perspective-1000">
                                <h2
                                    ref={titleRef}
                                    className="text-[17vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.8] tracking-tighter font-medium uppercase flex flex-col items-start scale-y-110 origin-top text-[#1A1A1A]"
                                >
                                    <div className="block overflow-visible pb-2">{renderCinematicText("Imóveis &", 0)}</div>
                                    <div className="block overflow-visible pb-2">{renderCinematicText("Exclusividade", 1)}</div>
                                </h2>
                            </div>

                            {/* Subtitle / Description */}
                            <div
                                ref={textRef}
                                className="w-full md:w-2/3 flex flex-col gap-3 transition-all duration-1000 delay-200 ease-out opacity-0 translate-y-24 scale-95 will-change-transform"
                            >
                                <p className="text-xs tracking-widest uppercase font-medium text-[#1A1A1A]/60">
                                    Projetados para inspirar<br />
                                    Construídos para conectar
                                </p>
                                <p className="text-base md:text-lg font-light leading-relaxed">
                                    Uma curadoria de alto padrão buscando a fusão perfeita entre conforto, design sofisticado e localizações privilegiadas.
                                </p>
                            </div>
                        </div>

                        {/* Projects Cards */}
                        {projects.map((project, idx) => (
                            <div
                                key={project.id}
                                // Dancing rhythm based on index remaining intact
                                className={`shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] xl:w-[25vw] group relative flex flex-col ${idx % 2 !== 0 ? 'mt-0 md:mt-24' : 'mt-12 md:mt-0'
                                    }`}
                            >
                                {/* Number Indicator */}
                                <div className="absolute -top-12 md:-top-16 right-0 text-4xl md:text-6xl tracking-widest font-thin text-[#1A1A1A]/20 transition-transform duration-700 group-hover:-translate-y-4">
                                    {project.id}
                                </div>

                                {/* Image Container */}
                                <div className="relative w-full aspect-[4/5] bg-zinc-300 rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-8 transition-all duration-700 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-4">
                                    <div className="absolute inset-0 bg-[#1A1A1A]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1"
                                        sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 25vw"
                                    />
                                </div>

                                {/* Bottom Info Bar */}
                                <div className="flex justify-between items-center border-b border-[#1A1A1A]/20 pb-4 transition-all duration-700 group-hover:border-[#1A1A1A]/50">
                                    <span className="text-sm tracking-widest uppercase font-medium text-[#1A1A1A]/80">
                                        {project.category} - {project.title}
                                    </span>
                                    <span className="text-xs tracking-widest font-medium text-[#1A1A1A]/60">
                                        {project.year}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Indicator Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1A1A1A]/10">
                    <div
                        className="h-full bg-[#1A1A1A] transition-all duration-100 ease-out"
                        style={{ width: `${scrollProgress * 100}%` }}
                    />
                </div>
            </div>
        </section>
    );
}
