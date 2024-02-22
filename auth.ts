import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db";
import authConfig from "./auth.config";
import { User } from "@prisma/client";
import axios from "axios";

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
        async signIn({ user, account }) {
            console.log("Sign in: ", user);
            //console.log("Account: ", account);
            if (account?.provider !== "credentials") return true;

            const {
                id,
                name,
                email,
                emailVerified,
                twoFactorEnabled,
                role,
            } = user;

            // console.log("User: ", id, name, email, emailVerified, twoFactorEnabled, role);

            if (!emailVerified) return false;
            if (twoFactorEnabled) {
                try{
                    const twoFactorConfirmationRes = await axios.get(`${process.env.REACT_APP_URL}/api/twoFactor/confirmation?userId=${id}`);
                    console.log("twoFactorConfirmationRes: ", twoFactorConfirmationRes.data);
                    const userId = twoFactorConfirmationRes.data.userId;
                    if (userId != id) {
                        return false;
                    }
                    await axios.delete(`${process.env.REACT_APP_URL}/api/twoFactor/confirmation?userId=${id}`);
                } catch (error: any) {
                    console.error("twoFactorConfirmationError: ", error.response?.data?.message);
                    return false;
                }                
            }

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
            }

            console.log("Session Inside: ", session);
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const response = await fetch(
                `${process.env.REACT_APP_URL}/api/user?email=` + token.email,
                { method: "GET" }
            );
            const user: User = await response.json();
            if (!user) return token;

            token.role = user.role;
            token.isTwoFactorEnabled = user.twoFactorEnabled;

            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
});
