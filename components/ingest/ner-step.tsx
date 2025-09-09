"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, User, MapPin, Calendar, ArrowLeft, ArrowRight } from "lucide-react"

interface NERStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function NERStep({ data, onUpdate, onNext, onPrev }: NERStepProps) {
  const [processing, setProcessing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [nerResults, setNerResults] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState(0)

  useEffect(() => {
    // Simulate NER processing
    const processNER = async () => {
      const ocrResults = data.ocrResults || []
      const results = []

      for (let i = 0; i < ocrResults.length; i++) {
        setProgress(((i + 1) / ocrResults.length) * 100)

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock NER results
        const entities = {
          PERSON: [
            {
              text: i === 0 ? "Ramesh Kumar" : i === 1 ? "Sunita Devi" : "Gond Community",
              confidence: 0.95,
              start: 45,
              end: 57,
            },
            { text: i === 0 ? "Suresh Kumar" : i === 1 ? "Ram Singh" : "", confidence: 0.88, start: 75, end: 87 },
          ].filter((e) => e.text),
          LOCATION: [
            { text: i === 0 ? "Khapa" : i === 1 ? "Barghat" : "Lakhnadon", confidence: 0.92, start: 120, end: 125 },
            { text: "Seoni", confidence: 0.94, start: 140, end: 145 },
            { text: "Madhya Pradesh", confidence: 0.96, start: 160, end: 174 },
          ],
          ORGANIZATION: [
            { text: i === 0 ? "Gond" : i === 1 ? "Baiga" : "Gond", confidence: 0.89, start: 190, end: 194 },
          ],
          AREA: [
            {
              text: i === 0 ? "1.6 hectares" : i === 1 ? "2.3 hectares" : "45.2 hectares",
              confidence: 0.91,
              start: 250,
              end: 262,
            },
          ],
          DATE: [
            {
              text: i === 0 ? "15/03/2023" : i === 1 ? "22/07/2023" : "10/01/2023",
              confidence: 0.93,
              start: 300,
              end: 310,
            },
          ],
          CLAIM_TYPE: [{ text: i === 0 ? "IFR" : i === 1 ? "CR" : "CFR", confidence: 0.87, start: 220, end: 223 }],
          STATUS: [
            { text: i === 0 ? "Approved" : i === 1 ? "Pending" : "Approved", confidence: 0.9, start: 280, end: 288 },
          ],
        }

        results.push({
          fileName: ocrResults[i].fileName,
          entities,
          extractedFields: {
            name: entities.PERSON[0]?.text || "",
            fatherName: entities.PERSON[1]?.text || "",
            village: entities.LOCATION[0]?.text || "",
            district: entities.LOCATION[1]?.text || "",
            state: entities.LOCATION[2]?.text || "",
            tribalGroup: entities.ORGANIZATION[0]?.text || "",
            area: entities.AREA[0]?.text || "",
            claimType: entities.CLAIM_TYPE[0]?.text || "",
            status: entities.STATUS[0]?.text || "",
            date: entities.DATE[0]?.text || "",
          },
        })
      }

      setNerResults(results)
      setProcessing(false)
      onUpdate({ nerResults: results })
    }

    if (data.ocrResults) {
      processNER()
    }
  }, [data.ocrResults, onUpdate])

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "PERSON":
        return User
      case "LOCATION":
        return MapPin
      case "DATE":
        return Calendar
      default:
        return Brain
    }
  }

  const getEntityColor = (entityType: string) => {
    switch (entityType) {
      case "PERSON":
        return "bg-blue-100 text-blue-800"
      case "LOCATION":
        return "bg-green-100 text-green-800"
      case "ORGANIZATION":
        return "bg-purple-100 text-purple-800"
      case "AREA":
        return "bg-orange-100 text-orange-800"
      case "DATE":
        return "bg-red-100 text-red-800"
      case "CLAIM_TYPE":
        return "bg-indigo-100 text-indigo-800"
      case "STATUS":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Named Entity Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          {processing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="font-semibold mb-2">Identifying Entities...</h3>
              <p className="text-muted-foreground mb-4">Extracting names, places, dates, and other key information</p>
              <Progress value={progress} className="max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Entity Extraction Complete</h3>
                <Badge variant="secondary">
                  {nerResults.length} file{nerResults.length !== 1 ? "s" : ""} processed
                </Badge>
              </div>

              {nerResults.length > 1 && (
                <div className="flex space-x-2">
                  {nerResults.map((result, index) => (
                    <Button
                      key={index}
                      variant={selectedFile === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFile(index)}
                      className={selectedFile !== index ? "bg-transparent" : ""}
                    >
                      {result.fileName}
                    </Button>
                  ))}
                </div>
              )}

              {nerResults[selectedFile] && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Detected Entities</h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {Object.entries(nerResults[selectedFile].entities).map(
                        ([entityType, entities]: [string, any]) => {
                          if (!entities.length) return null
                          const IconComponent = getEntityIcon(entityType)
                          return (
                            <div key={entityType} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                <span className="font-medium text-sm">{entityType.replace("_", " ")}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 ml-6">
                                {entities.map((entity: any, index: number) => (
                                  <Badge key={index} className={getEntityColor(entityType)} variant="secondary">
                                    {entity.text}
                                    <span className="ml-1 text-xs opacity-75">
                                      {Math.round(entity.confidence * 100)}%
                                    </span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )
                        },
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Extracted Fields</h4>
                    <div className="space-y-3">
                      {Object.entries(nerResults[selectedFile].extractedFields).map(([field, value]: [string, any]) => (
                        <div key={field} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-sm">{value || "Not detected"}</span>
                        </div>
                      ))}
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
        <Button onClick={onNext} disabled={processing}>
          Next: Field Mapping
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
