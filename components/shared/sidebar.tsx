"use client";

import React from "react";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            link.route === pathname || pathname.startsWith(`${link.route}/`);
          return (
            <Link 
              href={link.route}
              key={link.label}
              className={cn("flex gap-4 items-center p-4 justify-start rounded-lg hover:bg-dark-3 transition-all duration-300", {
                "bg-blue-1": isActive,
              })}
            >
              <Image 
                src={link.imgURL} 
                alt={link.label}
                width={24}
                height={24} 
              />
              <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
