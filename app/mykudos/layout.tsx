"use client";
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/ui/Loading";
import { Status } from "@/lib/types/types";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === Status.LOADING) {
    return <Loading />;
  }

  if (status === Status.UNAUTHENTICATED) {
    router.push("/");
  }

  const getDefaultTab = () => {
    if (pathname?.endsWith("/received")) {
      return "received";
    } else if (pathname?.endsWith("/sent")) {
      return "sent";
    } else {
      return "sent";
    }
  };

  return (
    <div className="px-12 py-12 pt-12 flex flex-col gap-4 justify-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-extrabold flex text-3xl text-gray-900 justify-center">
          My Kudos
        </h2>
      </div>
      <div>
        <Tabs
          defaultValue={getDefaultTab()}
          className="w-full flex justify-center"
        >
          <TabsList>
            <TabsTrigger
              value="received"
              onClick={() => router.push("/mykudos/received")}
            >
              📥 Received
            </TabsTrigger>
            <TabsTrigger
              value="sent"
              onClick={() => router.push("/mykudos/sent")}
            >
              📬 Sent
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
