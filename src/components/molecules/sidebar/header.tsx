import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";

export default function Header() {
  return (
    <div className="block md:hidden fixed left-0 right-0 top-0 z-20 border-b bg-background/50 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link href={"/"} className="">
          <h1 className="text-lg font-semibold text-primary-400">Admin CAPD</h1>
        </Link>

        <MobileSidebar />
      </nav>
    </div>
  );
}
