"use client";
import { registerSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import Link from 'next/link';
import axios from 'axios';
import FormError from '../formError';
import FormSuccess from '../formSuccess';

const registerForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        startTransition(async () => {
            try {
                const response = await axios.post("/api/register", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log(response.data);
                setSuccess(response.data.message);
                timeOut();
            } catch (error: any) {
                console.error(error);
                setError(error.response.data.message);
                timeOut();
            }  
        })
    }

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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Re-enter your password"
                                    type="password"
                                    autoComplete="confirmPassword"
                                    {...field}
                                    className="w-full py-5 text-base sm:text-lg placeholder:text-base shadow-inner shadow-gray-400/40"
                                    disabled={isPending}
                                />
                            </FormControl>
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
                    Sign Up
                </Button>
            </form>
        </Form>
    )
}

export default registerForm