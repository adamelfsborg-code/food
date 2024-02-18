import { SidebarNavItem } from "@/types/nav"

interface pagesConfig {
  sidebarNav: SidebarNavItem[]
}

export const pages: pagesConfig = {
  sidebarNav: [
    {
      label: "Profile",
      icon: 'user',
      items: [
        {
          label: "Settings",
          href: "/settings",
          icon: 'gear'
        },
      ],
    },
  ],
}