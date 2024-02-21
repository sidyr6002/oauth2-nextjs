import { NextRequest } from "next/server";
import { createTwoFactorConfirmation, deleteTwoFactorConfirmationByUserId, getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export async function POST(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId");
        if (!userId) {
            return Response.json({ message: "Missing userId"}, { status: 400 });
        }

        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(userId);
        if (twoFactorConfirmation) {
            await deleteTwoFactorConfirmationByUserId(userId);
        }

        const newTwoFactorConfirmation = await createTwoFactorConfirmation(userId);

        return Response.json(newTwoFactorConfirmation);
    } catch (error: any) {
        console.log("Two Factor Confirmation POST error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId");
        if (!userId) {
            return Response.json({ message: "Missing userId"}, { status: 400 });
        }

        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(userId);

        if (!twoFactorConfirmation) {
            return Response.json({ message: "Two Factor Confirmation not found"}, { status: 400 });
        }

        return Response.json(twoFactorConfirmation);
    } catch (error: any) {
        console.log("Two Factor Confirmation GET error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try{
        const userId = request.nextUrl.searchParams.get("userId");
        if (!userId) {
            return Response.json({ message: "Missing userId"}, { status: 400 });
        }

        const deleteTwoFactorConfirmation = await deleteTwoFactorConfirmationByUserId(userId);

        if (!deleteTwoFactorConfirmation) {
            return Response.json({ message: "Failed to delete two factor confirmation"}, { status: 500 });
        }

        return Response.json({ message: "Two Factor Confirmation deleted"});
    } catch (error: any) {
        console.log("Two Factor Confirmation DELETE error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}