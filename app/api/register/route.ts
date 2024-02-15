import { registerSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(request: Request) {
    try {
        const req: z.infer<typeof registerSchema> = await request.json();
        const body = registerSchema.safeParse(req);
        if (!body.success) {
            const error = new Error("Failed to validate request body");
            return Response.json({ message: error.message }, { status: 400 });
        }

        const {
            name,
            email,
            password
        } = body.data

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            const error = new Error("User already exists");
            return Response.json({ message: error.message }, { status: 400 });
        }

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })
        
        return Response.json({
            message: "Registered successfully!",
        })
    } catch (error: any) {
        console.log(error);
        return Response.json({ message: error.message || "Something went wrong" },{ status: 500 });
    }
}