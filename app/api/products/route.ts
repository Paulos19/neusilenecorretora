import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { put } from "@vercel/blob";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });
        }

        const formData = await request.formData();

        const title = formData.get("title") as string | null;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const isHighlight = formData.get("isHighlight") === "on";
        const image = formData.get("image") as File;

        if (!description || !price || !image) {
            return NextResponse.json({ error: "Preencha todos os campos obrigatórios" }, { status: 400 });
        }

        // Upload to Vercel Blob
        const blob = await put(image.name, image, {
            access: 'public',
        });

        // Save to database
        const product = await prisma.product.create({
            data: {
                title,
                description,
                price,
                imageUrl: blob.url,
                isHighlight,
            },
        });

        // Redirect back to admin dashboard after successful creation
        return NextResponse.redirect(new URL("/admin", request.url));
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}
