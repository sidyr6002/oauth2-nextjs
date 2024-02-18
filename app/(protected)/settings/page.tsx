import React from "react";
import { auth, signOut } from "@/auth";
const SettingsPage = async () => {
    const session = await auth();
    if (!session) return null;

    return (
        <>
            <div>{JSON.stringify(session)}</div>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </>
    );
};

export default SettingsPage;
