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

    return (
        <section ref={sectionRef} className={`w-full py-24 md:py-32 px-6 lg:px-12 bg-[#FDFBF7] text-[#1A1A1A] overflow-hidden ${reverseLayout ? "bg-[#F5F5F5]" : ""}`}>
            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                {/* Section Header */}
                <div className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>
                    <h2 className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-tighter uppercase">{title}</h2>
                    <div className="w-full h-[1px] bg-[#1A1A1A]/20 mt-8"></div>
                </div>

                {/* Dynamic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className={`group flex flex-col transition-all duration-1000 ease-out will-change-transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-200 shadow-xl group-hover:shadow-2xl transition-shadow duration-700">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title || "Produto"}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                                />

                                {/* Details overlay appearing on hover */}
                                <div className="absolute inset-0 bg-[#1A1A1A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-medium tracking-tighter uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                                        {product.title || "Lançamento"}
                                    </h3>
                                    <p className="text-sm tracking-widest uppercase font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150">
                                        {product.price}
                                    </p>
                                </div>
                            </div>

                            {/* Text under grid item */}
                            <div className="mt-6 flex flex-col gap-2">
                                <h4 className="text-xl font-medium tracking-tighter uppercase line-clamp-1">{product.title}</h4>
                                <p className="text-sm font-light text-[#1A1A1A]/70 line-clamp-2 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
