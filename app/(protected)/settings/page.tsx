"use client";
import { logout } from "@/app/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";
const SettingsPage = () => {
    const session = useCurrentUser();
    const onClick = () => {
        logout();
    }

    return (
        <>
            <div>{JSON.stringify(session)}</div>
            <button onClick={onClick}>Sign Out</button>
        </>
    );
};

export default SettingsPage;
