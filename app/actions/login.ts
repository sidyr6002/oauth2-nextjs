"use server";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import z from "zod";
import { redirect, useRouter } from "next/navigation";
import { User, VerificationToken } from "@prisma/client";
import axios from "axios";

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validate = loginSchema.safeParse(values);

    if (!validate.success) {
        return {
            error: "Invalid Request Body",
        };
    }

    const fetchUser = await fetch(
        "http://localhost:3000/api/user?email=" + values.email,
        {
            method: "GET",
        }
    );

    if (!fetchUser.ok) {
        return {
            error: "Unable to fetch user",
        };
    }

    const existingUser: User = await fetchUser.json();

    if (!existingUser) {
        return {
            error: "User not found",
        };
    }

    if (existingUser.emailVerified === null) {
        // TODO: send email
        try {
            const tokenFetch = await fetch(`${process.env.BASE_URL}/api/generateToken?email=${existingUser.email}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const tokenData: VerificationToken = await tokenFetch.json();
            await fetch(`${process.env.BASE_URL}/api/register/verification?email=`+existingUser.email, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: tokenData.token,
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

    if (existingUser.twoFactorEnabled) {
        try {
            const twoFactorTokenRes = await axios.post(
                `${process.env.BASE_URL}/api/twoFactor/token?email=${existingUser.email}&userId=${existingUser.id}`
            );

            const twoFactorToken = await twoFactorTokenRes.data.token;
            const sendEmail = await twoFactorTokenRes.data.sendMail;
            //console.log("Two Factor Token Response: ", twoFactorToken, sendEmail);

            if (sendEmail) {
                await axios.post(
                    `${process.env.BASE_URL}/api/twoFactor/email?email=${existingUser.email}`,
                    {
                        token: twoFactorToken.token,
                    }
                );
                return { twoFactor: true };
            }

            if (values.code && twoFactorToken.token != values.code) {
                return { error: "Two Factor Authentication Failed!" };
            }

            await axios.delete(`${process.env.BASE_URL}/api/twoFactor/token?email=${existingUser.email}`);

            const twoFactorConfirmation = await axios.post(
                `${process.env.BASE_URL}/api/twoFactor/confirmation?userId=${existingUser.id}`
            );
            //console.log("Two Factor Confirmation Response: ", twoFactorConfirmation.data);
        } catch (error) {
            console.log("Login -> Two Factor Token Genration Error: ", error);
            return {
                error: "Two Factor Authentication Failed!",
            };
        }
    }

    let success = false;
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        success = true;
    } catch (error) {
        console.error("Login Action Error: ", error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials!",
                    };
                case "CallbackRouteError":
                    return {
                        error:
                            error.cause?.err?.toString() ||
                            "Something went wrong!",
                    };
                default:
                    return {
                        error: "Something went wrong!",
                    };
            }
        }
    } finally {
        if (success) {
            redirect(DEFAULT_REDIRECT);
        }
    }
};
