import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Preencha todos os campos obrigatórios." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            secure: process.env.EMAIL_SERVER_SECURE === "true",
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        // 1. E-mail de Auto-Resposta para o Cliente (Lia enviando)
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Recebemos sua mensagem! | Neusilene Obras",
            html: `
                <div style="font-family: sans-serif; color: #1A1A1A; max-w-xl mx-auto line-height: 1.6;">
                    <h2>Olá, ${name}!</h2>
                    <p>Meu nome é <strong>Lia</strong>, sua secretária I.A e assistente da equipe Neusilene.</p>
                    <p>Este é apenas um e-mail para confirmar que acabei de registrar a sua mensagem em nosso sistema. Nossa equipe executiva irá avaliar a sua solicitação e em breve um de nossos diretores entrará em contato para agendarmos uma conversa detalhada sobre o seu projeto.</p>
                    <p>Enquanto isso, fique à vontade para explorar nossas redes sociais e ver nossas obras mais recentes.</p>
                    <br/>
                    <p>Atenciosamente,</p>
                    <p><strong>Lia</strong><br/>Assistente de Relacionamento Neusilene<br/>Av. Faria Lima, 3400 - São Paulo</p>
                </div>
            `,
        });

        // 2. E-mail para a Administração (Nova Lead Registrada)
        const adminEmail = process.env.EMAIL_ADMIN || process.env.EMAIL_SERVER_USER;
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: adminEmail,
            subject: `🚨 Novo Contato pelo Site: ${name}`,
            html: `
                <div style="font-family: sans-serif; color: #1A1A1A; max-w-xl mx-auto line-height: 1.6;">
                    <h2>Novo Contato via Landing Page</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail de Retorno:</strong> ${email}</p>
                    <hr/>
                    <p><strong>Mensagem:</strong></p>
                    <blockquote style="background: #f5f5f5; padding: 15px; border-left: 4px solid #333;">
                        ${message}
                    </blockquote>
                    <p><em>*A Lia já enviou o e-mail automático de recebimento para este cliente.</em></p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Nodemailer Submission Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
