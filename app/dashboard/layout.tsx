"use client";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";

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
    router.push("/");
  }

  return (
    <div className="px-12 py-12 flex flex-col gap-6 justify-center">
      <div>
        <h2 className="font-extrabold flex justify-center text-3xl text-gray-900">
          Dashboard
        </h2>
      </div>

      <main>
        {React.cloneElement(children as React.ReactElement, { sessionData })}
      </main>
    </div>
  );
};

export default Layout;
