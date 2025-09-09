"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SegmentBuilderProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function SegmentBuilder({ filters, onFiltersChange }: SegmentBuilderProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilter = (key: string) => {
    onFiltersChange({ ...filters, [key]: "" })
  }

  const clearAllFilters = () => {
    const clearedFilters = Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
    onFiltersChange(clearedFilters)
  }

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "")

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="state">State</Label>
          <Select value={filters.state} onValueChange={(value) => updateFilter("state", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All states" />
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
          <Label htmlFor="district">District</Label>
          <Select value={filters.district} onValueChange={(value) => updateFilter("district", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seoni">Seoni</SelectItem>
              <SelectItem value="balaghat">Balaghat</SelectItem>
              <SelectItem value="mandla">Mandla</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="claimType">Claim Type</Label>
          <Select value={filters.claimType} onValueChange={(value) => updateFilter("claimType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IFR">Individual (IFR)</SelectItem>
              <SelectItem value="CR">Community (CR)</SelectItem>
              <SelectItem value="CFR">Community Forest (CFR)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="waterIndex">Water Index</Label>
          <Select value={filters.waterIndex} onValueChange={(value) => updateFilter("waterIndex", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All ranges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (&lt; 0.3)</SelectItem>
              <SelectItem value="medium">Medium (0.3 - 0.6)</SelectItem>
              <SelectItem value="high">High (&gt; 0.6)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tribalGroup">Tribal Group</Label>
          <Select value={filters.tribalGroup} onValueChange={(value) => updateFilter("tribalGroup", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gond">Gond</SelectItem>
              <SelectItem value="baiga">Baiga</SelectItem>
              <SelectItem value="korku">Korku</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Active Filters ({activeFilters.length})</Label>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(([key, value]) => (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {value}
                <Button variant="ghost" size="sm" className="ml-1 h-auto p-0" onClick={() => clearFilter(key)}>
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
