"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Eye, ArrowLeft, ArrowRight } from "lucide-react"

interface OCRStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function OCRStep({ data, onUpdate, onNext, onPrev }: OCRStepProps) {
  const [processing, setProcessing] = useState(true)
  const [progress, setProgress] = useState(0)
  const [ocrResults, setOcrResults] = useState<any[]>([])
  const [selectedFile, setSelectedFile] = useState(0)

  useEffect(() => {
    // Simulate OCR processing
    const processFiles = async () => {
      const files = data.files || []
      const results = []

      for (let i = 0; i < files.length; i++) {
        setProgress(((i + 1) / files.length) * 100)

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock OCR results
        const mockOCRText = `
FOREST RIGHTS ACT, 2006
INDIVIDUAL FOREST RIGHTS CLAIM

Name: ${i === 0 ? "Ramesh Kumar" : i === 1 ? "Sunita Devi" : "Gond Community"}
Father's Name: ${i === 0 ? "Suresh Kumar" : i === 1 ? "Ram Singh" : "N/A"}
Village: ${i === 0 ? "Khapa" : i === 1 ? "Barghat" : "Lakhnadon"}
District: Seoni
State: Madhya Pradesh
Tribal Group: ${i === 0 ? "Gond" : i === 1 ? "Baiga" : "Gond"}

Claim Type: ${i === 0 ? "Individual Forest Rights (IFR)" : i === 1 ? "Community Rights (CR)" : "Community Forest Rights (CFR)"}
Area Claimed: ${i === 0 ? "1.6 hectares" : i === 1 ? "2.3 hectares" : "45.2 hectares"}
Survey Number: ${i === 0 ? "S-123/2" : i === 1 ? "S-456/1" : "S-789/3"}

Status: ${i === 0 ? "Approved" : i === 1 ? "Pending" : "Approved"}
Date of Claim: ${i === 0 ? "15/03/2023" : i === 1 ? "22/07/2023" : "10/01/2023"}
        `.trim()

        results.push({
          fileName: files[i].name,
          text: mockOCRText,
          confidence: 0.92 + Math.random() * 0.06,
          blocks: [
            { text: "FOREST RIGHTS ACT, 2006", confidence: 0.98, bbox: [100, 50, 400, 80] },
            {
              text: `Name: ${i === 0 ? "Ramesh Kumar" : i === 1 ? "Sunita Devi" : "Gond Community"}`,
              confidence: 0.95,
              bbox: [50, 120, 300, 140],
            },
            {
              text: `Village: ${i === 0 ? "Khapa" : i === 1 ? "Barghat" : "Lakhnadon"}`,
              confidence: 0.93,
              bbox: [50, 160, 250, 180],
            },
          ],
        })
      }

      setOcrResults(results)
      setProcessing(false)
      onUpdate({ ocrResults: results })
    }

    processFiles()
  }, [data.files, onUpdate])

  const handleNext = () => {
    onNext()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            OCR Text Extraction
          </CardTitle>
        </CardHeader>
        <CardContent>
          {processing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="font-semibold mb-2">Processing Documents...</h3>
              <p className="text-muted-foreground mb-4">Extracting text using AI-powered OCR</p>
              <Progress value={progress} className="max-w-md mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Extraction Complete</h3>
                <Badge variant="secondary">
                  {ocrResults.length} file{ocrResults.length !== 1 ? "s" : ""} processed
                </Badge>
              </div>

              {ocrResults.length > 1 && (
                <div className="flex space-x-2">
                  {ocrResults.map((result, index) => (
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

              {ocrResults[selectedFile] && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Extracted Text</h4>
                      <Badge variant="secondary">
                        {Math.round(ocrResults[selectedFile].confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap font-mono">{ocrResults[selectedFile].text}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Document Preview</h4>
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Document preview with text overlay</p>
                      <p className="text-sm text-muted-foreground mt-2">{ocrResults[selectedFile].fileName}</p>
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
          Next: Entity Recognition
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
