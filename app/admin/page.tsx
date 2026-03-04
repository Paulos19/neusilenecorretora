import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminProductForm from "@/components/AdminProductForm";

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
                    <AdminProductForm />
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
