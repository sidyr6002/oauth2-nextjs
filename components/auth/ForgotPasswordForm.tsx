"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import FormError from "../formError";
import FormSuccess from "../formSuccess";
import { useSearchParams } from "next/navigation";


const ForgotPasswordForm = () => {
    const token = useSearchParams().get("token");
    const [pending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
        console.log("Input: ", values);
        startTransition(async () => {
            try {
                const resetResponse = await axios.put("/api/user", values, {
                    params: {
                        email: values.email
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const response = await resetResponse.data;
                console.log(response);
                setSuccess(response.message);
            } catch (error: any) {
                console.error(error);
                setError(error.response.data.message);
            }  
        })
    }

    return <Form {...form}>
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
                                    autoComplete="new-password"
                                    {...field}
                                    className="w-full py-5 text-base sm:text-lg placeholder:text-base shadow-inner shadow-gray-400/40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Confirm-Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Re-enter your password"
                                    type="password"
                                    autoComplete="new-password"
                                    {...field}
                                    className="w-full py-5 text-base sm:text-lg placeholder:text-base shadow-inner shadow-gray-400/40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {success && <FormSuccess message={success}/>}
                {error && <FormError message={error}/>}

                <Button
                    type="submit"
                    className="w-full text-base py-5 shadow-md shadow-blue-500/30"
                >
                    Reset Password
                </Button>
        </form>
    </Form>;
};

export default ForgotPasswordForm;
