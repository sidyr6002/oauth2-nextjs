"use client";
import { admin } from "@/app/actions/admin";
import RoleGate from "@/components/auth/RoleGate";
import FormSuccess from "@/components/formSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import axios from "axios";
import React from "react";
import toast from 'react-hot-toast';


const AdminPage = () => {
    const onSeverRouteClick = async () => {
        toast.promise(admin(), {
            loading: "Loading...",
            success: "Action Access Granted",
            error: "Action Access Denied",
        })
    }
    const onAPIRouteClick = async () => {
        toast.promise(axios.get(`/api/admin`), {
            loading: "Loading...",
            success: "API Access Granted",
            error: "API Access Denied",
        });
    };

    return (
        <Card className="w-[700px] shadow-md shadow-gray-400/30">
            <CardHeader>
                <p className="text-xl font-semibold text-center">Admin Page</p>
            </CardHeader>
            <CardContent className="space-y-5">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You have access to this page" />
                </RoleGate>
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/20">
                    <p className="text-lg font-semibold">
                        Admin-Only API Route
                    </p>
                    <Button
                        variant="default"
                        className="rounded-[8px] px-6 bg-foreground/85 text-background"
						onClick={onAPIRouteClick}
                    >
                        Click
                    </Button>
                </div>
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/20">
                    <p className="text-lg font-semibold">
                        Admin-Only Server Action
                    </p>
                    <Button
                        variant="default"
                        className="rounded-[8px] px-6 bg-foreground/85 text-background"
                        onClick={onSeverRouteClick}
                    >
                        Click
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminPage;
