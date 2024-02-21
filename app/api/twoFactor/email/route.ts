import TwoFactorTokenTemplate from "@/components/verification/TwoFactorTokenTemplate";
import { getUserbyEmail } from "@/data/user";
import { NextRequest } from "next/server";
import { Resend } from "resend";

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
        
        const user = await getUserbyEmail(email);

        if (!user || !user.email) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }
        
        const emailData = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [user.email],
            subject: "Verifiy Your Account",
            react: TwoFactorTokenTemplate({ token }) as any,
        });

        return Response.json(emailData);
    } catch (error) {
        console.log("Two Factor Email POST: ", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}