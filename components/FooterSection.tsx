"use client";
import React from "react";
import {
    Mail,
    MapPin,
    Instagram,
    Linkedin,
    Phone
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export default function FooterSection() {
    const footerLinks = [
        {
            title: "Explorar",
            links: [
                { label: "Obras Concluídas", href: "#" },
                { label: "Lançamentos e Conceitos", href: "#" },
                { label: "Lia - Inteligência Artificial", href: "#" },
                { label: "Equipe Executiva", href: "#" },
            ],
        },
        {
            title: "Empresa",
            links: [
                { label: "A Neusilene", href: "#" },
                { label: "Carreiras", href: "#" },
                { label: "Área de Imprensa", href: "#" },
                { label: "Sustentabilidade", href: "#" },
            ],
        },
        {
            title: "Suporte e Contato",
            links: [
                { label: "Portal do Investidor", href: "#" },
                { label: "Painel Administrativo", href: "/admin" },
                {
                    label: "Atendimento no WhatsApp",
                    href: "tel:+11999999999",
                    pulse: true,
                },
            ],
        },
    ];

    const contactInfo = [
        {
            icon: <Mail size={18} className="text-white/60" />,
            text: "lia@neusilene.com",
            href: "mailto:lia@neusilene.com",
        },
        {
            icon: <Phone size={18} className="text-white/60" />,
            text: "+11 99999-9999",
            href: "tel:+11999999999",
        },
        {
            icon: <MapPin size={18} className="text-white/60" />,
            text: "Av. Faria Lima, 3400 - Itaim Bibi, SP",
            href: "#"
        },
    ];

    const socialLinks = [
        { icon: <Instagram size={20} />, label: "Instagram", href: "https://instagram.com/neusilene" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/company/neusilene" },
    ];

    return (
        <footer className="bg-[#0A0A0A] relative min-h-screen flex flex-col justify-between overflow-hidden">

            {/* Top Margin Gradient Divider */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Main Content Container inside Footer */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 z-40 relative flex-grow flex flex-col justify-start">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16">

                    {/* Brand section */}
                    <div className="flex flex-col space-y-6 lg:col-span-2 pr-0 lg:pr-12">
                        <div className="flex items-center space-x-2">
                            <span className="text-white text-3xl md:text-4xl font-light tracking-tighter">Neusilene</span>
                            <span className="text-white/50 text-3xl md:text-4xl font-light">Corretora</span>
                        </div>
                        <p className="text-white/50 text-base leading-relaxed font-light max-w-sm">
                            Esculpindo o amanhã com linhas de prestígio, rigor estrutural e um compromisso inabalável com a arte arquitetônica.
                        </p>
                    </div>

                    {/* Dynamic Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="lg:col-span-1">
                            <h4 className="text-white text-base md:text-lg font-medium mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative w-fit">
                                        <a
                                            href={link.href}
                                            className="text-white/50 hover:text-white transition-colors font-light text-sm md:text-base relative group"
                                        >
                                            {link.label}
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                                        </a>
                                        {link.pulse && (
                                            <span className="absolute top-1/2 -translate-y-1/2 -right-4 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Contact info below columns on smaller, alongside on larger.
            We will make this stand out a bit. */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
                    {contactInfo.map((item, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                {item.icon}
                            </div>
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-white/70 hover:text-white transition-colors text-sm md:text-base font-light"
                                >
                                    {item.text}
                                </a>
                            ) : (
                                <span className="text-white/70 text-sm md:text-base font-light">
                                    {item.text}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* Massive Text hover effect placed at the absolute bottom */}
            <div className="relative w-full h-[40vh] md:h-[50vh] flex items-end justify-center pointer-events-auto z-50 overflow-hidden mt-auto">
                {/* We use negative margins to clip it seamlessly or just let the svg viewBox handle it */}
                <div className="w-full absolute -bottom-10 md:-bottom-20 h-[120%]">
                    <TextHoverEffect text="NEUSILENE" />
                </div>
            </div>

            {/* Bottom Legal / Social Bar Overlaying the Hover Text slightly */}
            <div className="w-full border-t border-white/10 bg-[#000000]/80 backdrop-blur-xl relative z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-white/40 space-y-4 md:space-y-0">
                    <p className="text-center md:text-left">
                        &copy; {new Date().getFullYear()} Neusilene Corretora. Todos os direitos reservados.
                    </p>
                    <div className="flex space-x-6 items-center">
                        {socialLinks.map(({ icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                            >
                                {icon}
                            </a>
                        ))}
                        <span className="w-px h-4 bg-white/20" />
                        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    </div>
                </div>
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}
