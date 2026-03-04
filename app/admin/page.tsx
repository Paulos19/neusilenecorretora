import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
    const session = await getServerSession();

    if (!session?.user) {
        redirect("/admin/login");
    }

    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 text-[#1A1A1A]">
            <header className="mb-16">
                <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase">Gerenciamento de Produtos</h1>
                <p className="mt-4 text-xs md:text-sm tracking-widest uppercase font-medium text-[#1A1A1A]/60">
                    Olá, {session.user.email}. Adicione ou visualize os projetos e empreendimentos.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
                {/* Upload Form */}
                <div className="lg:col-span-5 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
                    <h2 className="text-2xl font-medium tracking-tighter uppercase mb-8">Novo Empreendimento</h2>
                    <form action="/api/products" method="POST" encType="multipart/form-data" className="flex flex-col gap-6">
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

                        <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 rounded-lg font-medium tracking-widest uppercase text-sm mt-4 hover:bg-black transition-colors">
                            Adicionar ao Portfólio
                        </button>
                    </form>
                </div>

                {/* Product List */}
                <div className="lg:col-span-7">
                    <h2 className="text-2xl font-medium tracking-tighter uppercase mb-8">Portfólio Recente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {products.length === 0 ? (
                            <p className="text-sm text-[#1A1A1A]/60 col-span-2">Nenhum produto cadastrado ainda.</p>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg flex flex-col group">
                                    <div className="relative w-full aspect-[4/3] bg-zinc-200">
                                        <img src={product.imageUrl} alt={product.title || "Produto"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        {product.isHighlight && (
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest">
                                                Destaque
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col gap-2 flex-grow">
                                        <h3 className="text-xl font-medium truncate">{product.title || "Sem Título"}</h3>
                                        <p className="text-sm font-light text-[#1A1A1A]/80 line-clamp-2">{product.description}</p>
                                        <p className="mt-auto pt-4 text-xs tracking-widest font-semibold uppercase">{product.price}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
