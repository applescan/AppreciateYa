'use client'
import Button from "@/components/Button";
import React from "react";
import { RiHeartAddLine } from "react-icons/ri";
import { useRouter, usePathname } from 'next/navigation';

const UserPostPage = () => {
  const router = useRouter();

  return <>
    <Button className='p-2 rounded-md text-sm border bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white'
      onClick={() => router.push('/add')}>
      <div className='flex items-center gap-2'>
        <RiHeartAddLine />Send Kudos ✨</div>
    </Button>




  </>
};

export default UserPostPage;