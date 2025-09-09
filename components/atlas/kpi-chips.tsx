import { Card } from "@/components/ui/card"
import { TrendingUp, Users, FileCheck, MapPin } from "lucide-react"

export function KPIChips() {
  const kpis = [
    {
      label: "Total Claims",
      value: "31,300",
      icon: FileCheck,
      color: "text-blue-600",
    },
    {
      label: "Approved",
      value: "20,345",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: "8,955",
      icon: Users,
      color: "text-orange-600",
    },
    {
      label: "CFR Area",
      value: "2.4M ha",
      icon: MapPin,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="flex gap-3">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="bg-card/95 backdrop-blur-sm border shadow-sm">
          <div className="p-3 flex items-center space-x-3">
            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            <div>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-sm font-semibold">{kpi.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
