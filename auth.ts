import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db";
import authConfig from "./auth.config";
import { User } from "@prisma/client";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user, account, profile }) {
            await fetch("http://localhost:3000/api/user?email=" + user.email, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({emailVerified: new Date()}),
            });
        },
    },
    callbacks: {
        // Todo: implement this
        // async signIn({ user }) {
        //     console.log("Sign in: ", user);
        //     const {
        //         id,
        //         name,
        //         email,
        //         emailVerified,
        //         role,
        //     } = user;

        //     if (!emailVerified) return false;

        //     return true;
        // },
        async session({ session, token }) {
            // console.log("Session: ", token, session);

            if (token.email && token.sub && session.user) {
                session.user.id = token.sub;
                session.user.email = token.email;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const response = await fetch(
                "http://localhost:3000/api/user?email=" + token.email,
                { method: "GET" }
            );
            const user: User = await response.json();
            if (!user) return token;
            token.role = user.role;
            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});
