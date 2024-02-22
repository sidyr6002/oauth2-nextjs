"use server";

import { User, VerificationToken } from "@prisma/client";

export const newVerification = async (token: string) => {
    const getTokenRes = await fetch(`${process.env.REACT_APP_URL}/api/token?token=` + token, {
        method: "GET"
    });

    console.log("Token: ", getTokenRes);

    if (!getTokenRes.ok) {
        return {
            error: "Token not found",
        }
    }

    const tokenData: VerificationToken = await getTokenRes.json();
    console.log("Token Data: ", tokenData);

    const dateExpiration = new Date(tokenData.expires) < new Date();

    if (dateExpiration) {
        return {
            error: "Token expired",
        }
    }

    const userFetch = await fetch(`${process.env.REACT_APP_URL}/api/user?email=` + tokenData.email, {
        method: "GET"
    });
    
    if (!userFetch.ok) {
        return {
            error: "User not found",
        }
    }

    const userData: User = await userFetch.json();
    
    try {        
        await fetch(`${process.env.REACT_APP_URL}/api/user?email=` + userData.email, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({emailVerified: new Date(), email: tokenData.email}),
        })

        await fetch(`${process.env.REACT_APP_URL}/api/token?token=` + token, {
            method: "DELETE"
        })
    } catch (error) {
        console.log("Error New Verification Action: ", error);
        return {
            error: "Error New Verification",
        }
    }

    return {
        success: "Email Verified"
    }

}