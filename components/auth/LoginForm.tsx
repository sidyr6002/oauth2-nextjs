"use client";
import React, { useState, useTransition } from "react";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormError from "../formError";
import Link from "next/link";
import { login } from "@/app/actions/login";
import { AuthError } from "next-auth";
import { redirect, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const authError =
        useSearchParams().get("error") === "OAuthAccountNotLinked"
            ? "Email is already linked!"
            : undefined;
    const [error, setError] = useState<string | undefined>("");
    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        startTransition(async () => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                        timeOut();
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(data.twoFactor);
                    }
                })
                .catch((error: any) => {
                    console.error("Login Action Error: ", error);
                    setError("Something went wrong");
                });
        });
    };

    const timeOut = () => {
        setTimeout(() => {
            setError(undefined);
        }, 2500);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {showTwoFactor && (
                    <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">
                                Code
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your code"
                                    {...field}
                                    className="w-full py-5 text-base sm:text-lg placeholder:text-base shadow-inner shadow-gray-400/40"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                )}
                {!showTwoFactor && (
                    <>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                            className="w-full py-5 text-base sm:text-lg placeholder:text-base shadow-inner shadow-gray-400/40"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your password"
                                            type="password"
                                            autoComplete="password"
                                            {...field}
                                            className="w-full py-5 text-base sm:text-lg placeholder:text-base shadow-inner shadow-gray-400/40"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 text-sm"
                                        >
                                            <Link href="/auth/forgotPassword">
                                                Forgot your password?
                                            </Link>
                                        </Button>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}
                {error && <FormError message={error} />}
                {authError && <FormError message={authError} />}

                <Button
                    type="submit"
                    className="w-full text-base py-5 shadow-md shadow-blue-500/30"
                    disabled={isPending}
                >
                    {showTwoFactor ? "Confirm" : "Login"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
