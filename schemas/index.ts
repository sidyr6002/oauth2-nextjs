import { optional, z } from "zod";

const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/
);

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .min(4, "Must have at least 4 characters")
        .max(255, "Maximum 255 characters are allowed")
        .email("Invalid email"),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Must have at least 6 characters")
        .max(255, "Maximum 255 characters are allowed")
        .regex(
            passwordValidation,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    code: z.optional(z.string().regex(/^[0-9]{6}$/, "Invalid code")),
});

export const registerSchema = z
    .object({
        name: z
            .string({ required_error: "Name is required" })
            .min(4, "Must have at least 4 characters")
            .max(255, "Maximum 255 characters are allowed"),
        email: z
            .string({ required_error: "Email is required" })
            .min(4, "Must have at least 4 characters")
            .max(255, "Maximum 255 characters are allowed")
            .email("Invalid email"),
        password: z
            .string({ required_error: "Password is required" })
            .min(6, "Must have at least 6 characters")
            .max(255, "Maximum 255 characters are allowed")
            .regex(
                passwordValidation,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: z
            .string({ required_error: "Confirm password is required" })
            .min(6, "Must have at least 6 characters")
            .max(255, "Maximum 255 characters are allowed")
            .regex(passwordValidation),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const resetPasswordSchema = z
    .object({
        email: z
        .string({ required_error: "Email is required" })
        .min(4, "Must have at least 4 characters")
        .max(255, "Maximum 255 characters are allowed")
        .email("Invalid email"),
        password: z
            .string({ required_error: "Password is required" })
            .min(6, "Must have at least 6 characters")
            .max(255, "Maximum 255 characters are allowed")
            .regex(
                passwordValidation,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: z
            .string({ required_error: "Confirm password is required" })
            .min(6, "Must have at least 6 characters")
            .max(255, "Maximum 255 characters are allowed")
            .regex(passwordValidation),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const settingsSchema = z
    .object({
        name: z.optional(z.string().min(4, "Must have at least 4 characters").max(255, "Maximum 255 characters are allowed")),
        role: z.optional(z.enum(["ADMIN", "USER"])),
        isTwoFactorEnabled: z.optional(z.boolean()),
    })