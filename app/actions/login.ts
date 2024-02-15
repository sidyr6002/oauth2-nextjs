"use server"
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import z from "zod"

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validate = loginSchema.safeParse(values);

    if (!validate.success) {
        return {
            error: "Invalid Request Body",
        }
    }

    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })
    } catch (error) {
        console.error("Login Action Error: ", error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "The credentials are invalid",
                    }
                default:
                    return {
                        error: "Something went wrong",
                    }
            }
        }

        throw error
    }

    return {
        success: "The credentials are valid!",
    }
}