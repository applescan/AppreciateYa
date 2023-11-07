'use client'
import React, { ReactNode } from 'react'
import { useSession } from 'next-auth/react';
import Loading from '@/components/ui/Loading';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { data: sessionData, status } = useSession();

    if (status === 'loading') {
        return <Loading />;
    }

    if (sessionData?.user.role !== 'ADMIN' || status === 'unauthenticated') {
        return <p>You are not authorized to view this page!</p>;
    }

    return (
        <div className='px-10 pt-12 flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-extrabold flex text-3xl text-gray-900'>
                    Choose Your Perfect Gift! ✨
                </h2>
                <p className='flex'>Choose your favorite card design. Don’t forget, you can add a personal touch to your gift with a message!</p>
            </div>
            <main>{React.cloneElement(children as React.ReactElement, { sessionData })}</main>
        </div>
    )
}

export default Layout;
