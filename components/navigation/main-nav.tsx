"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Menu, Search, Settings, User, Upload, Brain, BookOpen, TrendingUp, Shield, X } from "lucide-react"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/atlas", label: "Atlas", icon: MapPin },
    { href: "/ingest", label: "Ingest", icon: Upload },
    { href: "/dss", label: "DSS", icon: Brain },
    { href: "/schemes", label: "Schemes", icon: BookOpen },
    { href: "/progress", label: "Progress", icon: TrendingUp },
    { href: "/admin", label: "Admin", icon: Shield },
  ]

  return (
    <header className="border-b bg-card px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">FRA Atlas</span>
          </Link>
          <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
            WebGIS v2.1
          </Badge>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button variant={isActive ? "default" : "ghost"} size="sm" className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center space-x-2">
          {/* Search - only show on atlas page */}
          {pathname === "/atlas" && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search parcels, villages..."
                className="pl-10 pr-4 py-2 w-64 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="w-full flex items-center space-x-2 justify-start"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
