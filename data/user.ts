import prisma from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    } catch (error) {
        console.error("getUserbyEmail: ", error);
        return null;
    }
};
