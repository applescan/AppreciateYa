"use client";

import React, { useState } from "react";
import SigninButton from "../SigninButton";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { Dialog, Popover } from "@headlessui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { capitalizeEachWord, getInitials } from "@/helpers/helpers";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "@/graphql/queries";
import { useRouter } from "next/navigation";
import { Status } from "@/lib/types/types";

const AppBar = () => {
  const { data: sessionData, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { id: userId, image } = sessionData?.user || {};
  const router = useRouter();
  const { data: userData } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    skip: !userId,
  });
  const profileImg = userData?.user?.image || image;

  return (
    <>
      <header className="bg-white shadow-md">
        <nav
          className="flex items-center justify-between py-6 px-6 lg:px-16"
          aria-label="Global"
        >
          <div className="flex justify-between items-center">
            {status === Status.AUTHENTICATED ? (
              <div
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer transition-transform transform hover:scale-105"
              >
                <Image
                  src="/logo.png"
                  width={160}
                  height={100}
                  alt="Appreciate ya logo"
                />
              </div>
            ) : (
              <div onClick={() => router.push("/")} className="cursor-pointer">
                <Image
                  src="/logo.png"
                  width={160}
                  height={100}
                  alt="Appreciate ya logo"
                />
              </div>
            )}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-gray-900 transition"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
            {status === Status.AUTHENTICATED && (
              <div
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-md transition"
              >
                Dashboard
              </div>
            )}
            {sessionData?.user?.role === "ADMIN" &&
              status === Status.AUTHENTICATED && (
                <div
                  onClick={() => router.push("/admin/users")}
                  className="cursor-pointer px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-md transition"
                >
                  User Management
                </div>
              )}
            {status === Status.AUTHENTICATED && (
              <div
                onClick={() => router.push("/mykudos/received")}
                className="cursor-pointer px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-md transition"
              >
                My Kudos
              </div>
            )}
            <SigninButton />
          </Popover.Group>
        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10 bg-black/30" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-3/4 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl rounded-l-xl">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <MdClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div>
              <div className="pb-2">
                {status === Status.AUTHENTICATED && (
                  <div className="flex flex-col gap-2 cursor-pointer">
                    <button
                      className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                      onClick={() => router.push("/profile")}
                    >
                      <Avatar>
                        <AvatarImage src={profileImg} />
                        <AvatarFallback>
                          {sessionData?.user.name
                            ? getInitials(sessionData?.user.name)
                            : "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-gray-800 font-semibold">
                        {capitalizeEachWord(sessionData?.user.name)}
                      </p>
                    </button>
                    <hr />
                  </div>
                )}
              </div>

              <div className="flex flex-col pt-2">
                {status === Status.AUTHENTICATED && (
                  <p
                    onClick={() => router.push("/dashboard")}
                    className="cursor-pointer block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </p>
                )}
                {sessionData?.user?.role === "ADMIN" &&
                  status === Status.AUTHENTICATED && (
                    <div
                      onClick={() => router.push("/admin/users")}
                      className="cursor-pointer"
                    >
                      <p className="block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">
                        User Management
                      </p>
                    </div>
                  )}
                {status === Status.AUTHENTICATED && (
                  <div
                    onClick={() => router.push("/mykudos/received")}
                    className="cursor-pointer"
                  >
                    <p className="block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">
                      My Kudos
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-0 mr-6 mt-6">
              {status === Status.AUTHENTICATED ? (
                <button
                  onClick={() => signOut()}
                  className="text-red-600 text-left font-semibold cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="text-green-600 ml-auto font-semibold cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default AppBar;
