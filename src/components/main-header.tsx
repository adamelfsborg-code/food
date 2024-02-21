"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "./main-nav"
import { TUserTableSchema } from "@/lib/schema/user"
import AuthSheet from "./auth/sheet"
import { Logout } from "./auth/logout"

type MainHeaderProps = {
  session: TUserTableSchema | undefined
}

export function MainHeader(props: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center mx-4">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-x-2">
            {props.session ? (
              <>
                <div>
                  <h4 className="text-sm font-medium leading-none">{props.session.name}</h4>
                </div>
                <Logout />
              </>
            ) : (
              <>
                <AuthSheet open={!props.session} />
              </>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}