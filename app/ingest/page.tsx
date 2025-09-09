"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, MapPin, CheckCircle } from "lucide-react"

import { UploadStep } from "@/components/ingest/upload-step"
import { OCRStep } from "@/components/ingest/ocr-step"
import { NERStep } from "@/components/ingest/ner-step"
import { FieldMappingStep } from "@/components/ingest/field-mapping-step"
import { SpatialMatchStep } from "@/components/ingest/spatial-match-step"
import { ReviewStep } from "@/components/ingest/review-step"

const steps = [
  { id: 1, name: "Upload", icon: Upload, description: "Upload FRA documents" },
  { id: 2, name: "OCR", icon: FileText, description: "Extract text content" },
  { id: 3, name: "NER", icon: FileText, description: "Identify entities" },
  { id: 4, name: "Field Mapping", icon: FileText, description: "Map extracted fields" },
  { id: 5, name: "Spatial Match", icon: MapPin, description: "Geotag parcels" },
  { id: 6, name: "Review", icon: CheckCircle, description: "Review & publish" },
]

export default function IngestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState({
    files: [] as File[],
    ocrText: "",
    nerResults: {},
    fieldMapping: {},
    spatialData: {},
    isComplete: false,
  })

  const updateWizardData = (stepData: any) => {
    setWizardData((prev) => ({ ...prev, ...stepData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UploadStep data={wizardData} onUpdate={updateWizardData} onNext={nextStep} />
      case 2:
        return <OCRStep data={wizardData} onUpdate={updateWizardData} onNext={nextStep} onPrev={prevStep} />
      case 3:
        return <NERStep data={wizardData} onUpdate={updateWizardData} onNext={nextStep} onPrev={prevStep} />
      case 4:
        return <FieldMappingStep data={wizardData} onUpdate={updateWizardData} onNext={nextStep} onPrev={prevStep} />
      case 5:
        return <SpatialMatchStep data={wizardData} onUpdate={updateWizardData} onNext={nextStep} onPrev={prevStep} />
      case 6:
        return <ReviewStep data={wizardData} onUpdate={updateWizardData} onPrev={prevStep} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Data Ingestion Wizard</h1>
              <p className="text-muted-foreground">Process FRA documents for the atlas</p>
            </div>
            <Badge variant="secondary">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Processing Progress</CardTitle>
            <Progress value={(currentStep / steps.length) * 100} className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center space-y-2 ${
                    step.id <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
                      step.id < currentStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : step.id === currentStep
                          ? "border-primary bg-primary/10"
                          : "border-muted-foreground/30"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {renderStep()}
      </div>
    </div>
  )
}
