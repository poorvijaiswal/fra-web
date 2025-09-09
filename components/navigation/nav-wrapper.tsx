"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { MainNav } from "./main-nav"

export function NavWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showNav = pathname !== "/" && pathname !== "/auth"

  return (
    <>
      {showNav && <MainNav />}
      {children}
    </>
  )
}
