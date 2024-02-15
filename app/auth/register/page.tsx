import CardWrapper from "@/components/auth/CardWrapper";
import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage = () => {
    return (
        <CardWrapper
            headerlabel="Register for an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <RegisterForm />
        </CardWrapper>
    );
};

export default RegisterPage;
