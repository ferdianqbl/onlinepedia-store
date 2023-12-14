"use client";
import Link from "next/link";
import ButtonLogout from "./button-logout";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();
  return (
    <div className="bg-black">
      <nav className="container px-4 sm:px-0 mx-auto py-4 flex items-center justify-between">
        <ul className="flex items-center gap-8 text-white">
          <li className="">Home</li>
          <li className="">About</li>
        </ul>
        {status === "authenticated" ? (
          <ButtonLogout />
        ) : (
          <Link href={"/login"} className="text-white">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
