"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit3, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

interface FieldMappingStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function FieldMappingStep({ data, onUpdate, onNext, onPrev }: FieldMappingStepProps) {
  const [selectedFile, setSelectedFile] = useState(0)
  const [fieldMappings, setFieldMappings] = useState<any[]>([])

  useEffect(() => {
    if (data.nerResults) {
      const mappings = data.nerResults.map((result: any) => ({
        fileName: result.fileName,
        fields: { ...result.extractedFields },
      }))
      setFieldMappings(mappings)
    }
  }, [data.nerResults])

  const updateField = (fileIndex: number, fieldName: string, value: string) => {
    setFieldMappings((prev) =>
      prev.map((mapping, index) =>
        index === fileIndex ? { ...mapping, fields: { ...mapping.fields, [fieldName]: value } } : mapping,
      ),
    )
  }

  const handleNext = () => {
    onUpdate({ fieldMappings })
    onNext()
  }

  const fieldLabels = {
    name: "Patta Holder Name",
    fatherName: "Father's Name",
    village: "Village",
    district: "District",
    state: "State",
    tribalGroup: "Tribal Group",
    area: "Area (hectares)",
    claimType: "Claim Type",
    status: "Status",
    date: "Date of Claim",
  }

  const claimTypeOptions = ["IFR", "CR", "CFR"]
  const statusOptions = ["APPROVED", "PENDING", "REJECTED", "FILED"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Field Mapping & Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Review and Edit Extracted Fields</h3>
              <Badge variant="secondary">
                {fieldMappings.length} file{fieldMappings.length !== 1 ? "s" : ""} to process
              </Badge>
            </div>

            {fieldMappings.length > 1 && (
              <div className="flex space-x-2">
                {fieldMappings.map((mapping, index) => (
                  <Button
                    key={index}
                    variant={selectedFile === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFile(index)}
                    className={selectedFile !== index ? "bg-transparent" : ""}
                  >
                    {mapping.fileName}
                  </Button>
                ))}
              </div>
            )}

            {fieldMappings[selectedFile] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(fieldLabels).map(([fieldKey, fieldLabel]) => (
                  <div key={fieldKey} className="space-y-2">
                    <Label htmlFor={fieldKey}>{fieldLabel}</Label>
                    {fieldKey === "claimType" ? (
                      <Select
                        value={fieldMappings[selectedFile].fields[fieldKey] || ""}
                        onValueChange={(value) => updateField(selectedFile, fieldKey, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select claim type" />
                        </SelectTrigger>
                        <SelectContent>
                          {claimTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : fieldKey === "status" ? (
                      <Select
                        value={fieldMappings[selectedFile].fields[fieldKey] || ""}
                        onValueChange={(value) => updateField(selectedFile, fieldKey, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={fieldKey}
                        value={fieldMappings[selectedFile].fields[fieldKey] || ""}
                        onChange={(e) => updateField(selectedFile, fieldKey, e.target.value)}
                        placeholder={`Enter ${fieldLabel.toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Validation Status</span>
              </div>
              <p className="text-sm text-green-700">
                All required fields have been extracted and are ready for spatial matching.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          Next: Spatial Matching
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
