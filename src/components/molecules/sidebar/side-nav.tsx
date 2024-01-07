"use client";
import Link from "next/link";

import { type NavItem } from "@/lib/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { Button, buttonVariants } from "@/components/ui/button";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./subnav-accordion";
import { ChevronDown } from "lucide-react";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <nav className="space-y-2">
      {items.map((item) =>
        item.isChildren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
                )}
              >
                <div>
                  <item.icon className={cn("h-5 w-5", item.color)} />
                </div>
                <div
                  className={cn(
                    "absolute left-12 text-base duration-200",
                    !isOpen && className
                  )}
                >
                  {item.title}
                </div>

                {isOpen && (
                  <ChevronDown className="h-4 w-4 shrink-0 text-secondary transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="ml-4 mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex h-12 justify-start gap-x-3",
                      path === child.href &&
                        "bg-secondary font-bold hover:bg-secondary"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", child.color)} />
                    <div
                      className={cn(
                        "text-base duration-200",
                        !isOpen && className
                      )}
                    >
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : item.type === "button" ? (
          <Button
            key={item.title}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            variant={"ghost"}
            className={cn(
              "group relative flex h-12 justify-start rounded-full w-full text-accent",
              path === item.href &&
                "bg-accent font-bold text-primary hover:text-accent-foreground",
              item.title === "Keluar" && "hidden md:inline-flex"
            )}
          >
            <item.icon className={cn("h-5 w-5 duration-200", item.color)} />
            <span
              className={cn(
                "absolute left-12 text-base duration-200",
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Button>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start rounded-full w-full text-accent",
              path === item.href &&
                "bg-accent font-bold text-primary hover:text-accent-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5 duration-200", item.color)} />
            <span
              className={cn(
                "absolute left-12 text-base duration-200 text-primary-500",
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      )}
    </nav>
  );
}
