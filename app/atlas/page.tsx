import { Suspense } from "react"
import { MapContainer } from "@/components/atlas/map-container"
import { LayerControl } from "@/components/atlas/layer-control"
import { FilterDrawer } from "@/components/atlas/filter-drawer"
import { KPIChips } from "@/components/atlas/kpi-chips"
import { PattaList } from "@/components/atlas/patta-list"

export default function AtlasPage() {
  return (
    <div className="h-[calc(100vh-73px)] flex relative bg-background">
      <div className="w-80 border-r bg-card flex flex-col">
        <LayerControl />
        <div className="flex-1 border-t">
          <PattaList />
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute top-4 left-20 right-4 z-20">
          <KPIChips />
        </div>

        <Suspense
          fallback={
            <div className="h-full bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading map...</p>
              </div>
            </div>
          }
        >
          <MapContainer />
        </Suspense>
      </div>

      <FilterDrawer />
    </div>
  )
}
