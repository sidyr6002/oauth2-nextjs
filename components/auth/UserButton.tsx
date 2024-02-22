"use client"

import React from 'react'
import { TiUser } from "react-icons/ti";
import { IoLogOut } from "react-icons/io5";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LogoutButton from './LogoutButton';
import { useCurrentUser } from '@/hooks/useCurrentUser';


const UserButton = () => {
    const user = useCurrentUser();

  return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
                <Avatar>
                    <AvatarImage src={user?.image || ""}></AvatarImage>
                    <AvatarFallback className="bg-blue-600">
                        <TiUser className='text-white h-5 w-5'/>
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='rounded-sm py-2 px-3'>
                <LogoutButton>
                    Logout
                    <IoLogOut className='w-5 h-5 text-blue-600'/>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default UserButton