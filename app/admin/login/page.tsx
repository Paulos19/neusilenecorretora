"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setLoading(false);

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E5E5E5] text-[#1A1A1A] p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center">
                <Image src="/logo.png" alt="Logo" width={200} height={100} className="mb-8 filter invert" />
                <h1 className="text-2xl font-light tracking-widest uppercase mb-8 text-center">Admin Acesso</h1>

                {error && (
                    <div className="w-full bg-red-100 text-red-600 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-widest uppercase font-medium text-[#1A1A1A]/60">Email Pessoal</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-100 rounded-lg outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 transition-all font-light"
                            placeholder="Digite seu email"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-widest uppercase font-medium text-[#1A1A1A]/60">Senha</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-100 rounded-lg outline-none focus:ring-2 focus:ring-[#1A1A1A]/20 transition-all font-light"
                            placeholder="Sua senha secreta"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1A1A1A] text-white py-4 rounded-lg font-medium tracking-widest uppercase text-sm mt-4 hover:bg-black transition-colors disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Acessar Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
}
