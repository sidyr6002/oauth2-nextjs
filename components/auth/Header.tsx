import React from 'react'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils';

const font = Poppins({ subsets: ["latin"], weight: [ "400",  "600"] });

interface headerProps {
    label: string
}

const Header = ({label}: headerProps) => {
  return (
    <div className='w-full flex flex-col space-y-2 items-center justify-center'>
        <h1 className={cn("text-5xl font-semibold drop-shadow-md", font.className)}>Auth</h1>
        <p className={cn("text-sm font-normal text-muted-foreground", font.className)}>{label}</p>
    </div>
  )
}

export default Header