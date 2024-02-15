import { loginSchema } from "@/schemas";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const req: z.infer<typeof loginSchema> = await request.json();
        const body = loginSchema.safeParse(req);
        if (!body.success) {
            const error = new Error("Failed to validate request body");
            return Response.json({ message: error.message }, { status: 400 });
        }

        console.log("Login POST request: ", body);
        return Response.json({
            message: "The credentials are valid!",
        });
    } catch (error: any) {
        console.log(error);
        return Response.json({ message: error.message || "Something went wrong" },{ status: 500 });
    }
}
