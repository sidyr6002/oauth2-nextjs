"use client"
import UserButton from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const pathname = usePathname();
    
    return (
        <nav className="bg-secondary flex justify-between items-center px-4 py-3 rounded-lg w-[700px] text-foreground">
            <div className="flex gap-x-3">
                <Button asChild className="rounded-sm" variant={pathname === "/server" ? "default" : "outline"}>
                    <Link href="/server">Server</Link>
                </Button>
                <Button asChild className="rounded-sm" variant={pathname === "/client" ? "default" : "outline"}>
                    <Link href="/client">Client</Link>
                </Button>
                <Button asChild className="rounded-sm" variant={pathname === "/admin" ? "default" : "outline"}>
                    <Link href="/admin">Admin</Link>
                </Button>
                <Button asChild className="rounded-sm" variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
};

export default Navbar;
