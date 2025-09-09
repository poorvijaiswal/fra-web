"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, User } from "lucide-react"

export function PattaList() {
  const [searchTerm, setSearchTerm] = useState("")

  const pattaHolders = [
    {
      id: "PH_MP_0001",
      name: "Ramesh Kumar",
      type: "IFR",
      village: "Khapa",
      district: "Seoni",
      status: "APPROVED",
      area: "1.6 ha",
    },
    {
      id: "PH_MP_0002",
      name: "Sunita Devi",
      type: "CR",
      village: "Barghat",
      district: "Seoni",
      status: "PENDING",
      area: "2.3 ha",
    },
    {
      id: "PH_MP_0003",
      name: "Gond Community",
      type: "CFR",
      village: "Lakhnadon",
      district: "Seoni",
      status: "APPROVED",
      area: "45.2 ha",
    },
  ]

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
    <Card className="border-0 rounded-none h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <User className="h-4 w-4" />
          Patta Holders
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search holders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-8 text-sm"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {pattaHolders.map((holder) => (
          <div key={holder.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{holder.name}</h4>
                <p className="text-xs text-muted-foreground">{holder.id}</p>
              </div>
              <Badge className={getTypeColor(holder.type)} variant="secondary">
                {holder.type}
              </Badge>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>
                  {holder.village}, {holder.district}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Area: {holder.area}</span>
                <Badge className={getStatusColor(holder.status)} variant="secondary">
                  {holder.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
            Load More
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
