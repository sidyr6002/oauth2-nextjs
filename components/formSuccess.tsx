import React from 'react'
import { CheckCircledIcon } from '@radix-ui/react-icons'

interface formSuccessProps {
    message: string
}
const FormSuccess = ({message}: formSuccessProps) => {
  return (
    <div className='flex items-center bg-emerald-500/15 px-4 py-2 rounded-md gap-x-2 text-sm text-emerald-500 justify-center'>
        <CheckCircledIcon className='w-4 h-4'/>
        <p>{message}</p>
    </div>
  )
}

export default FormSuccess