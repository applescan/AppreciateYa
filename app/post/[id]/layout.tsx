'use client'
import React, { ReactNode } from 'react'
import { useSession } from 'next-auth/react';
import Loading from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'unauthenticated') {
        router.push('/')
    }

    return (
        <div style={{
            backgroundImage: `url("/post.jpg")`,
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}
            className='px-14 pt-12 flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
                <div className='font-extrabold flex text-3xl text-gray-900 gap-4 items-center cursor-pointer' onClick={() => router.push('/dashboard')}>
                    <FaArrowLeft className='text-pink-500' /> Back
                </div>
            </div>
            <main>{React.cloneElement(children as React.ReactElement, { sessionData })}</main>
        </div>

    )
}

export default Layout;
