"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";
import { capitalizeEachWord, getInitials } from "@/helpers/helpers";
import { useQuery } from '@apollo/client';
import { GET_ORG_NAME_BY_IDS } from "@/graphql/queries";
import { GET_USER_BY_ID } from '@/graphql/queries';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { Skeleton } from "./ui/Skeleton";
import { useRouter } from 'next/navigation'

const SigninButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Destructure here for cleaner code
  const { orgId, id: userId, image } = session?.user || {};

  const { data: orgData, loading } = useQuery(GET_ORG_NAME_BY_IDS, {
    skip: !orgId,
    variables: { id: orgId },
  });

  const orgName = orgData?.organization?.name || 'No Organisation data';

  // Fetch user data based on their ID using GET_USER_BY_ID query
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId
  });

  const profileImg = userData?.user?.image || image;

  if (status === "loading") {
    return <div className="flex items-center space-x-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>;
  }

  if (loading) {
    return <div className="flex items-center space-x-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>;
  }

  if (session && session.user) {
    return (
      <>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profileImg} />
                <AvatarFallback>
                  {session.user.name ? getInitials(session.user.name) : 'NA'}
                </AvatarFallback>
              </Avatar>
              <p className="text-gray-800 font-normal">{capitalizeEachWord(session.user.name)}</p>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-52 flex flex-col text-left">
            <div className="flex flex-col gap-1">
              <button onClick={() => router.push('/profile')} className="text-gray-900 text-left font-normal">
                Profile
              </button>
              <button onClick={() => signOut()} className="text-red-600 text-left font-normal">
                Sign Out
              </button>
            </div>
            <div className="flex items-center pt-2">
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <HiOutlineOfficeBuilding /> {orgName}
              </span>
            </div>
          </HoverCardContent>
        </HoverCard>
      </>
    );
  }

  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  );
};

export default SigninButton;
