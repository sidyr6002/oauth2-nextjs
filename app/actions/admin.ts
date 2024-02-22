"use server";
import { useCurrentUser } from "@/lib/currentUserAuth";
import { UserRole } from "@prisma/client";

export const admin = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        useCurrentUser().then((user) => {
            if (user?.role === UserRole.ADMIN) {
                resolve(true);
            } else {
                reject(false);
            }
        })
    })
}