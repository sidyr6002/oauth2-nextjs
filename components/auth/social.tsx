"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from '../ui/button';


const Social = () => {
  return (
    <div className='w-full flex items-center gap-x-4'>
        <Button variant="outline" size="lg" className="w-full text-2xl py-4">
            <FcGoogle />
        </Button>
        <Button variant="outline" size="lg" className="w-full text-2xl py-4">
            <FaGithub />
        </Button>
    </div>
  )
}

export default Social