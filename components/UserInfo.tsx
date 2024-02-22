import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { User } from "next-auth";
import { Badge } from "./ui/badge";

interface SessionUser extends User {
    role?: "ADMIN" | "USER" | undefined;
    isTwoFactorEnabled?: boolean;
}

interface UserInfoProps {
    user: SessionUser | undefined;
    label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
    return (
        <Card className="w-[700px] shadow-md shadow-gray-400/30">
            <CardHeader>
                <p className="text-xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/10">
                    <p className="text-lg font-semibold">ID</p>
                    <p className="max-w-[180px] truncate text-base font-medium font-mono">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/10">
                    <p className="text-lg font-semibold">Name</p>
                    <p className="max-w-[180px] truncate text-base font-medium font-mono">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/10">
                    <p className="text-lg font-semibold">E-mail</p>
                    <p className="max-w-[200px] truncate text-base font-medium font-mono">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/10">
                    <p className="text-lg font-semibold">Role</p>
                    <p className="max-w-[200px] truncate text-base font-medium font-mono">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center px-4 py-2 border rounded-sm shadow-sm shadow-black/10">
                    <p className="text-lg font-semibold">Two Factor Enabled</p>
                    <Badge
                        variant={
                            user?.isTwoFactorEnabled ? "default" : "destructive"
                        }
                        className="rounded-lg"
                    >
                        <p className="px-2 text-base font-medium font-mono">
                            {user?.isTwoFactorEnabled ? "Yes" : "No"}
                        </p>
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
