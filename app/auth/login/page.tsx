import CardWrapper from "@/components/auth/cardWrapper";
import LoginForm from "@/components/auth/loginForm";
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
