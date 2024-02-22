import { logout } from '@/app/actions/logout'
import React from 'react'

interface LogoutButtonProps {
    children: React.ReactNode
}

const LogoutButton = ({ children } :  LogoutButtonProps) => {
  return (
        <span onClick={() => logout()} className='flex items-center justify-between cursor-pointer'>
            {children}
        </span>
  )
}

export default LogoutButton