"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft, Upload, FileCheck } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReviewStepProps {
  data: any
  onUpdate: (data: any) => void
  onPrev: () => void
}

export function ReviewStep({ data, onUpdate, onPrev }: ReviewStepProps) {
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const router = useRouter()

  const handlePublish = async () => {
    setPublishing(true)

    // Simulate publishing process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setPublishing(false)
    setPublished(true)
    onUpdate({ isComplete: true })

    // Redirect to atlas after a delay
    setTimeout(() => {
      router.push("/atlas")
    }, 2000)
  }

  if (published) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold mb-2">Published Successfully!</h2>
          <p className="text-muted-foreground mb-4">Parcel data is now live on the Atlas and available for analysis.</p>
          <Badge variant="secondary" className="mb-4">
            {data.spatialMatches?.length || 0} parcel{(data.spatialMatches?.length || 0) !== 1 ? "s" : ""} added
          </Badge>
          <p className="text-sm text-muted-foreground">Redirecting to Atlas...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Review & Publish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to Publish</h3>
              <p className="text-muted-foreground">Review the processed data before publishing to the Atlas</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{data.files?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Documents Processed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{data.spatialMatches?.length || 0}</div>
                  <div className="text-sm text-muted-foreground">Parcels Matched</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {data.spatialMatches?.reduce(
                      (acc: number, match: any) => acc + (match.suggestedLocation?.confidence > 0.8 ? 1 : 0),
                      0,
                    ) || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">High Confidence</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Review */}
            {data.spatialMatches && (
              <div className="space-y-4">
                <h4 className="font-medium">Parcel Details</h4>
                {data.spatialMatches.map((match: any, index: number) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-medium">{match.fields.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {match.fields.village}, {match.fields.district}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{match.fields.claimType}</Badge>
                        <Badge
                          className={
                            match.fields.status === "APPROVED"
                              ? "bg-green-100 text-green-800"
                              : match.fields.status === "PENDING"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                          }
                          variant="secondary"
                        >
                          {match.fields.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Area:</span>
                        <p className="font-medium">{match.fields.area}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tribal Group:</span>
                        <p className="font-medium">{match.fields.tribalGroup}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Match Confidence:</span>
                        <p className="font-medium">{Math.round(match.suggestedLocation.confidence * 100)}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <p className="font-medium">{match.fields.date}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Parcel data will be added to the Atlas database</li>
                <li>• Geographic boundaries will be indexed for spatial queries</li>
                <li>• Documents will be linked to parcel records</li>
                <li>• Data will be available for DSS analysis and recommendations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={publishing} className="bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handlePublish} disabled={publishing}>
          {publishing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Publishing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Publish to Atlas
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
