"use server"
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import z from "zod"
import { redirect, useRouter } from "next/navigation";
import { User, VerificationToken } from "@prisma/client";

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validate = loginSchema.safeParse(values);

    if (!validate.success) {
        return {
            error: "Invalid Request Body",
        }
    }

    const fetchUser = await fetch("http://localhost:3000/api/user?email=" + values.email, {
        method: "GET"
    });

    if (!fetchUser.ok) {
        return {
            error: "Unable to fetch user",
        }
    }

    const existingUser: User = await fetchUser.json();

    if (!existingUser) {
        return {
            error: "User not found",
        }
    }

    if (existingUser.emailVerified === null) {
        // TODO: send email
        try {
            const tokenFetch = await fetch(
                `${process.env.BASE_URL}/api/generateToken?email=${existingUser.email}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            const tokenData: VerificationToken = await tokenFetch.json();
            await fetch(
                "http://localhost:3000/api/register/verification?email=" + existingUser.email,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: tokenData.token
                    }),
                }
            );

            return {
                error: "Please verify your email",
            };
        } catch (error) {
            console.error("Email Verification Error: ", error);
            return {
                error: "Something went wrong!",
            };
        }
    }


    let success = false;
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        success = true;
    } catch (error) {
        console.error("Login Action Error: ", error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials!",
                    }
                case "CallbackRouteError":
                    return {
                        error: error.cause?.err?.toString() || "Something went wrong!",
                    }
                default:
                    return {
                        error: "Something went wrong!",
                    }
            }
        }
    } finally {
        if (success) {
            redirect(DEFAULT_REDIRECT);
        }
    }
}