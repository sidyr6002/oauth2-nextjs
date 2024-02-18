"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/app/actions/new-verification";
import FormSuccess from "../formSuccess";
import FormError from "../formError";

const NewVerficationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    // console.log("Token: ", token);

    const onSubmit = useCallback(() => {
        console.log("Token: ", token);
        if (success || error) return;
        
        if (!token) {
            setError("Token not provided!");
            return;
        }

        newVerification(token).then((res) => {
            setError(res.error);
            setSuccess(res.success);
        }).catch((error) => {
            console.log("Error New Verfication Action: ", error);
            setError("Something went wrong");
        })
    }, [token]);

    // const timeOut = () => {
    //     setTimeout(() => {
    //         setSuccess(undefined);
    //         setError(undefined);
    //     }, 3000);
    // }

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerlabel="Email Verification"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <div className="flex items-center justify-center">
                {!success && !error && <BeatLoader />}
                {success && <FormSuccess message={success} />}
                {error && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
};

export default NewVerficationForm;
