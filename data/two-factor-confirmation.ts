import prisma from "@/lib/db";
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({
            where: {
                userId
            }
        })

        return twoFactorConfirmation;
    } catch (error) {
        console.log("getTwoFactorConfirmationByUserId: ", error);
        return null
    }
}

export const createTwoFactorConfirmation = async (userId: string) => {
    try {
        const twoFactorConfirmation = await prisma.twoFactorConfirmation.create({
            data: {
                userId
            }
        })

        return twoFactorConfirmation;
    } catch (error) {
        console.log("createTwoFactorConfirmation: ", error);
        return null
    }
}

export const deleteTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        await prisma.twoFactorConfirmation.delete({
            where: {
                userId
            }
        })

        return true;
    } catch (error) {
        console.log("deleteTwoFactorConfirmationByUserId: ", error);
        return false;
    }
}