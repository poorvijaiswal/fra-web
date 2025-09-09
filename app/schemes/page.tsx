"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Plus } from "lucide-react"
import Link from "next/link"

import { SchemeCard } from "@/components/schemes/scheme-card"
import { SchemeRuleEditor } from "@/components/schemes/scheme-rule-editor"
import { mockSchemes } from "@/data/mock-schemes"

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedScheme, setSelectedScheme] = useState<any>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const filteredSchemes = mockSchemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const openEditor = (scheme: any) => {
    setSelectedScheme(scheme)
    setIsEditorOpen(true)
  }

  const closeEditor = () => {
    setIsEditorOpen(false)
    setSelectedScheme(null)
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Title Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dss" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to DSS</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Schemes Management</h1>
                <p className="text-muted-foreground">Configure eligibility rules and test schemes</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Scheme
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Badge variant="secondary">{filteredSchemes.length} schemes</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} onEdit={() => openEditor(scheme)} />
          ))}
        </div>

        {/* Rule Editor Modal */}
        {isEditorOpen && selectedScheme && <SchemeRuleEditor scheme={selectedScheme} onClose={closeEditor} />}
      </div>
    </div>
  )
}
