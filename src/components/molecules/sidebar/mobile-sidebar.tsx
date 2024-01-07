"use client";
import { useState, useEffect } from "react";
import { LogOut, MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "./side-nav";
import { NavItems } from "@/lib/constants/side-nav";
import { Button } from "@/components/ui/button";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2">
            <MenuIcon className="h-5 w-5 text-primary-400" />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="xsm:max-w-[18rem] w-full">
          <div className="py-4 flex flex-col justify-between h-screen">
            <SideNav items={NavItems} setOpen={setOpen} />
            <Button
              variant="ghost"
              className="w-full justify-start mb-10 ring-offset-0 rounded-full hover:bg-primary-100 duration-200 text-primary-500 hover:text-primary-500 text-base flex gap-3"
            >
              <LogOut className="h-5 w-5" /> Keluar
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
