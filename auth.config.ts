import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";
import { getUserbyEmail } from "./data/user";
import bcrypt from "bcryptjs";
import { z } from "zod";
import axios from "axios";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const authResponse = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });

                if (!authResponse.ok) {
                    return null;
                }

                const user = await authResponse.json();
				console.log("user: ", user);
                return user;
            },
        }),
    ],
} satisfies NextAuthConfig;
