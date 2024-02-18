import CardWrapper from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

const ErrorPage = () => {
    return (
        <CardWrapper
            headerlabel="Something went wrong!"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <div className="flex items-center justify-center gap-x-1 text-destructive text-base">
                <ExclamationTriangleIcon className="w-5 h-5"/>
                <p className="text-left pl-2">Please try again or contact support.</p>
            </div>
        </CardWrapper>
    );
};

export default ErrorPage;
