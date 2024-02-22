import { EmailTemplate } from "@/components/verification/EmailTemplate";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/db";
import { generateVerificationToken } from "@/data/token";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");
        const {
            token
        } = await request.json();

        if (!email) {
            return Response.json({ error: "Missing email" }, { status: 400 });
        }
        
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user || !user.email) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }

        const redirectURL = `${process.env.REACT_APP_URL}/auth/new-verification?token=` + token;
        const emailData = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [user.email],
            subject: "Verifiy Your Account",
            react: EmailTemplate({ name: user.name, redirectURL }) as any,
        });

        return Response.json({
            message: "Email is sent for verification",
            emailData
        });
    } catch (error) {
        return Response.json({ error });
    }
}