import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");
        if (!email) {
            const error = new Error("Email not provided");
            return Response.json({ message: error.message }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            const error = new Error("User not found");
            return Response.json({ message: error.message }, { status: 400 });
        }

        return Response.json(user);
    } catch (error: any) {
        console.log("Login GET error: ", error);
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const email = request.nextUrl.searchParams.get("email");
        let {
            name,
            emailVerified,
            image,
            password,
            role
        } = await request.json();

        if (!name && !emailVerified && !image && !password && !role) {
            const error = new Error("No data provided");
            return Response.json({ message: error.message }, { status: 400 });
        }

        if (!email) {
            const error = new Error("Email not provided");
            return Response.json({ message: error.message }, { status: 400 });
        }
        
        console.log("Login PUT request: ", email, name, emailVerified, image, password, role);

        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }


        await prisma.user.update({
            where: {
                email
            },
            data: {
                name,
                emailVerified,
                image,
                password,
                role
            }
        })

        return Response.json({
            message: "User updated successfully!",
        });
    } catch (error) {
        console.log("Login PUT error: ", error);
        return Response.json({ message: error }, { status: 500 });
    }
}