"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Lock, Menu } from "lucide-react";
import { DefaultSession, Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthComponents = () => {
  const { data } = useSession();
  const user: DefaultSession["user"] & {
    role?: string;
  } = {
    ...data?.user,
  };

  return (
    <div className="h-full flex flex-col gap-3 justify-between">
      <div className="flex flex-col gap-2">
        {user.role === "admin" && (
          <Link
            href={"/admin"}
            className="flex gap-2 items-end text-slate-400 hover:text-slate-500 transition-all duration-300"
          >
            <Lock className="w-4 h-full" />
            <span className="w-full h-full">Admin</span>
          </Link>
        )}
      </div>
      <Button
        className="w-full text-primary bg-secondary hover:bg-secondary/80 transition-all duration-300"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </div>
  );
};

const ProfileSheet = () => {
  const { status } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="">
          <Menu className="w-5 h-5 text-secondary" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary border-none sm:w-[300px]">
        <div className="mt-8 pb-6 h-full">
          {status === "authenticated" ? (
            <AuthComponents />
          ) : (
            <Link
              href={"/login"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full text-primary bg-secondary hover:bg-secondary/80 transition-all duration-300"
              )}
            >
              Login
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
