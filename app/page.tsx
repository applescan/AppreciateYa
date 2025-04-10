"use client";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/Footer";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      parallaxScroll();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxScroll = () => {
    const scrolled = window.scrollY;
    const applyScrollEffect = (selector: string, factor: number, base = 0) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("style", `top: ${base - scrolled * factor}px`);
      }
    };

    applyScrollEffect(".layer-1", 0.25);
    applyScrollEffect(".layer-2", 0.5);
    applyScrollEffect(".layer-3", 0.75);
    applyScrollEffect(".icon-1", 0.8, 400);
    applyScrollEffect(".icon-2", 0.6, 200);
    applyScrollEffect(".icon-4", 0.5, 600);
    applyScrollEffect(".icon-5", 0.7, 600);
    applyScrollEffect(".icon-8", 0.2, 200);
    applyScrollEffect(".icon-9", 0.4, 200);
  };

  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: `url("/bg-5.gif")`,
        height: "90vh",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <div>
        <div className="background flex justify-center items-center h-screen">
          <h1
            className="lg:w-[50%] md:w-[75%] sm:w-[70%] text-center font-bold text-white
            bg-white/80 backdrop-brightness-70
            lg:text-6xl md:text-5xl sm:text-3xl px-10 py-8 rounded-3xl shadow-2xl animate-fade-in mx-10
            ring-2 ring-pink-200"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Together, Let's Build a Happier, More Connected Workspace!
            </span>
          </h1>
        </div>
        <div className="content">
          <div
            className="text-gray-700 font-semibold text-base flex flex-col gap-6 text h-[700px] my-auto justify-center"
            style={{
              backgroundImage: 'url("/header.jpg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "700px",
            }}
          >
            <h2 className="text-4xl">Ignite a Chain of Positivity 🔥</h2>
            <p>
              Your words have power! A simple "Thank You" or "Great Job" can
              boost morale, enhance productivity, and create an environment
              where everyone feels valued and motivated.
            </p>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl">Why Wait to Make Someone's Day?</h2>
              <p>
                Start by sending your first appreciation message today. Let's
                build a culture of gratitude together!
              </p>
              <Button
                className="rounded-md text-sm border w-fit bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white"
                onClick={() => router.push("/add")}
              >
                ✨ Send a Kudo Now ✨
              </Button>
            </div>
          </div>
          <Image
            className="icon-1 icons"
            src="/chat.png"
            alt="icon"
            width={1000}
            height={500}
          />
          <Image
            className="icon-2 icons"
            src="/like.png"
            alt="icon"
            width={1000}
            height={500}
          />
          <Image
            className="icon-4 icons"
            src="/you-are-the-best.png"
            alt="icon"
            width={1000}
            height={500}
          />
          <Image
            className="icon-5 icons"
            src="/medal.png"
            alt="icon"
            width={1000}
            height={1000}
          />
          <Image
            className="icon-8 icons"
            src="/smiling-face.png"
            alt="icon"
            width={1000}
            height={500}
          />
          <Image
            className="icon-9 icons"
            src="/win.png"
            alt="icon"
            width={1000}
            height={500}
          />
          <div
            className="w-full"
            style={{
              backgroundImage: 'url("/header-2.png")',
              backgroundRepeat: "repeat",
              height: "400px",
              backgroundSize: "cover",
            }}
          ></div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
