"use client";
import React from "react";
import { logout } from "@/app/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { settingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/formError";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Command, CommandGroup, CommandInput } from "cmdk";
import { CommandItem } from "@/components/ui/command";
import { settings } from "@/app/actions/settings";


const SettingsPage = () => {
    const [popOpen, setPopOpen] = React.useState(false)
    const user = useCurrentUser();

    if (!user) {
        return <FormError message="USER NOT FOUND"/>
    }

    const form = useForm<z.infer<typeof settingsSchema>>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
          name: user?.name || "",
          role: user?.role,
          isTwoFactorEnabled: user?.isTwoFactorEnabled,
        },
      })

      const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
            try {
                
                settings({userInput: values})
            } catch (error) {
                
            }
      }

      const userRoles = [
        {
          value: "ADMIN",
          label: "Admin",
        },
        {
          value: "USER",
          label: "User",
        },
      ]

    return (
        <Card className="w-[700px] shadow-md shadow-gray-400/30">
            <CardHeader>
                <p className="text-xl font-semibold text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between border rounded-sm space-y-0 px-4 py-2 shadow-sm shadow-slate-700/20">
                                    <FormLabel className="mr-3 text-lg font-semibold">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            className=" min-w-min rounded-[5px] border-none shadow-none text-end font-mono text-base"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between border rounded-sm space-y-0 px-4 py-2 shadow-sm shadow-slate-700/20">
                                    <FormLabel className="text-lg font-semibold">Role</FormLabel>
                                    <FormControl >
                                        <Popover open={popOpen} onOpenChange={setPopOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={popOpen}
                                                    className="flex justify-between items-center rounded-[5px] w-32 font-mono text-base"
                                                >
                                                    {field.value ? userRoles.find((role) => role.value === field.value)?.label : "Select Role"}
                                                    <MdOutlineArrowDropDown className="h-8 w-8 text-blue-600/90" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 rounded-[5px] w-32">
                                                <Command>
                                                    <CommandGroup>
                                                        {userRoles.map((role) => (
                                                            <CommandItem
                                                                key={role.value}
                                                                value={role.value}
                                                                className="text-sm font-mono hover:rounded-none aria-selected:rounded-none"
                                                                onSelect={(currentValue) => {
                                                                    field.onChange(currentValue.toUpperCase());
                                                                    setPopOpen(false);
                                                                }}    
                                                            >
                                                                {role.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isTwoFactorEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-3 space-y-0 shadow-sm shadow-slate-700/20">
                                    <FormLabel className="text-lg font-semibold">Two Factor Enabled</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-center">
                            <Button type="submit" className="rounded-[8px] w-48 hover:bg-foreground">Set Settings</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SettingsPage;
