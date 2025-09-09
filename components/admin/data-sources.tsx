"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Database, RefreshCw, Settings, AlertCircle } from "lucide-react"

export function DataSources() {
  const [dataSources, setDataSources] = useState([
    {
      id: "supabase_main",
      name: "Supabase Main Database",
      type: "PostgreSQL",
      status: "connected",
      enabled: true,
      lastSync: "2 minutes ago",
      health: 98,
    },
    {
      id: "osm_tiles",
      name: "OpenStreetMap Tiles",
      type: "Raster Tiles",
      status: "connected",
      enabled: true,
      lastSync: "Live",
      health: 100,
    },
    {
      id: "satellite_imagery",
      name: "Satellite Imagery",
      type: "Raster Tiles",
      status: "connected",
      enabled: false,
      lastSync: "1 hour ago",
      health: 85,
    },
    {
      id: "survey_data",
      name: "Survey Department Data",
      type: "API",
      status: "error",
      enabled: true,
      lastSync: "Failed",
      health: 0,
    },
  ])

  const [layers, setLayers] = useState([
    { id: "ifr_parcels", name: "IFR Parcels", enabled: true, visible: true },
    { id: "cr_cfr_boundaries", name: "CR/CFR Boundaries", enabled: true, visible: true },
    { id: "claims_status", name: "Claims Status", enabled: true, visible: false },
    { id: "land_use", name: "Land Use", enabled: false, visible: false },
    { id: "assets", name: "Assets", enabled: true, visible: true },
    { id: "water_index", name: "Water Index", enabled: false, visible: false },
    { id: "infrastructure", name: "Infrastructure", enabled: false, visible: false },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "syncing":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600"
    if (health >= 70) return "text-orange-600"
    return "text-red-600"
  }

  const toggleLayer = (layerId: string, field: "enabled" | "visible") => {
    setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, [field]: !layer[field] } : layer)))
  }

  return (
    <div className="space-y-6">
      {/* Data Sources */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Data Sources</h3>
          <Button size="sm" variant="outline" className="bg-transparent">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dataSources.map((source) => (
            <div key={source.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{source.name}</h4>
                    <p className="text-sm text-muted-foreground">{source.type}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(source.status)} variant="secondary">
                  {source.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enabled</span>
                  <Switch checked={source.enabled} />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Health</span>
                    <span className={getHealthColor(source.health)}>{source.health}%</span>
                  </div>
                  <Progress value={source.health} className="h-2" />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Sync</span>
                  <span>{source.lastSync}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Settings className="mr-2 h-3 w-3" />
                    Configure
                  </Button>
                  {source.status === "error" && (
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <AlertCircle className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layer Management */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Map Layers</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 border-b">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium">
              <div>Layer Name</div>
              <div>Enabled</div>
              <div>Visible by Default</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="divide-y">
            {layers.map((layer) => (
              <div key={layer.id} className="p-3">
                <div className="grid grid-cols-4 gap-4 items-center text-sm">
                  <div className="font-medium">{layer.name}</div>
                  <div>
                    <Switch checked={layer.enabled} onCheckedChange={() => toggleLayer(layer.id, "enabled")} />
                  </div>
                  <div>
                    <Switch
                      checked={layer.visible}
                      onCheckedChange={() => toggleLayer(layer.id, "visible")}
                      disabled={!layer.enabled}
                    />
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
