'use client'

import { BackgroundBeams } from "@/components/aceternity/bgBeams";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  const { isLoading, error, user, } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if( user) {
    redirect('/chat')
  }

  return (

    <div className="min-h-screen w-full rounded-md bg-neutral-950 absolute flex flex-col items-center justify-center antialiased">

      <div className="max-w-2xl mx-auto p-4">

        <div className="z-10 flex relative">
          {!!user && (
            <>
              <Link href="/api/auth/logout">
                <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                  Logout
                </button>
              </Link>
            </>
          )}

          {!user && (
            <>
              <Link href="/api/auth/login" className="mx-1">
                <button className=" px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                  Login
                </button>
              </Link>

              <Link href="/api/auth/signup" className="mx-1">
                <button className="px-8  py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}