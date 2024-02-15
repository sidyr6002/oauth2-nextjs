"use client";
import React, {useTransition, useRef, useState} from "react";
import { loginSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

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
import FormSuccess from "../formSuccess";
import axios from "axios";
import Link from "next/link";
import { login } from "@/app/actions/login";

const LoginForm = () => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
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
            login(values).then((data) => {
                if (data.error) {
                    setError(data.error);
                    timeOut();
                } else {
                    setSuccess(data.success);
                    timeOut();
                }
            }).catch((error) => {
                console.error(error);
                setError("Something went wrong");
            })
        });
    };

    const timeOut = () => {
        setTimeout(() => {
            setSuccess(undefined);
            setError(undefined);
        }, 2500);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Email</FormLabel>
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
                            <FormLabel className="sr-only">Password</FormLabel>
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
                                <Button variant="link" size="sm" className="p-0 text-sm">
                                    <Link href="#">Forgot your password?</Link>
                                </Button>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <FormError message={error}/>}
                {success && <FormSuccess message={success}/>}

                <Button
                    type="submit"
                    className="w-full text-base py-5 shadow-md shadow-blue-500/30"
                    disabled={isPending}
                >
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
