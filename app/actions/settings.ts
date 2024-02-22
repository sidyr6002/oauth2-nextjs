"use server";

import { useCurrentUser } from "@/lib/currentUserAuth";
import { settingsSchema } from "@/schemas";
import axios from "axios";
import { z } from "zod";

interface Settings {
    userInput: z.infer<typeof settingsSchema>;
}

export const settings = async ({ userInput }: Settings) => {
    try {
        const sessioUser = await useCurrentUser();

        if (!sessioUser || sessioUser?.role !== "ADMIN") {
            return {
                error: "Unauthorized",
            };
        }

        const user = await settingsSchema.parseAsync(userInput);

        const update = await axios.put(`${process.env.REACT_APP_URL}/api/user?email=${sessioUser.email}`, user);
        console.log("Settings Action update: ", update.data.message);

        return {
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Invalid input",
        };
    }
};
