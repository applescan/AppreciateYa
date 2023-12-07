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
    const { data: sessionData, status } = useSession();
    const router = useRouter();
    const pathname = usePathname()

    if (status === 'loading') {
        return <Loading />;
    }

    if (sessionData?.user.role !== 'ADMIN' || status === 'unauthenticated') {
        router.push('/')
    }

    const getDefaultTab = () => {
        if (pathname?.endsWith("/users")) {
            return "users";
        } else if (pathname?.endsWith("/organisations")) {
            return "organisations";
        } else {
            return "users";
        }
    };

    return (
        <div className='px-6 pt-12 flex flex-col gap-6 justify-center pb-6'>
            <div>
                <h2 className='font-extrabold flex justify-center text-3xl text-gray-900'>
                    User Management</h2>
            </div>
            <div>
                <Tabs defaultValue={getDefaultTab()} className="w-full flex justify-center">
                    <TabsList>
                        <TabsTrigger value="users" onClick={() => router.push('/admin/users')}>Users</TabsTrigger>
                        <TabsTrigger value="organisations" onClick={() => router.push('/admin/organisations')}>Organisations</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <main>{React.cloneElement(children as React.ReactElement, { sessionData })}</main>
        </div>
    )
}

export default Layout;
