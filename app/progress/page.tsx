"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, AlertTriangle, Download } from "lucide-react"

import { StateCards } from "@/components/progress/state-cards"
import { TrendChart } from "@/components/progress/trend-chart"
import { BottlenecksTable } from "@/components/progress/bottlenecks-table"
import { DistrictMap } from "@/components/progress/district-map"

export default function ProgressPage() {
  const overallStats = {
    totalClaims: 31300,
    approved: 20345,
    pending: 8955,
    rejected: 2000,
    approvalRate: 65.0,
    avgProcessingDays: 45,
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">FRA Progress Dashboard</h1>
              <p className="text-muted-foreground">Monitor implementation across focus states</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary">Last updated: 2 hours ago</Badge>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                  <p className="text-2xl font-bold">{overallStats.totalClaims.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{overallStats.approved.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{overallStats.approvalRate}% approval rate</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{overallStats.pending.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{overallStats.avgProcessingDays} days avg</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{overallStats.rejected.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">6.4% rejection rate</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-bold">✗</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* State Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">State-wise Progress</h2>
          <StateCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Claim Status Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart />
            </CardContent>
          </Card>

          {/* District Map */}
          <Card>
            <CardHeader>
              <CardTitle>District Performance Map</CardTitle>
            </CardHeader>
            <CardContent>
              <DistrictMap />
            </CardContent>
          </Card>
        </div>

        {/* Bottlenecks Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Processing Bottlenecks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BottlenecksTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
