import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react';
import React from 'react'
import Navbar from './_components/Navbar';
import { Toaster } from 'react-hot-toast';

interface ProtectedLayoutProps {
    children: React.ReactNode
}
const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <div className='min-h-screen flex flex-col gap-y-6 justify-center items-center bg-black-gradient bg-blend-multiply text-slate-50'>
                    <Toaster/>
                    <Navbar />
                    {children}
            </div>
        </SessionProvider>
    )
}

export default ProtectedLayout