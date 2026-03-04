import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Credenciais inválidas");
                }

                const adminEmail = process.env.EMAIL_ADMIN;

                if (!adminEmail) {
                    console.error("EMAIL_ADMIN is not set in environment variables");
                    throw new Error("Erro de configuração do servidor");
                }

                if (credentials.email !== adminEmail) {
                    throw new Error("Acesso não autorizado");
                }

                let user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    // Auto-register the admin on first login attempt if they use the correct email
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    user = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword,
                        },
                    });
                } else {
                    // Verify existing admin password
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Senha incorreta");
                    }
                }

                return {
                    id: user.id,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).id = token.id;
                (session.user as any).email = token.email;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET || "default_super_secret_for_development",
});

export { handler as GET, handler as POST };
