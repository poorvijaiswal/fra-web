"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Play, Users, Target } from "lucide-react"

interface SchemeCardProps {
  scheme: any
  onEdit: () => void
}

export function SchemeCard({ scheme, onEdit }: SchemeCardProps) {
  const getSchemeIcon = (code: string) => {
    switch (code) {
      case "PM_KISAN":
        return "🌾"
      case "JAL_JEEVAN":
        return "💧"
      case "MGNREGA":
        return "🏗️"
      case "DAJGUA":
        return "🏘️"
      default:
        return "📋"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "DRAFT":
        return "bg-orange-100 text-orange-800"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getSchemeIcon(scheme.code)}</div>
            <div>
              <CardTitle className="text-lg">{scheme.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{scheme.code}</p>
            </div>
          </div>
          <Badge className={getStatusColor(scheme.status)} variant="secondary">
            {scheme.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{scheme.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{scheme.eligibleCount || 0} eligible</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{scheme.ruleComplexity || "Simple"}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1 bg-transparent">
            <Edit className="mr-2 h-3 w-3" />
            Edit Rules
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Play className="mr-2 h-3 w-3" />
            Test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
