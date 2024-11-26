import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const AuthLayout = ({ children }: { children: ReactNode}) => {
  return (
    <div className='flex justify-center items-center h-screen w-full'>{children}</div>
  )
}

export default AuthLayout