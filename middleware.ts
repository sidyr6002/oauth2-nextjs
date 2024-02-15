import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
    DEFAULT_REDIRECT,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = pathname.startsWith('/api');
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoutes = authRoutes.includes(pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isLoggedIn) {
        if (isAuthRoutes || isPublicRoute) {
            return NextResponse.redirect(new URL(DEFAULT_REDIRECT, req.nextUrl));
        } 
    } else {
        if (!isPublicRoute && !isAuthRoutes) {
            return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
        }
    }

    return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
