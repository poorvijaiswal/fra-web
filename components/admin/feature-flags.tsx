"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, Zap, TestTube, Users } from "lucide-react"

export function FeatureFlags() {
  const [features, setFeatures] = useState([
    {
      id: "ai_recommendations",
      name: "AI-Enhanced Recommendations",
      description: "Use machine learning to improve DSS recommendation accuracy",
      enabled: false,
      category: "AI/ML",
      rollout: 0,
      icon: Zap,
    },
    {
      id: "real_time_sync",
      name: "Real-time Data Synchronization",
      description: "Enable live updates from external data sources",
      enabled: true,
      category: "Performance",
      rollout: 100,
      icon: Zap,
    },
    {
      id: "advanced_analytics",
      name: "Advanced Analytics Dashboard",
      description: "Enhanced charts and predictive analytics features",
      enabled: false,
      category: "Analytics",
      rollout: 25,
      icon: TestTube,
    },
    {
      id: "mobile_app",
      name: "Mobile Application",
      description: "Field data collection mobile app for officers",
      enabled: false,
      category: "Mobile",
      rollout: 0,
      icon: TestTube,
    },
    {
      id: "bulk_operations",
      name: "Bulk Operations",
      description: "Process multiple claims and documents simultaneously",
      enabled: true,
      category: "Productivity",
      rollout: 75,
      icon: Users,
    },
    {
      id: "satellite_integration",
      name: "Satellite Imagery Integration",
      description: "Real-time satellite data for asset detection and monitoring",
      enabled: false,
      category: "Geospatial",
      rollout: 10,
      icon: TestTube,
    },
  ])

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((feature) => (feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature)),
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI/ML":
        return "bg-purple-100 text-purple-800"
      case "Performance":
        return "bg-green-100 text-green-800"
      case "Analytics":
        return "bg-blue-100 text-blue-800"
      case "Mobile":
        return "bg-orange-100 text-orange-800"
      case "Productivity":
        return "bg-indigo-100 text-indigo-800"
      case "Geospatial":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRolloutColor = (rollout: number) => {
    if (rollout === 0) return "text-gray-500"
    if (rollout < 50) return "text-orange-600"
    if (rollout < 100) return "text-blue-600"
    return "text-green-600"
  }

  const categories = [...new Set(features.map((f) => f.category))]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{features.length}</div>
            <div className="text-sm text-muted-foreground">Total Features</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{features.filter((f) => f.enabled).length}</div>
            <div className="text-sm text-muted-foreground">Enabled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{features.filter((f) => f.rollout > 0).length}</div>
            <div className="text-sm text-muted-foreground">In Rollout</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flags */}
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Flag className="h-5 w-5" />
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features
                .filter((feature) => feature.category === category)
                .map((feature) => {
                  const IconComponent = feature.icon
                  return (
                    <Card key={feature.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <CardTitle className="text-base">{feature.name}</CardTitle>
                              <Badge className={getCategoryColor(feature.category)} variant="secondary">
                                {feature.category}
                              </Badge>
                            </div>
                          </div>
                          <Switch checked={feature.enabled} onCheckedChange={() => toggleFeature(feature.id)} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Rollout</span>
                          <span className={`text-sm font-medium ${getRolloutColor(feature.rollout)}`}>
                            {feature.rollout}%
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Configure
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Metrics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
