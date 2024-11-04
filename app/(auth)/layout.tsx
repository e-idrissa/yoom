import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode}) => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>{children}</div>
  )
}

export default AuthLayout