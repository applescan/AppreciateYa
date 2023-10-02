'use client'
import Image from 'next/image'
import { useEffect } from 'react';


export default function Home() {

  useEffect(() => {
    const handleScroll = () => {
      parallaxScroll();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxScroll = () => {
    const scrolled = window.scrollY;
    const applyScrollEffect = (selector: string, factor: number, base = 0) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('style', `top: ${base - (scrolled * factor)}px`);
      }
    }

    applyScrollEffect('.layer-1', 0.25);
    applyScrollEffect('.layer-2', 0.5);
    applyScrollEffect('.layer-3', 0.75);
    applyScrollEffect('.rock-1', 0.8, 400);
    applyScrollEffect('.rock-2', 0.6, 200);
    applyScrollEffect('.rock-3', 0.4, 500);
    applyScrollEffect('.rock-4', 0.5, 600);
    applyScrollEffect('.rock-5', 0.7, 600);
    applyScrollEffect('.rock-6', 0.7, 400);
    applyScrollEffect('.rock-7', 0.5, 600);
    applyScrollEffect('.rock-8', 0.2, 200);
    applyScrollEffect('.rock-9', 0.4, 200);
  };


  return (
    <div style={{
      backgroundImage: `url("/bg-5.gif")`,
      height: "80vh",
      backgroundRepeat: "repeat",
      backgroundSize: "cover",
    }}>

      <div className="container">
        <div className="background">
          <h1 className='text-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
            Show appreciation to the legends at your work!</h1>
        </div>
        <div className="content">
          <div className="text-black font-semibold text-base text">
            <p>In hac habitasse platea dictumst. Vivamus nec est et augue blandit aliquam quis non magna. Nunc velit nisi, porta ac libero in, porttitor placerat purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc ut posuere quam. Aenean in leo mattis, convallis dolor vel, tempor lectus.</p>
            <p>Elit nulla vulputate ex, sed porta est risus ac lorem. Duis sed blandit felis. In hac habitasse platea dictumst. Vivamus nec est et augue blandit aliquam quis non magna. Nunc velit nisi, porta ac libero in, porttitor placerat purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc ut posuere quam. Aenean in leo mattis, convallis dolor vel, tempor lectus.</p>
            <p>Duis sed blandit felis. Integer dictum, mi eget tristique semper, elit nulla vulputate ex, sed porta est risus ac lorem. In hac habitasse platea dictumst. Vivamus nec est et augue blandit aliquam quis non magna. Vestibulum ante ipsum primis.</p>
            <p>Integer dictum, mi eget tristique semper, elit nulla vulputate ex, sed porta est risus ac lorem. Duis sed blandit felis. In hac habitasse platea dictumst. Vivamus nec est et augue blandit aliquam quis non magna. Nunc velit nisi, porta ac libero in, porttitor placerat purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc ut posuere quam. Aenean in leo mattis, convallis dolor vel, tempor lectus.</p>
          </div>
          <Image className="rock-1 rocks" src="/chat.png" alt="rock" width={1000} height={500} />
          <Image className="rock-2 rocks" src="/like.png" alt="rock" width={1000} height={500} />
          <Image className="rock-3 rocks" src="/suitcase.png" alt="rock" width={1000} height={500} />
          <Image className="rock-4 rocks" src="/you-are-the-best.png" alt="rock" width={1000} height={500} />
          <Image className="rock-5 rocks" src="/medal.png" alt="rock" width={1000} height={500} />
          <Image className="rock-6 rocks" src="/one-hundred.png" alt="rock" width={1000} height={500} />
          <Image className="rock-7 rocks" src="/checklist.png" alt="rock" width={1000} height={500} />
          <Image className="rock-8 rocks" src="/smiling-face.png" alt="rock" width={1000} height={500} />
          <Image className="rock-9 rocks" src="/win.png" alt="rock" width={1000} height={500} />
          <div className="rock"></div>
        </div>

      </div>
    </div>);
}
