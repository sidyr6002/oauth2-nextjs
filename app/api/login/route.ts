import { loginSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
    try {
        const req: z.infer<typeof loginSchema> = await request.json();
        const body = loginSchema.safeParse(req);
        if (!body.success) {
            const error = new Error("Failed to validate request body");
            return Response.json({ message: error.message }, { status: 400 });
        }

        console.log("Login POST request: ", body);
        const user = await prisma.user.findUnique({
            where: {
                email: body.data.email,
            },
        });

        if (!user) {
            const error = new Error("User not found");
            return Response.json({ message: error.message }, { status: 400 });
        }

        const isMatch = user.password
            ? await bcrypt.compare(body.data.password, user.password)
            : true;

        if (!isMatch) {
            const error = new Error("Invalid credentials");
            return Response.json({ message: error.message }, { status: 400 });
        }

        return Response.json(user);
    } catch (error: any) {
        console.log("Login POST error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}
