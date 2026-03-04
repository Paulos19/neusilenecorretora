"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hero section scroll progress logic
            const maxScroll = window.innerHeight * 2.5;
            const progress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
            setScrollProgress(progress);

            // Header visibility logic (Hide on scroll down, show on scroll up)
            // Buffer of 50px to prevent jitter
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up
                setIsVisible(true);
            }

            // Always show at the very top
            if (currentScrollY < 50) {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initialize
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isMenuOpen]);

    // initial state progress=0 means it's sitting around 35vh down to be visually centered
    const translateY = (1 - scrollProgress) * 35; // in vh
    const scale = 0.4 + (1 - scrollProgress) * 0.6; // starts at 1x (600px wide), ends at 0.4x (240px wide)

    // Opacity of nav links
    const navOpacity = Math.max(0, (scrollProgress - 0.5) * 2);

    // Glassmorphism triggers near the end of the scroll animation
    const isScrolled = scrollProgress > 0.8;

    return (
        <>
            <header className={`fixed top-0 left-0 w-full h-24 z-50 flex items-center pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}>
                <div className="relative w-full max-w-7xl mx-auto px-6 flex justify-between items-center h-full">

                    {/* Left Navlinks (Desktop only) */}
                    <nav
                        className={`hidden md:flex items-center gap-8 pointer-events-auto px-8 py-3 rounded-full transition-all duration-700 ease-in-out ${isScrolled ? "bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-transparent border border-transparent"
                            }`}
                        style={{
                            opacity: navOpacity,
                            transform: `translateX(${(1 - scrollProgress) * 60}px)`,
                            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
                        }}
                    >
                        <Link href="#sobre" className="relative group text-sm font-medium tracking-[0.2em] uppercase text-white transition-colors">
                            Sobre Nós
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#empreendimentos" className="relative group text-sm font-medium tracking-[0.2em] uppercase text-white transition-colors">
                            Empreendimentos
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* Center Logo */}
                    <div
                        className="absolute left-1/2 pointer-events-auto flex justify-center items-center"
                        style={{
                            transform: `translate(-50%, ${translateY}vh) scale(${scale})`,
                            willChange: 'transform',
                        }}
                    >
                        <Link href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <Image
                                src="/logo.png"
                                alt="Neusilene Logo"
                                width={600}
                                height={300}
                                priority
                                quality={100}
                                unoptimized
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Right Navlinks (Desktop only) */}
                    <nav
                        className={`hidden md:flex items-center gap-8 pointer-events-auto px-8 py-3 rounded-full transition-all duration-700 ease-in-out ${isScrolled ? "bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl" : "bg-transparent border border-transparent"
                            }`}
                        style={{
                            opacity: navOpacity,
                            transform: `translateX(${(1 - scrollProgress) * -60}px)`,
                            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
                        }}
                    >
                        <Link href="#contato" className="relative group text-sm font-medium tracking-[0.2em] uppercase text-white transition-colors">
                            Contato
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#cliente" className="relative group text-sm font-medium tracking-[0.2em] uppercase text-white transition-colors">
                            Área do Cliente
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <div
                        className="md:hidden absolute right-6 pointer-events-auto flex items-center justify-center"
                        style={{
                            opacity: navOpacity,
                            transform: `translateY(${(1 - scrollProgress) * -20}px)`,
                            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
                        }}
                    >
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="text-white p-2 focus:outline-none group flex flex-col items-end gap-1.5"
                            aria-label="Abrir menu"
                        >
                            <span className="w-7 h-[2px] bg-white transition-all duration-300 group-hover:w-5"></span>
                            <span className="w-5 h-[2px] bg-white transition-all duration-300 group-hover:w-7"></span>
                            <span className="w-7 h-[2px] bg-white transition-all duration-300 group-hover:w-6"></span>
                        </button>
                    </div>

                </div>
            </header>

            {/* Fullscreen Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-8 right-6 text-white p-4 focus:outline-none group"
                    aria-label="Fechar menu"
                >
                    <div className="relative w-8 h-8">
                        <span className="absolute top-1/2 left-0 w-8 h-[2px] bg-white rotate-45 transition-transform duration-300 group-hover:rotate-180 text-transparent"></span>
                        <span className="absolute top-1/2 left-0 w-8 h-[2px] bg-white -rotate-45 transition-transform duration-300 group-hover:-rotate-180 text-transparent"></span>
                    </div>
                </button>

                <nav className="flex flex-col items-center gap-10">
                    <Link href="#sobre" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-zinc-400 transition-colors">
                        Sobre Nós
                    </Link>
                    <Link href="#empreendimentos" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-zinc-400 transition-colors">
                        Empreendimentos
                    </Link>
                    <Link href="#contato" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-zinc-400 transition-colors">
                        Contato
                    </Link>
                    <Link href="#cliente" onClick={() => setIsMenuOpen(false)} className="text-2xl font-light tracking-[0.2em] uppercase text-white hover:text-zinc-400 transition-colors">
                        Área do Cliente
                    </Link>
                </nav>

                <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50">
                    <Image
                        src="/logo.png"
                        alt="Neusilene Logo"
                        width={120}
                        height={60}
                        className="object-contain"
                    />
                    <span className="text-xs tracking-widest uppercase">Creci: 77668</span>
                </div>
            </div>
        </>
    );
}
