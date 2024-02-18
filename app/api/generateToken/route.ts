import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { generateVerificationToken } from "@/data/token";

export async function GET(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");

        if (!email) {
            const error = new Error("Email not provided");
            return Response.json({ message: error.message }, { status: 400 });
        }
        
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user || !user.email) {
            const error = new Error("User not found");
            return Response.json({ message: error.message }, { status: 400 });
        }

        const token = await generateVerificationToken(user.email);
        
        return Response.json(token);
    } catch (error: any) {
        console.log("Email Verification GET error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}