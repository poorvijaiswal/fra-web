"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function StateCards() {
  const states = [
    {
      code: "MP",
      name: "Madhya Pradesh",
      totalClaims: 12450,
      approved: 8100,
      pending: 3200,
      rejected: 1150,
      approvalRate: 65.1,
      trend: "up",
      trendValue: 2.3,
      color: "bg-green-100 text-green-800",
    },
    {
      code: "TR",
      name: "Tripura",
      totalClaims: 3200,
      approved: 2240,
      pending: 780,
      rejected: 180,
      approvalRate: 70.0,
      trend: "up",
      trendValue: 5.2,
      color: "bg-blue-100 text-blue-800",
    },
    {
      code: "OD",
      name: "Odisha",
      totalClaims: 8900,
      approved: 5340,
      pending: 2890,
      rejected: 670,
      approvalRate: 60.0,
      trend: "down",
      trendValue: -1.8,
      color: "bg-purple-100 text-purple-800",
    },
    {
      code: "TG",
      name: "Telangana",
      totalClaims: 6750,
      approved: 4665,
      pending: 1685,
      rejected: 400,
      approvalRate: 69.1,
      trend: "stable",
      trendValue: 0.1,
      color: "bg-orange-100 text-orange-800",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {states.map((state) => (
        <Card key={state.code} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{state.name}</CardTitle>
              <Badge className={state.color} variant="secondary">
                {state.code}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Claims</span>
                <span className="font-medium">{state.totalClaims.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Approved</span>
                <span className="font-medium text-green-600">{state.approved.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium text-orange-600">{state.pending.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rejected</span>
                <span className="font-medium text-red-600">{state.rejected.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Approval Rate</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(state.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(state.trend)}`}>
                    {state.trendValue > 0 ? "+" : ""}
                    {state.trendValue}%
                  </span>
                </div>
              </div>
              <Progress value={state.approvalRate} className="h-2" />
              <div className="text-right text-sm font-medium">{state.approvalRate}%</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
