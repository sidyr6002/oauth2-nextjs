"use server"

import { loginSchema } from "@/schemas"
import { z } from "zod"

export const login = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
}