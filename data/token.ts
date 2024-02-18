import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "./verification-token";
import prisma from "@/lib/db";
export const generateVerificationToken = async (email: string) => {
    try {
        const token = uuid();
        const expires = new Date(Date.now() + 60 * 60 * 1000);

        const existingUser = await getVerificationTokenByEmail(email);

        if (existingUser) {
            await prisma.verificationToken.delete({
                where: {
                    id: existingUser.id,
                },
            });
        }

        const verificationToken = await prisma.verificationToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        return verificationToken;
    } catch (error) {
        console.log("generateVerificationToken: ", error);
        return null;
    }
};
