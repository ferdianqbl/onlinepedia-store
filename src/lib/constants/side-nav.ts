import { Boxes, LayoutDashboard, LogOut } from "lucide-react";
import { type NavItem } from "@/lib/types";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    type: "link",
    color: "",
  },
  {
    title: "Products",
    icon: Boxes,
    href: "/admin/products",
    type: "link",
    color: "",
  },
  {
    type: "button",
    title: "Keluar",
    icon: LogOut,
    href: "",
    color: "",
  },
];
