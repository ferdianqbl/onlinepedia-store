"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut } from "lucide-react";
import { SideNav } from "./side-nav";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { NavItems } from "@/lib/constants/side-nav";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [clicked, setClicked] = useState(false);

  const handleToggle = () => {
    setClicked(true);
    toggle();
    setTimeout(() => setClicked(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen md:block bg-primary p-4 pt-6`,
        clicked && "duration-500",
        isOpen ? "w-64" : "w-[78px]",
        className
      )}
    >
      <SideNav
        className="opacity-0 transition-all duration-300 group-hover:z-50 group-hover:p-8 group-hover:opacity-100"
        items={NavItems}
      />
      <div className="absolute bottom-5 left-0 right-0 w-full px-3">
        <div
          className={`${
            isOpen ? "flex items-center justify-between gap-1" : "block"
          }`}
        >
          <Button
            variant={"link"}
            onClick={handleToggle}
            className={cn("w-fit bg-transparent", isOpen && "rotate-180")}
          >
            <ChevronRight className="h-4 w-4 text-secondary" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
