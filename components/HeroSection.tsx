"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

    // Track scroll request to avoid multiple repaints in one frame
    const requestRef = useRef<number>(0);
    const currentFrameRef = useRef<number>(-1);

    const [overlayOpacity, setOverlayOpacity] = useState(1);

    // Preload images for smooth animation
    useEffect(() => {
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const indexStr = String(i).padStart(3, "0");
            img.src = `/frames/ezgif-frame-${indexStr}.png`;
            imagesRef.current[i - 1] = img;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha channel needed
        if (!context) return;

        const renderFrame = (frameIndex: number) => {
            if (frameIndex < 0 || frameIndex >= TOTAL_FRAMES) return;

            const img = imagesRef.current[frameIndex];
            if (!img || !img.complete) return; // If image not loaded, skip frame

            // Prevent redundant drawing
            if (currentFrameRef.current === frameIndex) return;

            // Draw covering entire canvas maintaining cinematic aspect ratio
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let x = 0;
            let y = 0;

            if (imgRatio > canvasRatio) {
                drawWidth = canvas.height * imgRatio;
                x = (canvas.width - drawWidth) / 2;
            } else {
                drawHeight = canvas.width / imgRatio;
                y = (canvas.height - drawHeight) / 2;
            }

            context.fillRect(0, 0, canvas.width, canvas.height); // Clear with solid black instead of clearRect
            context.drawImage(img, x, y, drawWidth, drawHeight);

            currentFrameRef.current = frameIndex;
        };

        const handleResize = () => {
            // Use devicePixelRatio for sharp rendering on retina displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            context.scale(dpr, dpr);
            context.fillStyle = "black";

            // Force repaint on resize
            const frameToDraw = Math.max(0, currentFrameRef.current);
            currentFrameRef.current = -1;
            renderFrame(frameToDraw);
        };

        // Initialize dimensions
        handleResize();
        window.addEventListener("resize", handleResize);

        // Initial render attempt. Wait for first image.
        const initialImg = imagesRef.current[0];
        if (initialImg) {
            initialImg.onload = () => {
                handleResize(); // Draw first frame once loaded
            };
            if (initialImg.complete) {
                handleResize();
            }
        }

        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerTop = containerRef.current.offsetTop;
            const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
            const scrollY = window.scrollY;

            // Calculate scroll progress relative to this section
            let progress = (scrollY - containerTop) / containerHeight;
            progress = Math.max(0, Math.min(1, progress));

            // Calculate the current frame from progress
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.floor(progress * TOTAL_FRAMES)
            );

            // Fade out the dark overlay as we scroll so the frames get more visibility
            // after the logo moves up.
            let opacity = 1;
            if (progress < 0.5) {
                opacity = 1 - progress * 2; // Goes from 1 to 0 halfway through the scroll
            } else {
                opacity = 0;
            }

            setOverlayOpacity(Math.max(0, Math.min(1, opacity)));

            // Render the frame via requestAnimationFrame
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }

            requestRef.current = requestAnimationFrame(() => renderFrame(frameIndex));
        };

        // Use passive listener for better scroll performance
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Trigger an initial fake scroll to set initial state correctly
        handleScroll();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black h-[350vh]"
        >
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
                {/* The canvas that renders the sequence */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark gradient overlay that fades out to reveal the frames clearly */}
                <div
                    className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10 pointer-events-none backdrop-blur-[8px]"
                    style={{
                        opacity: overlayOpacity,
                        transition: 'opacity 0.1s ease-out'
                    }}
                />
            </div>
        </section>
    );
}
