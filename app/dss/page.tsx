"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Brain, Filter, Play, Download, FileText } from "lucide-react"
import Link from "next/link"

import { RecommendationsTable } from "@/components/dss/recommendations-table"
import { SegmentBuilder } from "@/components/dss/segment-builder"
import { mockSchemes } from "@/data/mock-schemes"

export default function DSSPage() {
  const [selectedRuleSet, setSelectedRuleSet] = useState("")
  const [segmentFilters, setSegmentFilters] = useState({
    state: "",
    district: "",
    claimType: "",
    status: "",
    waterIndex: "",
    tribalGroup: "",
  })
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [hasResults, setHasResults] = useState(false)

  const runDSS = async () => {
    setIsRunning(true)
    setProgress(0)
    setRecommendations([])

    // Simulate DSS processing
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Generate mock recommendations
    const mockRecommendations = [
      {
        id: "REC_001",
        pattaHolderId: "PH_MP_0001",
        pattaHolderName: "Ramesh Kumar",
        village: "Khapa",
        district: "Seoni",
        state: "Madhya Pradesh",
        recommendedSchemes: ["JAL_JEEVAN", "PM_KISAN"],
        priority: "HIGH",
        score: 0.89,
        rationale: [
          "Water index below threshold (0.28 < 0.4)",
          "Agricultural land use detected",
          "Approved IFR status",
          "Small farmer category (1.6 ha)",
        ],
        eligibilityDetails: {
          JAL_JEEVAN: {
            status: "ELIGIBLE",
            score: 0.92,
            conditions: ["No tap connection", "Rural area", "Water scarce"],
          },
          PM_KISAN: {
            status: "ELIGIBLE",
            score: 0.86,
            conditions: ["Small farmer", "Approved patta", "Bank details available"],
          },
        },
      },
      {
        id: "REC_002",
        pattaHolderId: "PH_MP_0002",
        pattaHolderName: "Sunita Devi",
        village: "Barghat",
        district: "Seoni",
        state: "Madhya Pradesh",
        recommendedSchemes: ["MGNREGA", "DAJGUA"],
        priority: "MEDIUM",
        score: 0.74,
        rationale: [
          "Pending claim status requires livelihood support",
          "Tribal group eligible for DAJGUA",
          "Mixed land use suitable for MGNREGA works",
        ],
        eligibilityDetails: {
          MGNREGA: {
            status: "LIKELY",
            score: 0.78,
            conditions: ["Rural household", "Seeking employment", "Valid documents"],
          },
          DAJGUA: {
            status: "ELIGIBLE",
            score: 0.91,
            conditions: ["ST category", "Notified area", "Income criteria met"],
          },
        },
      },
      {
        id: "REC_003",
        pattaHolderId: "PH_MP_0003",
        pattaHolderName: "Gond Community",
        village: "Lakhnadon",
        district: "Seoni",
        state: "Madhya Pradesh",
        recommendedSchemes: ["FOREST_CONSERVATION", "COMMUNITY_DEVELOPMENT"],
        priority: "HIGH",
        score: 0.95,
        rationale: [
          "Large CFR area (45.2 ha) suitable for conservation",
          "High water index (0.62) indicates good forest health",
          "Community management structure in place",
        ],
        eligibilityDetails: {
          FOREST_CONSERVATION: {
            status: "ELIGIBLE",
            score: 0.96,
            conditions: ["CFR rights", "Forest area", "Community consent"],
          },
          COMMUNITY_DEVELOPMENT: {
            status: "ELIGIBLE",
            score: 0.94,
            conditions: ["Tribal community", "Collective rights", "Development plan"],
          },
        },
      },
    ]

    setRecommendations(mockRecommendations)
    setIsRunning(false)
    setHasResults(true)
  }

  const exportResults = (format: "csv" | "geojson") => {
    // Mock export functionality
    const filename = `dss_recommendations_${new Date().toISOString().split("T")[0]}.${format}`
    console.log(`Exporting ${recommendations.length} recommendations as ${format} to ${filename}`)
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Decision Support System</h1>
              <p className="text-muted-foreground">Generate targeted scheme recommendations</p>
            </div>
            <Link href="/schemes">
              <Button variant="outline" className="bg-transparent">
                <Brain className="mr-2 h-4 w-4" />
                Manage Schemes
              </Button>
            </Link>
          </div>
        </div>

        {/* DSS Banner */}
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Prototype Logic</span>
          </div>
          <p className="text-sm text-orange-700">
            Verify with departments before rollout. Rules are illustrative and require validation with official
            eligibility criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Segment Builder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Target Segment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SegmentBuilder filters={segmentFilters} onFiltersChange={setSegmentFilters} />
              </CardContent>
            </Card>

            {/* Rule Set Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Rule Set</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ruleset">Select Rule Set</Label>
                  <Select value={selectedRuleSet} onValueChange={setSelectedRuleSet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose rule set" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Schemes</SelectItem>
                      <SelectItem value="livelihood">Livelihood Focus</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure Priority</SelectItem>
                      <SelectItem value="conservation">Conservation Focus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Included Schemes</Label>
                  <div className="flex flex-wrap gap-2">
                    {mockSchemes.slice(0, 4).map((scheme) => (
                      <Badge key={scheme.code} variant="secondary" className="text-xs">
                        {scheme.code}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button onClick={runDSS} disabled={isRunning || !selectedRuleSet} className="w-full">
                  {isRunning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Running DSS...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run DSS Analysis
                    </>
                  )}
                </Button>

                {isRunning && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-muted-foreground text-center">{progress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recommendations</CardTitle>
                  {hasResults && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportResults("csv")}
                        className="bg-transparent"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        CSV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportResults("geojson")}
                        className="bg-transparent"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        GeoJSON
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!hasResults && !isRunning ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-semibold mb-2">Ready to Generate Recommendations</h3>
                    <p className="text-sm">Configure your target segment and rule set, then run the DSS analysis.</p>
                  </div>
                ) : (
                  <RecommendationsTable recommendations={recommendations} isLoading={isRunning} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
