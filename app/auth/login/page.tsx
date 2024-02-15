import CardWrapper from "@/components/auth/CardWrapper";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const LoginPage = () => {
    return (
        <CardWrapper
            headerlabel="Welcome Back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
        >
            <LoginForm />
        </CardWrapper>
    );
};

export default LoginPage;
