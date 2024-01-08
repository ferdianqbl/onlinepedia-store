import { Boxes, Group, LayoutDashboard, LogOut } from "lucide-react";
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
    title: "Users",
    icon: Group,
    href: "/admin/users",
    type: "link",
    color: "",
  },
  {
    type: "button",
    title: "Logout",
    icon: LogOut,
    href: "",
    color: "",
  },
];
