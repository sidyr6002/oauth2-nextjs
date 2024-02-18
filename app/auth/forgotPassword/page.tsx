import CardWrapper from '@/components/auth/CardWrapper'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import React from 'react'

const ForgotPassword = () => {
  return (
    <CardWrapper
        headerlabel='Forgot Password'
        backButtonLabel='Back to Login'
        backButtonHref='/auth/login'
        showSocial={false}
    >
        <ForgotPasswordForm />
    </CardWrapper>
  )
}

export default ForgotPassword