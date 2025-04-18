"use client";
import React, { ReactNode } from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Status } from "@/lib/types/types";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  if (status === Status.LOADING) {
    return <Loading />;
  }

  if (status === Status.UNAUTHENTICATED) {
    signIn();
  }

  return (
    <div className="px-14 pt-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div
          className="font-extrabold flex text-3xl text-gray-900 gap-4 items-center cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <FaArrowLeft className="text-pink-500" /> Choose Your Perfect Gift! ✨
        </div>
        <p className="flex">
          Choose your favorite card design. Don’t forget, you can add a personal
          touch to your gift with a message!
        </p>
      </div>
      <main>
        {React.cloneElement(children as React.ReactElement, { sessionData })}
      </main>
    </div>
  );
};

export default Layout;
