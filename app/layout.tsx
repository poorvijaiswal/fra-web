import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { NavWrapper } from "@/components/navigation/nav-wrapper"

export const metadata: Metadata = {
  title: "FRA Atlas - Forest Rights Act Monitoring System",
  description: "AI-powered WebGIS system for monitoring Forest Rights Act implementation across India",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* Wrapped children with NavWrapper and Suspense for conditional navigation */}
        <Suspense fallback={<div>Loading...</div>}>
          <NavWrapper>{children}</NavWrapper>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
