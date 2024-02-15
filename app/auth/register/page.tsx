import CardWrapper from "@/components/auth/cardWrapper";
import RegisterForm from "@/components/auth/registerForm";
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
