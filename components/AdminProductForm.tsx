"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                form.reset();
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || "Erro ao salvar a obra");
            }
        } catch (error) {
            console.error("Erro no envio:", error);
            alert("Erro interno de conexão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/60">Nome (Opcional)</label>
                <input type="text" name="title" className="w-full px-4 py-3 bg-zinc-100 rounded-lg outline-none focus:ring-2 font-light" placeholder="Ex: Residencial Vista" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/60">Descrição Detalhada *</label>
                <textarea name="description" required rows={4} className="w-full px-4 py-3 bg-zinc-100 rounded-lg outline-none focus:ring-2 font-light resize-none" placeholder="Descrição poética e detalhada do imóvel..."></textarea>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/60">Preço / Condição *</label>
                <input type="text" name="price" required className="w-full px-4 py-3 bg-zinc-100 rounded-lg outline-none focus:ring-2 font-light" placeholder="Ex: A partir de R$ 1.500.000,00" />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest font-medium text-[#1A1A1A]/60">Foto do Empreendimento *</label>
                <input type="file" name="image" required accept="image/*" className="w-full text-sm text-[#1A1A1A]/60 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1A1A1A] file:text-white hover:file:bg-black transition-all cursor-pointer bg-zinc-100 rounded-lg" />
            </div>

            <div className="flex items-center gap-3 mt-2">
                <input type="checkbox" name="isHighlight" id="isHighlight" className="w-5 h-5 accent-[#1A1A1A] cursor-pointer" />
                <label htmlFor="isHighlight" className="text-sm tracking-widest uppercase font-medium text-[#1A1A1A]/80 cursor-pointer">Definir como Destaque (Sessão Principal)</label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#1A1A1A] text-white py-4 rounded-lg font-medium tracking-widest uppercase text-sm mt-4 hover:bg-black transition-colors disabled:opacity-50">
                {loading ? "Enviando para o Banco..." : "Adicionar ao Portfólio"}
            </button>
        </form>
    );
}
