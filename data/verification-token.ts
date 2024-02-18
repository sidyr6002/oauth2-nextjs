import prisma from "@/lib/db";
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findFirst({
            where: {
                email,
            },
        });

        return verificationToken;
    } catch (error) {
        console.log("getVerificationTokenByEmail: ", error);
        return null;
    }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: {
                token,
            },
        })

        return verificationToken;
    } catch (error) {
        console.log("getVerificationTokenByToken: ", error);
        return null;
    }
};
