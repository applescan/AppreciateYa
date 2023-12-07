'use client'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function NotFound() {

    const router = useRouter();

    return (
        <div style={{
            backgroundImage: `url("/404.png")`,
            height: "100%",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
        }} className='flex items-center px-24'>
            <div className='w-1/2 flex flex-col pl-10'>
                <h2 className='font-extrabold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 pb-5'>Hide & Seek Time!</h2>
                <p className='text-2xl	font-bold'>And you're it!</p>
                <p className='text-2xl	font-bold'>(Sorry, we can't find the page, too.)</p>
            </div>
            <div className='w-1/2 flex justify-center flex-col items-center gap-6'>
                <img src={"/404.1.png"} alt={"404"} height={300} width={600} className="object-cover mb-4" />
                <Button onClick={() => router.push('/')} className='text-md'>Return Home</Button>
            </div>
        </div>
    )
}