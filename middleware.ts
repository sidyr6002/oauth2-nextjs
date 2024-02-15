import { auth } from "@/auth";

export default auth((req) => {
    // req.auth
    // req.user
    console.log("Route: ", req.nextUrl.pathname)
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
