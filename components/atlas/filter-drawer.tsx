"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

export function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    claimType: "",
    status: "",
  })

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "")

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-20 right-4 z-20 bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
        {activeFilters.length > 0 && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {activeFilters.length}
          </Badge>
        )}
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-0 right-0 w-80 h-full bg-card border-l shadow-lg z-10">
          <Card className="h-full border-0 rounded-none">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div>
                <label className="text-sm font-medium mb-2 block">State</label>
                <Select
                  value={filters.state}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, state: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MP">Madhya Pradesh</SelectItem>
                    <SelectItem value="TR">Tripura</SelectItem>
                    <SelectItem value="OD">Odisha</SelectItem>
                    <SelectItem value="TG">Telangana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">District</label>
                <Select
                  value={filters.district}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, district: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoni">Seoni</SelectItem>
                    <SelectItem value="balaghat">Balaghat</SelectItem>
                    <SelectItem value="mandla">Mandla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Claim Type</label>
                <Select
                  value={filters.claimType}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, claimType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IFR">Individual (IFR)</SelectItem>
                    <SelectItem value="CR">Community (CR)</SelectItem>
                    <SelectItem value="CFR">Community Forest (CFR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="FILED">Filed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeFilters.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Active Filters</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilters({ state: "", district: "", claimType: "", status: "" })}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map(([key, value]) => (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}: {value}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => setFilters((prev) => ({ ...prev, [key]: "" }))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
