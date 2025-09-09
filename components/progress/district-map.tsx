"use client"
import { Badge } from "@/components/ui/badge"

export function DistrictMap() {
  const districts = [
    { name: "Seoni", state: "MP", performance: "high", approvalRate: 72 },
    { name: "Balaghat", state: "MP", performance: "medium", approvalRate: 58 },
    { name: "Mandla", state: "MP", performance: "low", approvalRate: 45 },
    { name: "Dhalai", state: "TR", performance: "high", approvalRate: 78 },
    { name: "Khowai", state: "TR", performance: "medium", approvalRate: 62 },
    { name: "Mayurbhanj", state: "OD", performance: "medium", approvalRate: 55 },
    { name: "Keonjhar", state: "OD", performance: "low", approvalRate: 42 },
    { name: "Adilabad", state: "TG", performance: "high", approvalRate: 75 },
  ]

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-orange-500"
      case "low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground mb-2">District Performance Choropleth</div>
          <div className="text-sm text-muted-foreground">Interactive map visualization</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span>High (&gt;70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500"></div>
          <span>Medium (50-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span>Low (&lt;50%)</span>
        </div>
      </div>

      {/* District List */}
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {districts.map((district) => (
          <div
            key={`${district.name}-${district.state}`}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded ${getPerformanceColor(district.performance)}`}></div>
              <span className="font-medium text-sm">{district.name}</span>
              <Badge variant="secondary" className="text-xs">
                {district.state}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{district.approvalRate}%</span>
              <Badge className={getPerformanceBadge(district.performance)} variant="secondary">
                {district.performance}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
