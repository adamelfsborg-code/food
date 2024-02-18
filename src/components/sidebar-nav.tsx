"use client";

import React, { useEffect, useState } from "react";
import { Icons, getIcon } from "./icons";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { pages } from "@/config/pages";

const SidebarNav = () => {
  return (
    <div className="mx-4 my-4">
      <ul className="flex flex-col gap-y-2">
        {pages.sidebarNav.map((item) => (
          <SideBarItem key={item.label} {...item} />
        ))}
      </ul>
    </div>
  );
};

type SideBarItemProps = {
  icon: keyof typeof Icons;
  label: string;
  items?: (SideBarItemProps & { href: string })[];
};

const SideBarItem = (props: SideBarItemProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.items) {
      const item = props.items.filter((item) => item.href === pathname)
      if (item.length > 0) return setOpen(true);
    }
  }, [pathname, props.items])
  return (
    <li>
      <button
        className="w-full flex items-center justify-between rounded-lg px-2 py-2 hover:bg-zinc-900 hover:text-foreground text-foreground/60 transition ease-in-out delay-150 "
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-x-2">
          {getIcon(props.icon, { className: "w-4 h-4" })}
          {props.label}
        </div>
        {open ? (
          <Icons.chevronUp className="w-4 h-4" />
        ) : (
          <Icons.chevronDown className="w-4 h-4" />
        )}
      </button>
      {open && props.items && (
        <ul
          className={`pl-5 transition-all mt-2 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {props.items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center mb-2 justify-between rounded-lg px-2 py-2 hover:bg-zinc-900 hover:text-foreground text-foreground/60 ${item.href === pathname ? 'bg-zinc-900 text-foreground' : 'text-foreground/60' } `}
              >
                <div className="flex items-center gap-x-2">
                  {getIcon(item.icon, { className: "w-4 h-4" })}
                  {item.label}
                </div>
                <Badge>{Math.floor(Math.random() * 20)}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarNav;
