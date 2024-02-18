import { Icons } from "@/components/icons"

export interface NavItem {
  icon: keyof typeof Icons;
  label: string;
  items?: (NavItem & { href: string })[];
}

export interface SidebarNavItem extends NavItem {}
