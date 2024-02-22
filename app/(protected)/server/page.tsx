import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/lib/currentUserAuth";
import React from "react";

const ServerPage = async () => {
    const user = await useCurrentUser();
    
    return (
        <UserInfo user={user} label="Server Component"/>
    );
};

export default ServerPage;
