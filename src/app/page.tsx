"use client";
import Navbar from "@/components/molecules/navbar";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  // const session = await getServerSession(authOptions);
  const session = useSession();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center flex-col h-screen gap-3">
        <Image
          alt="user-image"
          width={100}
          height={100}
          src={session?.data?.user?.image || ""}
          className="rounded-full"
        />
        <p>
          Hello, {session?.data?.user?.name} with {session?.data?.user?.email}
        </p>
      </div>
    </>
  );
}
