"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown, AlertTriangle } from "lucide-react"

export function BottlenecksTable() {
  const [sortBy, setSortBy] = useState("pendency")
  const [filterState, setFilterState] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const bottlenecks = [
    {
      district: "Mandla",
      state: "MP",
      pendingClaims: 450,
      avgProcessingDays: 78,
      pendencyRate: 68.2,
      issues: ["Staff shortage", "Document verification delays"],
      severity: "high",
    },
    {
      district: "Keonjhar",
      state: "OD",
      pendingClaims: 380,
      avgProcessingDays: 65,
      pendencyRate: 58.0,
      issues: ["Survey pending", "Land disputes"],
      severity: "high",
    },
    {
      district: "Balaghat",
      state: "MP",
      pendingClaims: 320,
      avgProcessingDays: 52,
      pendencyRate: 42.0,
      issues: ["Technical delays", "Committee meetings"],
      severity: "medium",
    },
    {
      district: "Khowai",
      state: "TR",
      pendingClaims: 180,
      avgProcessingDays: 48,
      pendencyRate: 38.0,
      issues: ["Verification pending"],
      severity: "medium",
    },
    {
      district: "Warangal",
      state: "TG",
      pendingClaims: 150,
      avgProcessingDays: 35,
      pendencyRate: 25.0,
      issues: ["Minor documentation"],
      severity: "low",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "low":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const filteredBottlenecks = bottlenecks
    .filter((item) => (filterState !== "all" ? item.state === filterState : true))
    .filter((item) => item.district.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search districts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterState} onValueChange={setFilterState}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All states" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            <SelectItem value="MP">Madhya Pradesh</SelectItem>
            <SelectItem value="TR">Tripura</SelectItem>
            <SelectItem value="OD">Odisha</SelectItem>
            <SelectItem value="TG">Telangana</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="bg-transparent">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by {sortBy}
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-3 border-b">
          <div className="grid grid-cols-7 gap-4 text-sm font-medium">
            <div>District</div>
            <div>State</div>
            <div>Pending Claims</div>
            <div>Avg Processing</div>
            <div>Pendency Rate</div>
            <div>Issues</div>
            <div>Severity</div>
          </div>
        </div>
        <div className="divide-y">
          {filteredBottlenecks.map((item, index) => (
            <div key={index} className="p-3 hover:bg-muted/50 transition-colors">
              <div className="grid grid-cols-7 gap-4 items-center text-sm">
                <div className="font-medium">{item.district}</div>
                <div>
                  <Badge variant="secondary" className="text-xs">
                    {item.state}
                  </Badge>
                </div>
                <div className="font-medium">{item.pendingClaims}</div>
                <div>{item.avgProcessingDays} days</div>
                <div className="font-medium">{item.pendencyRate}%</div>
                <div className="space-y-1">
                  {item.issues.map((issue, i) => (
                    <div key={i} className="text-xs text-muted-foreground">
                      • {issue}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {getSeverityIcon(item.severity)}
                  <Badge className={getSeverityColor(item.severity)} variant="secondary">
                    {item.severity}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
