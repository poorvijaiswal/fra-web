"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, MapPin, User, Award } from "lucide-react"

interface RecommendationsTableProps {
  recommendations: any[]
  isLoading: boolean
}

export function RecommendationsTable({ recommendations, isLoading }: RecommendationsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-orange-100 text-orange-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEligibilityColor = (status: string) => {
    switch (status) {
      case "ELIGIBLE":
        return "bg-green-100 text-green-800"
      case "LIKELY":
        return "bg-orange-100 text-orange-800"
      case "NOT_ELIGIBLE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No recommendations generated yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => toggleRow(rec.id)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="p-0">
                    {expandedRows.has(rec.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{rec.pattaHolderName}</span>
                      <Badge className={getPriorityColor(rec.priority)} variant="secondary">
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>
                        {rec.village}, {rec.district}
                      </span>
                      <span>•</span>
                      <span>Score: {(rec.score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {rec.recommendedSchemes.map((scheme: string) => (
                    <Badge key={scheme} variant="outline" className="text-xs">
                      {scheme}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {expandedRows.has(rec.id) && (
              <div className="border-t bg-muted/30 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Rationale
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {rec.rationale.map((reason: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Eligibility Details</h4>
                    <div className="space-y-3">
                      {Object.entries(rec.eligibilityDetails).map(([scheme, details]: [string, any]) => (
                        <div key={scheme} className="p-3 border rounded-lg bg-background">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{scheme}</span>
                            <div className="flex items-center gap-2">
                              <Badge className={getEligibilityColor(details.status)} variant="secondary">
                                {details.status}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{(details.score * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{details.conditions.join(" • ")}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
