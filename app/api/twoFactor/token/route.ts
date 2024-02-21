import { deleteTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { deleteTwoFactorTokenByEmail, generateTwoFactorToken, getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");
        const userId = request.nextUrl.searchParams.get("userId");
        if (!email || !userId) {
            return Response.json({ message: "Missing email"}, { status: 400 });
        }

        const existingToken = await getTwoFactorTokenByEmail(email) 
        
        if (existingToken && new Date() < new Date(existingToken.expires)) {
            return Response.json({token: existingToken, sendMail: false});
        }

        await Promise.all([
            deleteTwoFactorConfirmationByUserId(userId),
            deleteTwoFactorTokenByEmail(email)
        ])

        // Todo: Change to 10 minutes
        const newToken = await generateTwoFactorToken(email);
        if(!newToken) {
            return Response.json({ message: "Failed to generate token"}, { status: 500 });
        }   

        return Response.json({token: newToken, sendMail: true});
    } catch (error: any) {
        console.log("Two Factor token POST error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");
        if (!email) {
            return Response.json({ message: "Missing email"}, { status: 400 });
        }

        const existingToken = await getTwoFactorTokenByEmail(email) 
        if (!existingToken) {
            return Response.json({ message: "Two Factor Token not found"}, { status: 400 });
        }
        
        await deleteTwoFactorTokenByEmail(email);

        return Response.json({ message: "Two Factor Token deleted"});
    } catch (error: any) {
        console.log("Two Factor Token DELETE error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}