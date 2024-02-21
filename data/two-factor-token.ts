import prisma from "@/lib/db";
import crypto from "crypto";

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findUnique({
            where: {
                token,
            },
        });

        return twoFactorToken;
    } catch (error) {
        console.log("getTwoFactorTokenByToken: ", error);
        return null;
    }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: {
                email,
            },
        });

        return twoFactorToken;
    } catch (error) {
        console.log("getTwoFactorTokenByEmail: ", error);
        return null;
    }
};

export const generateTwoFactorToken = async (email: string, time: number = 60) => {
    try {
        const token = crypto.randomInt(100_000, 999_999).toString();
        const expires = new Date(new Date().getTime() + time * 60 * 1000);

        const generatedToken = await prisma.twoFactorToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        return generatedToken;
    } catch (error) {
        console.log("generateTwoFactorToken: ", error);
        return null
    }
}

export const deleteTwoFactorTokenByToken = async (token: string) => {
    try {
        await prisma.twoFactorToken.delete({
            where: {
                token,
            },
        });

        return true;
    } catch (error) {
        console.log("deleteTwoFactorTokenByToken: ", error);
        return false;
    }
};

export const deleteTwoFactorTokenByEmail = async (email: string) => {
    try {
        await prisma.twoFactorToken.deleteMany({
            where: {
                email,
            },
        });

        return true;
    } catch (error) {
        console.log("deleteTwoFactorTokenByEmail: ", error);
        return false;
    }
}