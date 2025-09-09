"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Crosshair, Ruler, Eye, EyeOff } from "lucide-react"

// Mock data for FRA parcels with polygon boundaries
const mockParcels = [
  {
    id: "PH_MP_0001",
    name: "Ramesh Kumar",
    type: "IFR",
    status: "APPROVED",
    coordinates: [79.9629, 22.2587], // Center point
    area: 1.6,
    village: "Khapa",
    district: "Seoni",
    boundary: [
      [79.962, 22.258],
      [79.9638, 22.258],
      [79.9638, 22.2594],
      [79.962, 22.2594],
      [79.962, 22.258],
    ],
    schemes: ["PM-KISAN", "MGNREGA"],
  },
  {
    id: "PH_MP_0002",
    name: "Sunita Devi",
    type: "CR",
    status: "PENDING",
    coordinates: [79.9829, 22.2787],
    area: 2.3,
    village: "Barghat",
    district: "Seoni",
    boundary: [
      [79.982, 22.278],
      [79.9838, 22.278],
      [79.9838, 22.2794],
      [79.982, 22.2794],
      [79.982, 22.278],
    ],
    schemes: ["Jal Jeevan Mission"],
  },
  {
    id: "PH_MP_0003",
    name: "Gond Community",
    type: "CFR",
    status: "APPROVED",
    coordinates: [79.9429, 22.2387],
    area: 45.2,
    village: "Lakhnadon",
    district: "Seoni",
    boundary: [
      [79.94, 22.236],
      [79.9458, 22.236],
      [79.9458, 22.2414],
      [79.94, 22.2414],
      [79.94, 22.236],
    ],
    schemes: ["DAJGUA", "MGNREGA"],
  },
]

interface MapContainerProps {
  activeLayer?: string
  onLayerChange?: (layer: string) => void
}

export function MapContainer({ activeLayer = "claims", onLayerChange }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [selectedParcel, setSelectedParcel] = useState<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [visibleLayers, setVisibleLayers] = useState({
    claims: true,
    forest: true,
    satellite: false,
    villages: true,
  })

  useEffect(() => {
    if (!mapRef.current) return

    const initializeMap = async () => {
      try {
        const maplibregl = await import("maplibre-gl")

        const map = new maplibregl.Map({
          container: mapRef.current!,
          style: {
            version: 8,
            name: "FRA Atlas Style",
            metadata: {},
            sources: {
              "osm-tiles": {
                type: "raster",
                tiles: [
                  "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
                ],
                tileSize: 256,
                attribution: "© OpenStreetMap contributors",
                maxzoom: 19,
              },
              "satellite-tiles": {
                type: "raster",
                tiles: [
                  "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                  "https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                  "https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
                ],
                tileSize: 256,
                attribution: "© Google",
                maxzoom: 20,
              },
            },
            layers: [
              {
                id: "osm-base",
                type: "raster",
                source: "osm-tiles",
                layout: {
                  visibility: "visible",
                },
                paint: {},
              },
              {
                id: "satellite-base",
                type: "raster",
                source: "satellite-tiles",
                layout: {
                  visibility: "none",
                },
                paint: {},
              },
            ],
            glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
          },
          center: [79.9629, 22.2587],
          zoom: 12,
          attributionControl: false,
          transformRequest: (url, resourceType) => {
            if (url.includes("mapbox.com")) {
              console.warn("[v0] Blocked Mapbox request:", url)
              return { url: "" }
            }
            return { url }
          },
        })

        map.on("error", (e) => {
          console.error("[v0] Map error:", e)
          if (e.error && e.error.message && e.error.message.includes("mapbox")) {
            console.warn("[v0] Detected Mapbox error, switching to fallback tiles")
          }
        })

        map.on("load", () => {
          console.log("[v0] Map loaded successfully")
          setMapLoaded(true)

          try {
            map.addSource("fra-parcels", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: mockParcels.map((parcel) => ({
                  type: "Feature",
                  properties: {
                    id: parcel.id,
                    name: parcel.name,
                    type: parcel.type,
                    status: parcel.status,
                    area: parcel.area,
                    village: parcel.village,
                    district: parcel.district,
                    schemes: parcel.schemes,
                  },
                  geometry: {
                    type: "Polygon",
                    coordinates: [parcel.boundary],
                  },
                })),
              },
            })

            map.addLayer({
              id: "fra-parcels-fill",
              type: "fill",
              source: "fra-parcels",
              paint: {
                "fill-color": [
                  "case",
                  ["==", ["get", "status"], "APPROVED"],
                  "#22c55e",
                  ["==", ["get", "status"], "PENDING"],
                  "#f59e0b",
                  "#ef4444",
                ],
                "fill-opacity": 0.6,
              },
              layout: { visibility: visibleLayers.claims ? "visible" : "none" },
            })

            map.addLayer({
              id: "fra-parcels-outline",
              type: "line",
              source: "fra-parcels",
              paint: {
                "line-color": "#ffffff",
                "line-width": 2,
              },
              layout: { visibility: visibleLayers.claims ? "visible" : "none" },
            })

            // Change cursor on hover
            map.on("mouseenter", "fra-parcels-fill", () => {
              map.getCanvas().style.cursor = "pointer"
            })

            map.on("mouseleave", "fra-parcels-fill", () => {
              map.getCanvas().style.cursor = ""
            })

            // Add navigation controls
            map.addControl(new maplibregl.NavigationControl(), "top-right")
            map.addControl(new maplibregl.ScaleControl(), "bottom-right")
          } catch (error) {
            console.error("[v0] Error adding map layers:", error)
          }
        })

        mapInstanceRef.current = map

        return () => {
          map.remove()
        }
      } catch (error) {
        console.error("[v0] Failed to load map:", error)
      }
    }

    initializeMap()
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current && mapLoaded) {
      const map = mapInstanceRef.current

      try {
        if (visibleLayers.satellite) {
          map.setLayoutProperty("osm-base", "visibility", "none")
          map.setLayoutProperty("satellite-base", "visibility", "visible")
        } else {
          map.setLayoutProperty("osm-base", "visibility", "visible")
          map.setLayoutProperty("satellite-base", "visibility", "none")
        }

        // Update claims layer
        const claimsVisibility = visibleLayers.claims ? "visible" : "none"
        if (map.getLayer("fra-parcels-fill")) {
          map.setLayoutProperty("fra-parcels-fill", "visibility", claimsVisibility)
          map.setLayoutProperty("fra-parcels-outline", "visibility", claimsVisibility)
        }
      } catch (error) {
        console.error("[v0] Error updating layer visibility:", error)
      }
    }
  }, [visibleLayers, mapLoaded])

  const toggleLayer = (layerName: string) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }))
  }

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

  return (
    <div className="h-full w-full relative">
      <div ref={mapRef} className="h-full w-full" />

      {!mapLoaded && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
          <Card className="p-6 bg-card/95 backdrop-blur-sm">
            <div className="text-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <div>
                <h3 className="font-semibold">Loading Interactive Map</h3>
                <p className="text-sm text-muted-foreground">Initializing FRA Atlas...</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="absolute top-20 left-4 space-y-2 z-30">
        <Card className="p-2">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Crosshair className="h-4 w-4 mr-2" />
              Locate
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Ruler className="h-4 w-4 mr-2" />
              Measure
            </Button>
          </div>
        </Card>

        <Card className="p-2">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground mb-2">Layers</div>
            <Button
              variant={visibleLayers.claims ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => toggleLayer("claims")}
            >
              {visibleLayers.claims ? <Eye className="h-3 w-3 mr-2" /> : <EyeOff className="h-3 w-3 mr-2" />}
              FRA Claims
            </Button>
            <Button
              variant={visibleLayers.satellite ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => toggleLayer("satellite")}
            >
              {visibleLayers.satellite ? <Eye className="h-3 w-3 mr-2" /> : <EyeOff className="h-3 w-3 mr-2" />}
              Satellite
            </Button>
          </div>
        </Card>
      </div>

      {selectedParcel && (
        <div className="absolute top-4 right-4 w-80 z-40">
          <Card className="bg-card/95 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{selectedParcel.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedParcel.id}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedParcel(null)}>
                  ×
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(selectedParcel.type)} variant="secondary">
                    {selectedParcel.type}
                  </Badge>
                  <Badge className={getStatusColor(selectedParcel.status)} variant="secondary">
                    {selectedParcel.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Village:</span>
                    <p className="font-medium">{selectedParcel.village}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">District:</span>
                    <p className="font-medium">{selectedParcel.district}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Area:</span>
                    <p className="font-medium">{selectedParcel.area} ha</p>
                  </div>
                </div>

                {selectedParcel.schemes && selectedParcel.schemes.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Approved Schemes:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedParcel.schemes.map((scheme: string) => (
                        <Badge key={scheme} variant="outline" className="text-xs">
                          {scheme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Documents
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="absolute bottom-4 left-4 z-30">
        <div className="bg-card/95 backdrop-blur-sm rounded-lg border p-3 shadow-lg">
          <h4 className="font-medium text-sm mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500"></div>
              <span>Approved Claims</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500"></div>
              <span>Pending Claims</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500"></div>
              <span>Rejected Claims</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
        © OpenStreetMap contributors | © Google
      </div>
    </div>
  )
}
