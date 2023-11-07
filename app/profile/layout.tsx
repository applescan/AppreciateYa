'use client'
import React, { ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/components/ui/Loading';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className='px-12 pt-12 flex flex-col gap-4 justify-center'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-extrabold flex text-3xl text-gray-900 justify-center'>
                    My Profile
                </h2>
                <p className='flex justify-center'>Update your account information</p>
            </div>

            <main>{children}</main>
        </div>
    )
}

export default Layout;
