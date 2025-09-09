"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { useSearchParams, Suspense } from "next/navigation"
// <CHANGE> Added MainNav import for unified navigation
import { MainNav } from "@/components/navigation/main-nav"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* <CHANGE> Added conditional navigation - only show on app pages, not home/auth */}
      <Suspense fallback={null}>
        <ConditionalNav />
      </Suspense>
      {children}
      <Analytics />
    </>
  )
}

// <CHANGE> Added conditional navigation component
function ConditionalNav() {
  const searchParams = useSearchParams()
  const path = searchParams.get("pathname") || window.location.pathname
  const showNav = path !== "/" && path !== "/auth"

  if (showNav) {
    return (
      <div id="main-nav-placeholder">
        <MainNav />
      </div>
    )
  }

  return null
}
