
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import Header from './header'
import Social from './social'
import BackButtonCard from './backButtonCard'

interface cardWrapperProps {
    children: React.ReactNode
    headerlabel : string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

const CardWrapper = (props: cardWrapperProps) => {
    const {
        children,
        headerlabel,
        backButtonLabel,
        backButtonHref,
        showSocial = true
    } = props

    return (
        <Card className='w-10/12 sm:w-[420px] shadow-md shadow-gray-400/40'>
            <CardHeader>
                <CardTitle>
                    <Header label={headerlabel} />
                </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButtonCard href={backButtonHref}
                label={backButtonLabel}/>
            </CardFooter>
        </Card>
    )
}

export default CardWrapper