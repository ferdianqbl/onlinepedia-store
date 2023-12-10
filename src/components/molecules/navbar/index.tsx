import Link from "next/link";
import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";
import ButtonLogout from "./button-logout";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-black">
      <nav className="container mx-auto py-4 flex items-center justify-between">
        <ul className="flex items-center gap-8 text-white">
          <li className="">Home</li>
          <li className="">About</li>
        </ul>
        {session?.user ? (
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
