"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Check,
    Copy,
    LucideIcon,
    Mail,
    MapPin,
    Phone,
    InstagramIcon,
    LinkedinIcon
} from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';

const APP_EMAIL = 'mail@example.com';
const APP_PHONE = '+11 99999-9999';

export function ContactPage() {
    const socialLinks = [
        {
            icon: InstagramIcon,
            href: 'https://instagram.com/neusilene',
            label: 'Instagram',
        },
        {
            icon: LinkedinIcon,
            href: 'https://linkedin.com/company/neusilene',
            label: 'LinkedIn',
        }
    ];

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-[#1A1A1A] text-white py-24 border-t border-white/10 relative overflow-hidden">
            <div className="mx-auto h-full max-w-7xl lg:border-x lg:border-white/10 relative z-10">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate -z-10 opacity-40 contain-strict pointer-events-none"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.01)_50%,transparent_80%)] absolute top-0 left-0 h-[800px] w-[350px] -translate-y-87.5 -rotate-45 rounded-full" />
                </div>

                <div className="flex grow flex-col justify-center px-6 md:px-12 pt-16 pb-16">
                    <span className="uppercase tracking-[0.2em] text-xs font-semibold text-white/50 mb-4 block">Exclusividade e Atendimento</span>
                    <h1 className="text-4xl font-bold md:text-6xl tracking-tighter mb-4">
                        Vamos conversar?
                    </h1>
                    <p className="text-white/60 mb-5 text-lg font-light max-w-xl">
                        Entre em contato com nossa equipe para alinhar sua visão arquitetônica. Fale diretamente com a Lia ou envie um e-mail.
                    </p>
                </div>

                <BorderSeparator />

                <div className="grid lg:grid-cols-2">

                    {/* Left Interface: Contact Information */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-1 lg:border-r lg:border-white/10">
                        <Box
                            icon={Mail}
                            title="Lia (Secretária I.A)"
                            description="Retornaremos com todas as informações via e-mail."
                            className="border-b border-white/10 md:border-r md:border-white/10 lg:border-r-0"
                        >
                            <a
                                href={`mailto:${APP_EMAIL}`}
                                className="font-mono text-base font-medium tracking-wide hover:underline text-white/90"
                            >
                                lia@neusilene.com
                            </a>
                            <CopyButton className="size-6 text-white hover:bg-white/10" test="lia@neusilene.com" />
                        </Box>

                        <Box
                            icon={Phone}
                            title="WhatsApp"
                            description="Atendimento executivo de Seg a Sex, 9h-18h."
                            className="border-b border-white/10"
                        >
                            <div className="flex items-center gap-x-2">
                                <a
                                    href={`tel:${APP_PHONE}`}
                                    className="block font-sans text-base font-medium tracking-wide hover:underline text-white/90"
                                >
                                    {APP_PHONE}
                                </a>
                                <CopyButton className="size-6 text-white hover:bg-white/10" test={APP_PHONE} />
                            </div>
                        </Box>

                        <Box
                            icon={MapPin}
                            title="Escritório Matriz"
                            description="Agende uma visita exclusiva."
                            className="border-b border-white/10 md:border-r md:border-white/10 lg:border-r-0 lg:border-b-0"
                        >
                            <span className="font-sans text-sm font-light tracking-wide text-white/80">
                                Av. Faria Lima, 3400 - Itaim Bibi <br /> São Paulo, SP
                            </span>
                        </Box>
                    </div>

                    {/* Right Interface: Contact Form */}
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-8">Envie uma mensagem</h3>
                        {success ? (
                            <div className="bg-emerald-950/30 border border-emerald-500/20 p-6 rounded-xl flex items-center justify-center flex-col text-center">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                                    <Check className="text-emerald-400 w-6 h-6" />
                                </div>
                                <p className="text-emerald-100/90 font-medium">A Lia acaba de receber sua mensagem!</p>
                                <p className="text-emerald-100/60 text-sm mt-2">Um e-mail de confirmação foi enviado para você.</p>
                                <Button variant="outline" className="mt-6 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50" onClick={() => setSuccess(false)}>Enviar nova mensagem</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70">Nome completo</label>
                                        <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="João Silva" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70">E-mail</label>
                                        <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors" placeholder="joao@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70">Como a Lia pode ajudar?</label>
                                    <textarea required name="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Conte-nos sobre o seu projeto..." />
                                </div>
                                <Button type="submit" disabled={loading} className="w-full lg:w-auto bg-white text-black hover:bg-zinc-200 px-8 py-6 text-base rounded-lg mt-2">
                                    {loading ? "Enviando para a Lia..." : "Enviar Mensagem"}
                                </Button>
                            </form>
                        )}
                    </div>

                </div>

                <BorderSeparator />

                {/* Social Links Footer Portion */}
                <div className="relative flex h-full py-16 items-center justify-center">
                    <div className="relative z-1 space-y-6 text-center">
                        <span className="text-white/50 uppercase tracking-widest text-xs font-semibold">Siga-nos</span>
                        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/5 hover:bg-white/10 flex items-center gap-x-3 rounded-full border border-white/10 px-6 py-3 transition-colors text-white/80 hover:text-white"
                                >
                                    <link.icon className="size-4" />
                                    <span className="font-sans text-sm font-medium tracking-wide">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BorderSeparator() {
    return <div className="absolute inset-x-0 h-px w-full border-b border-white/10" />;
}

type ContactBox = React.ComponentProps<'div'> & {
    icon: LucideIcon;
    title: string;
    description: string;
};

function Box({
    title,
    description,
    className,
    children,
    ...props
}: ContactBox) {
    return (
        <div
            className={cn(
                'flex flex-col justify-between',
                className,
            )}
        >
            <div className="bg-white/5 flex items-center gap-x-3 border-b border-white/10 p-5 md:p-6">
                <props.icon className="text-white/60 size-5" strokeWidth={1.5} />
                <h2 className="font-sans text-lg font-medium tracking-wider text-white">
                    {title}
                </h2>
            </div>
            <div className="flex items-center gap-x-2 p-5 md:p-6 py-10 md:py-14">{children}</div>
            <div className="border-t border-white/10 p-5 md:p-6 bg-black/20">
                <p className="text-white/50 text-sm font-light">{description}</p>
            </div>
        </div>
    );
}

type CopyButtonProps = ButtonProps & {
    test: string;
};

function CopyButton({
    className,
    variant = 'ghost',
    size = 'icon',
    test,
    ...props
}: CopyButtonProps) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(test);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn('disabled:opacity-100', className)}
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            disabled={copied || props.disabled}
            {...props}
        >
            <div
                className={cn(
                    'transition-all',
                    copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                )}
            >
                <Check className="size-4 stroke-emerald-500" aria-hidden="true" />
            </div>
            <div
                className={cn(
                    'absolute transition-all',
                    copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                )}
            >
                <Copy aria-hidden="true" className="size-4" />
            </div>
        </Button>
    );
}
