import Navbar from "@/components/molecules/navbar";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center flex-col h-screen gap-3">
        <Image
          alt="user-image"
          width={100}
          height={100}
          src={session?.user?.image || ""}
          className="rounded-full"
        />
        <p>
          Hello, {session?.user?.name} with {session?.user?.email}
        </p>
      </div>
    </>
  );
}
