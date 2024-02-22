"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { UserRole } from "@prisma/client";
import React from "react";
import FormError from "../formError";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const user = useCurrentUser();
    
    if (allowedRole !== user?.role) {
        return (
            <FormError message="You don't have permission to access this page" />
        );
    }

    return (
        <>
            {children}
        </>
    );
};

export default RoleGate;
