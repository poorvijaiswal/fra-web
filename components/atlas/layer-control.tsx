"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Layers, Eye, EyeOff } from "lucide-react"

export function LayerControl() {
  const [layers, setLayers] = useState({
    ifrParcels: true,
    crCfrBoundaries: true,
    claimsStatus: false,
    landUse: false,
    assets: true,
    waterIndex: false,
    infrastructure: false,
  })

  const toggleLayer = (layerId: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerId]: !prev[layerId] }))
  }

  const layerConfig = [
    { id: "ifrParcels", label: "IFR Parcels", color: "bg-green-500" },
    { id: "crCfrBoundaries", label: "CR/CFR Boundaries", color: "bg-blue-500" },
    { id: "claimsStatus", label: "Claims Status", color: "bg-orange-500" },
    { id: "landUse", label: "Land Use", color: "bg-purple-500" },
    { id: "assets", label: "Assets", color: "bg-red-500" },
    { id: "waterIndex", label: "Water Index", color: "bg-cyan-500" },
    { id: "infrastructure", label: "Infrastructure", color: "bg-gray-500" },
  ]

  return (
    <Card className="border-0 rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Map Layers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {layerConfig.map((layer) => (
          <div key={layer.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded ${layer.color}`}></div>
              <span className="text-sm">{layer.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {layers[layer.id as keyof typeof layers] ? (
                <Eye className="h-3 w-3 text-muted-foreground" />
              ) : (
                <EyeOff className="h-3 w-3 text-muted-foreground" />
              )}
              <Switch
                checked={layers[layer.id as keyof typeof layers]}
                onCheckedChange={() => toggleLayer(layer.id as keyof typeof layers)}
                size="sm"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
