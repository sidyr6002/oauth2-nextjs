import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

interface backButtonCardProps {
    href: string;
    label: string;
}
const BackButtonCard = ({href, label}: backButtonCardProps) => {
    return (
         <Button variant="link" size="sm" className='w-full text-sm' asChild>
             <Link href={href}>
                {label}
             </Link>
         </Button>   
    )
}

export default BackButtonCard