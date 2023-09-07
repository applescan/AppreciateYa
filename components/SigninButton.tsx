"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard"
import { capitalizeEachWord, getInitials } from "@/helpers/helpers";


const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {session.user.name ? getInitials(session.user.name) : 'NA'}
                </AvatarFallback>

              </Avatar>
              <p className="text-gray-800 font-normal">{capitalizeEachWord(session.user.name)}</p>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <button onClick={() => signOut()} className="text-red-600">
                  Sign Out
                </button>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-gray-900">
                    Company name ltd.
                  </span>
                </div>
              </div>
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





