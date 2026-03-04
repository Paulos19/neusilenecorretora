"use client";

import * as React from 'react';
import { MasonryGrid } from '@/components/ui/image-testimonial-grid';

// --- Data for the cards adapted for Neusilene ---
const testimonials = [
    {
        profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
        name: 'Ana Lúcia Ferreira',
        feedback: 'Um nível de perfeccionismo raro na arquitetura.',
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=1200&q=80', // interior
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: 'Carlos Drummond',
        feedback: 'A integração da luz natural mudou nossa rotina.',
        mainImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=900&q=80', // bright living room
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
        name: 'Helena Machado',
        feedback: 'Elegância atemporal. Entrega impecável do projeto.',
        mainImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&h=1000&q=80', // modern facade
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/men/78.jpg',
        name: 'Roberto Assis',
        feedback: 'Visão monumental, execução cirúrgica. Excelente.',
        mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80', // luxury home
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
        name: 'Isabella Mendes',
        feedback: 'Meu refúgio particular no centro de São Paulo.',
        mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4ea0d?auto=format&fit=crop&w=900&q=80', // cozy luxury interior
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/men/56.jpg',
        name: 'Fernando Costa',
        feedback: 'Atenção a cada milímetro do espaço.',
        mainImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&h=1200&q=80', // architectural detail
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/men/21.jpg',
        name: 'Ricardo Nogueira',
        feedback: 'Sofisticação e tecnologia na fachada brutalista.',
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80', // brutalist mansion
    },
    {
        profileImage: 'https://randomuser.me/api/portraits/women/88.jpg',
        name: 'Mariana Silva',
        feedback: 'Resplandecente. O design autoral brilha aqui.',
        mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80', // kitchen design
    },
];

// --- Reusable Card Component ---
const TestimonialCard = ({ profileImage, name, feedback, mainImage }: (typeof testimonials)[0]) => (
    <div className="relative rounded-2xl overflow-hidden group transition-transform duration-500 ease-in-out hover:scale-[1.03] cursor-pointer shadow-xl">
        <img
            src={mainImage}
            alt={feedback}
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/800x600/1a1a1a/ffffff?text=Neusilene';
            }}
        />
        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/60 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        <div className="absolute top-0 left-0 p-5 md:p-6 w-full h-full flex flex-col justify-between text-white">
            <div>
                <div className="flex items-center gap-4 mb-3">
                    <img
                        src={profileImage}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/40 shadow-lg object-cover"
                        alt={name}
                        onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/40x40/EFEFEF/333333?text=A';
                        }}
                    />
                    <span className="font-medium text-sm md:text-base tracking-wide text-white/90 drop-shadow-md">{name}</span>
                </div>
            </div>
            <p className="text-base md:text-lg lg:text-xl font-light leading-snug drop-shadow-lg max-w-[90%]">"{feedback}"</p>
        </div>
    </div>
);

// --- Section Component ---
export default function TestimonialsSection() {
    const [columns, setColumns] = React.useState(4);

    // Function to determine columns based on screen width
    const getColumns = (width: number) => {
        if (width < 640) return 1;    // sm
        if (width < 1024) return 2;   // lg
        if (width < 1280) return 3;   // xl
        return 4;                     // 2xl and up
    };

    React.useEffect(() => {
        const handleResize = () => {
            setColumns(getColumns(window.innerWidth));
        };

        handleResize(); // Set initial columns on mount

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="w-full min-h-screen py-24 md:py-32 bg-[#F3EFE9] text-[#1A1A1A] border-t border-[#1A1A1A]/10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col items-center justify-center mb-16 md:mb-24 text-center">
                    <span className="uppercase tracking-[0.2em] text-xs font-semibold text-black/50 mb-4">Reconhecimento</span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
                        Vozes da Neusilene
                    </h2>
                    <p className="text-base md:text-lg max-w-2xl text-black/60 font-medium">
                        O impacto dos nossos projetos através dos olhos e vivências de nossos clientes ao redor do mundo.
                    </p>
                </div>

                <MasonryGrid columns={columns} gap={6}>
                    {testimonials.map((card, index) => (
                        <TestimonialCard key={index} {...card} />
                    ))}
                </MasonryGrid>
            </div>
        </section>
    );
}
