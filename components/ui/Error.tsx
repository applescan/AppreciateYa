'use client'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation';

export default function ErrorPage() {

    const router = useRouter();

    return (
        <div style={{
        
            height: "60vh",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
        }} className='flex items-center px-24'>
            <div className='w-1/2 flex justify-center flex-col items-center gap-6'>
                <img src={"/error.png"} alt={"error"} height={300} width={500} className="object-cover mb-4" />
                <Button onClick={() => router.push('/')} className='text-md'>Return Home</Button>
            </div>
            <div className='w-1/2 flex flex-col pl-10'>
                <h2 className='font-extrabold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 pb-5'>Something is wrong...</h2>
                <p className='text-2xl	font-bold'>Sorry about that!</p>
                <p className='text-2xl	font-bold'>(Please visit our homepage to get to where you need to go)</p>
            </div>

        </div>
    )
}