'use client'

import Link from "next/link";
import React from "react";
import SigninButton from "./SigninButton";
import { FaBars } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { useState } from 'react'
import Image from 'next/image';
import { Dialog, Popover } from '@headlessui/react'
import { useSession } from "next-auth/react";

const AppBar = () => {
  const { data: sessionData, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const adminMenu = () => {
    if (sessionData?.user.role === 'ADMIN' || status === 'authenticated') {
      return (<Link
        href={{ pathname: "/admin/organisations" }}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">
        Admin Dashboard
      </Link>)
    }
  }

  return (
    <>
      <header className="bg-white">
        <nav className="flex items-center justify-between py-6 px-10" aria-label="Global">
          <div className="flex justify-between">
            <Link href="/">
              <Image src="/logo.png" width={160} height={100} alt="Appreciate ya logo" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12 items-center">
            <Link
              href={{ pathname: "/UserPost" }}
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">
              Posts
            </Link>
            {(sessionData?.user?.role === 'ADMIN' && status === 'authenticated') && (
              <Link href="/admin/users" passHref>
                <p className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">User Management</p>
              </Link>
            )}
            <SigninButton />
          </Popover.Group>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-3/4 overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <MdClose className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="my-6 divide-y divide-gray-500/10">
                <div className="space-y-4 py-6">
                  <Link
                    href={{ pathname: "/UserPost" }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">
                    Posts
                  </Link>
                  {(sessionData?.user?.role === 'ADMIN' && status === 'authenticated') && (
                    <Link href="/admin/users" passHref>
                      <p className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50">User Management</p>
                    </Link>
                  )}
                  <SigninButton />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 mr-6 mb-6">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={120}
                  height={50}
                  alt="Your image"
                />
              </Link>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default AppBar;










