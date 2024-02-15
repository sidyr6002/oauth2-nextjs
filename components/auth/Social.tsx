"use client"
import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from '../ui/button';


const Social = () => {
  return (
    <div className='w-full flex items-center gap-x-4'>
        <Button variant="outline" size="lg" className="w-full text-2xl py-4 shadow">
            <FaGoogle />
            <span className='hidden sm:block text-sm ml-2'>Google</span>
        </Button>
        <Button variant="outline" size="lg" className="w-full text-2xl py-4 shadow">
            <FaGithub />
            <span className='hidden sm:block text-sm ml-2'>Github</span>
        </Button>
    </div>
  )
}

export default Social