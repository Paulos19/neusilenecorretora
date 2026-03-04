import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans">
            <nav className="w-full bg-[#1A1A1A] text-white py-4 px-6 md:px-12 flex justify-between items-center">
                <Link href="/admin" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                    <Image src="/logo.png" alt="Neusilene Logo" width={100} height={40} className="object-contain" />
                    <span className="text-xs tracking-widest uppercase font-medium border-l border-white/20 pl-4">Dashboard Admin</span>
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Ver Site</Link>
                </div>
            </nav>
            {children}
        </div>
    );
}
