"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Target, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

interface SpatialMatchStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function SpatialMatchStep({ data, onUpdate, onNext, onPrev }: SpatialMatchStepProps) {
  const [selectedFile, setSelectedFile] = useState(0)
  const [spatialMatches, setSpatialMatches] = useState<any[]>([])
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    // Simulate spatial matching process
    const performSpatialMatching = async () => {
      if (!data.fieldMappings) return

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const matches = data.fieldMappings.map((mapping: any, index: number) => ({
        fileName: mapping.fileName,
        fields: mapping.fields,
        suggestedLocation: {
          coordinates: index === 0 ? [79.9629, 22.2587] : index === 1 ? [79.9829, 22.2787] : [79.9429, 22.2387],
          confidence: 0.85 + Math.random() * 0.1,
          matchType: "Village Name Match",
          existingParcel: index < 2 ? `PAR_MP_00${index + 1}` : null,
        },
        polygon: [
          [79.962 + index * 0.02, 22.258 + index * 0.02],
          [79.964 + index * 0.02, 22.258 + index * 0.02],
          [79.964 + index * 0.02, 22.2595 + index * 0.02],
          [79.962 + index * 0.02, 22.2595 + index * 0.02],
          [79.962 + index * 0.02, 22.258 + index * 0.02],
        ],
      }))

      setSpatialMatches(matches)
      setProcessing(false)
    }

    performSpatialMatching()
  }, [data.fieldMappings])

  const handleNext = () => {
    onUpdate({ spatialMatches })
    onNext()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Spatial Matching & Geotagging
          </CardTitle>
        </CardHeader>
        <CardContent>
          {processing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="font-semibold mb-2">Finding Spatial Matches...</h3>
              <p className="text-muted-foreground">Matching parcels to geographic locations</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Spatial Matching Complete</h3>
                <Badge variant="secondary">
                  {spatialMatches.length} location{spatialMatches.length !== 1 ? "s" : ""} matched
                </Badge>
              </div>

              {spatialMatches.length > 1 && (
                <div className="flex space-x-2">
                  {spatialMatches.map((match, index) => (
                    <Button
                      key={index}
                      variant={selectedFile === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFile(index)}
                      className={selectedFile !== index ? "bg-transparent" : ""}
                    >
                      {match.fileName}
                    </Button>
                  ))}
                </div>
              )}

              {spatialMatches[selectedFile] && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Match Details</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Location Found</p>
                          <p className="text-sm text-green-700">
                            {spatialMatches[selectedFile].suggestedLocation.matchType}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Confidence:</span>
                          <Badge variant="secondary">
                            {Math.round(spatialMatches[selectedFile].suggestedLocation.confidence * 100)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Coordinates:</span>
                          <span className="text-sm font-mono">
                            {spatialMatches[selectedFile].suggestedLocation.coordinates[1].toFixed(4)},{" "}
                            {spatialMatches[selectedFile].suggestedLocation.coordinates[0].toFixed(4)}
                          </span>
                        </div>
                        {spatialMatches[selectedFile].suggestedLocation.existingParcel && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Existing Parcel:</span>
                            <span className="text-sm font-medium">
                              {spatialMatches[selectedFile].suggestedLocation.existingParcel}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t">
                        <h5 className="font-medium mb-2">Extracted Information</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span>{spatialMatches[selectedFile].fields.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Village:</span>
                            <span>{spatialMatches[selectedFile].fields.village}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Area:</span>
                            <span>{spatialMatches[selectedFile].fields.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Location Preview</h4>
                    <div className="bg-muted rounded-lg p-8 text-center min-h-64 flex flex-col justify-center">
                      <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">Interactive Map Preview</p>
                      <p className="text-sm text-muted-foreground">Parcel boundary and location markers</p>
                      <div className="mt-4 space-y-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Adjust Boundary
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Draw New Polygon
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={processing}>
          Next: Review & Publish
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
