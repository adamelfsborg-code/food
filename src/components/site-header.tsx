"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "./main-nav"
import { RegisterSheet } from "./register-sheet"
import { LoginSheet } from "./login-sheet"
import { Logout } from "./logout"
import { TSessionSchema } from "@/lib/schema/session"

type SiteHeaderProps = {
  session: TSessionSchema | undefined
}

export function SiteHeader(props: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-x-2">
            {props.session?.user ? (
              <>
                <div>
                  <h4 className="text-sm font-medium leading-none">{props.session.user.name}</h4>
                </div>
                <Logout />
              </>
            ) : (
              <>
                <RegisterSheet />
                <LoginSheet />
              </>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}