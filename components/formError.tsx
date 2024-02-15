import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface formErrorProps {
    message: string;
}
const FormError = ({ message }: formErrorProps) => {
    return (
        <div className="flex items-center bg-destructive/15 px-4 py-2 rounded-md gap-x-2 text-sm text-destructive justify-center transition-all ease-in-out duration-200 intro:true">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    );
};

export default FormError;
