import { useCurrentUser } from "@/lib/currentUserAuth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await useCurrentUser();

    if (user?.role === UserRole.USER) {
        return new NextResponse(null, { status: 401 });
    }

    return new NextResponse(null);
}
