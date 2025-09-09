"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, FileText, Droplets, TreePine, Home, X } from "lucide-react"
import type { Parcel } from "@/data/mock-parcels"

interface ParcelDrawerProps {
  parcel: Parcel | null
  onClose: () => void
}

export function ParcelDrawer({ parcel, onClose }: ParcelDrawerProps) {
  if (!parcel) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-orange-100 text-orange-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "IFR":
        return "bg-blue-100 text-blue-800"
      case "CR":
        return "bg-purple-100 text-purple-800"
      case "CFR":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "POND":
        return Droplets
      case "FOREST":
        return TreePine
      case "HOMESTEAD":
        return Home
      default:
        return MapPin
    }
  }

  return (
    <div className="absolute top-0 right-0 w-96 h-full bg-card border-l shadow-lg z-20 overflow-y-auto">
      <Card className="h-full border-0 rounded-none">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{parcel.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{parcel.id}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2">
            <Badge className={getTypeColor(parcel.type)} variant="secondary">
              {parcel.type}
            </Badge>
            <Badge className={getStatusColor(parcel.status)} variant="secondary">
              {parcel.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Village:</span>
                  <p className="font-medium">{parcel.village}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">District:</span>
                  <p className="font-medium">{parcel.district}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Area:</span>
                  <p className="font-medium">{parcel.area} ha</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tribal Group:</span>
                  <p className="font-medium">{parcel.tribalGroup || "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Water Index:</span>
                  <p className="font-medium">{parcel.waterIndex || "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Land Use:</span>
                  <p className="font-medium">{parcel.landUse || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Coordinates</h4>
                <p className="text-sm text-muted-foreground">
                  {parcel.coordinates[1].toFixed(4)}, {parcel.coordinates[0].toFixed(4)}
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  View on Map
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <FileText className="h-3 w-3 mr-1" />
                  Generate Report
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="p-4 space-y-3">
              {parcel.assets && parcel.assets.length > 0 ? (
                parcel.assets.map((asset) => {
                  const IconComponent = getAssetIcon(asset.type)
                  return (
                    <Card key={asset.id} className="p-3">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{asset.type}</h4>
                          <p className="text-xs text-muted-foreground">
                            Confidence: {(asset.confidence * 100).toFixed(0)}%
                          </p>
                          {asset.area && <p className="text-xs text-muted-foreground">Area: {asset.area} ha</p>}
                        </div>
                      </div>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <TreePine className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No assets detected</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="documents" className="p-4">
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No documents available</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Upload Documents
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
