import React, { ReactNode } from "react";

import NavBar from "@/components/shared/navbar";
import SideBar from "@/components/shared/sidebar";
import StreamVideoProvider from "@/providers/stream-client-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling app",
  icons: {
    icon: '/icons/logo.svg'
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <StreamVideoProvider>
        <NavBar />
        <div className="flex">
          <SideBar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pt-28 max-md:pb-14 sm:px-14">
            <div className="w-full">{children}</div>
          </section>
        </div>
      </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
