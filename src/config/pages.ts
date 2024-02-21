import { SidebarNavItem } from "@/types/nav"

interface pagesConfig {
  sidebarNav: SidebarNavItem[]
}

export const pages: pagesConfig = {
  sidebarNav: [
    {
      label: "Culinary",
      icon: 'burger',
      items: [
        {
          label: "Categories",
          href: "/culinary/categories",
          icon: 'lemon'
        },
        {
          label: "Food Types",
          href: "/culinary/food-types",
          icon: 'lemon'
        },
      ],
    },
  ],
}