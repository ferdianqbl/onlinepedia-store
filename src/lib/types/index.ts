import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  type: "link" | "button";
  color?: string;
  isChildren?: boolean;
  children?: NavItem[];
}
