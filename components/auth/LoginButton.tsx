"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "default" | "redirect";
    asChild?: boolean;
}

const LoginButton = (props: LoginButtonProps) => {
    const { children, mode = "redirect", asChild } = props;
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    };

    if (mode === "default") {
        return <span>Hello World</span>;
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};

export default LoginButton;
