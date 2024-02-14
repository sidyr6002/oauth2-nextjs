import { z } from "zod";

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
        )
});
