"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Save, Play, CheckCircle, AlertCircle } from "lucide-react"

interface SchemeRuleEditorProps {
  scheme: any
  onClose: () => void
}

export function SchemeRuleEditor({ scheme, onClose }: SchemeRuleEditorProps) {
  const [ruleJson, setRuleJson] = useState(JSON.stringify(scheme.ruleJson, null, 2))
  const [validationError, setValidationError] = useState("")
  const [testResults, setTestResults] = useState<any>(null)
  const [isTesting, setIsTesting] = useState(false)

  const validateRule = () => {
    try {
      const parsed = JSON.parse(ruleJson)

      // Basic validation
      if (!parsed.schemeCode || !parsed.if || !parsed.then) {
        throw new Error("Rule must have schemeCode, if, and then properties")
      }

      setValidationError("")
      return true
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Invalid JSON")
      return false
    }
  }

  const testRule = async () => {
    if (!validateRule()) return

    setIsTesting(true)

    // Simulate testing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockResults = {
      totalTested: 150,
      eligible: 89,
      likely: 34,
      notEligible: 27,
      examples: [
        { name: "Ramesh Kumar", village: "Khapa", status: "ELIGIBLE", score: 0.92 },
        { name: "Sunita Devi", village: "Barghat", status: "LIKELY", score: 0.74 },
        { name: "Mohan Singh", village: "Lakhnadon", status: "NOT_ELIGIBLE", score: 0.23 },
      ],
    }

    setTestResults(mockResults)
    setIsTesting(false)
  }

  const saveRule = () => {
    if (validateRule()) {
      // Mock save functionality
      console.log("Saving rule for scheme:", scheme.code)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{scheme.name} - Rule Editor</CardTitle>
              <p className="text-sm text-muted-foreground">{scheme.code}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor">Rule Editor</TabsTrigger>
              <TabsTrigger value="test">Test Results</TabsTrigger>
              <TabsTrigger value="help">Help & Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Rule JSON</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={testRule}
                        disabled={isTesting}
                        className="bg-transparent"
                      >
                        {isTesting ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary mr-2"></div>
                            Testing...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-3 w-3" />
                            Test Rule
                          </>
                        )}
                      </Button>
                      <Button size="sm" onClick={saveRule}>
                        <Save className="mr-2 h-3 w-3" />
                        Save
                      </Button>
                    </div>
                  </div>

                  <Textarea
                    value={ruleJson}
                    onChange={(e) => {
                      setRuleJson(e.target.value)
                      setValidationError("")
                    }}
                    className="font-mono text-sm min-h-96"
                    placeholder="Enter rule JSON..."
                  />

                  {validationError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700">{validationError}</span>
                    </div>
                  )}

                  {!validationError && ruleJson && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">Valid JSON structure</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test" className="p-6">
              {testResults ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold">{testResults.totalTested}</div>
                        <div className="text-sm text-muted-foreground">Total Tested</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{testResults.eligible}</div>
                        <div className="text-sm text-muted-foreground">Eligible</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{testResults.likely}</div>
                        <div className="text-sm text-muted-foreground">Likely</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">{testResults.notEligible}</div>
                        <div className="text-sm text-muted-foreground">Not Eligible</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Sample Results</h4>
                    <div className="space-y-2">
                      {testResults.examples.map((example: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium">{example.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({example.village})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={
                                example.status === "ELIGIBLE"
                                  ? "bg-green-100 text-green-800"
                                  : example.status === "LIKELY"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                              }
                              variant="secondary"
                            >
                              {example.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{(example.score * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-semibold mb-2">No Test Results</h3>
                  <p className="text-sm">Run a test to see how the rule performs on sample data.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="help" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Rule Structure</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm font-mono">{`{
  "schemeCode": "SCHEME_CODE",
  "if": [
    { "fact": "fieldName", "op": "=", "value": "expectedValue" }
  ],
  "boosts": [
    { "when": { "fact": "field", "op": ">", "value": 1.0 }, "score": 0.1 }
  ],
  "then": { "eligible": true, "priority": "HIGH" }
}`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Supported Operators</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Comparison:</strong>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>= (equals)</li>
                        <li>!= (not equals)</li>
                        <li>&lt; (less than)</li>
                        <li>&gt; (greater than)</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Arrays:</strong>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>in (value in array)</li>
                        <li>notIn (value not in array)</li>
                        <li>intersects (geojson)</li>
                        <li>withinKm (distance)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
