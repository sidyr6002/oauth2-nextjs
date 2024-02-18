import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { getVerificationTokenByEmail, getVerificationTokenByToken } from "@/data/verification-token";

export async function GET(request: NextRequest) {
    try {
        const tokenParam = request.nextUrl.searchParams.get("token");
        const emailParam = request.nextUrl.searchParams.get("email");

        if (!tokenParam && !emailParam) {
            return Response.json({ message: "Missing token or email"}, { status: 400 });
        }
        
        if (tokenParam) {
            const token = await getVerificationTokenByToken(tokenParam);
            if (!token) {
                return Response.json({ message: "Token not found"}, { status: 400 });
            }

            return Response.json(token);
        } 

        if (emailParam) {
            const token = await getVerificationTokenByEmail(emailParam);
            if (!token) {
                return Response.json({ message: "Token not found"}, { status: 400 });
            }

            return Response.json(token);
        }


    } catch (error: any) {
        console.log("Email Verification GET error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const tokenParam = request.nextUrl.searchParams.get("token");

        if (!tokenParam ) {
            return Response.json({ message: "Missing token or email"}, { status: 400 });
        }

        if (tokenParam) {
            await prisma.verificationToken.delete({
                where: {
                    token: tokenParam
                }
            })
        }

        return Response.json({ message: "Token deleted"});
    } catch (error: any) {
        console.log("Email Verification DELETE error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }

}