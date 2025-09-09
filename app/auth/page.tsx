"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, User, Shield, BarChart3, Users } from "lucide-react"

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const router = useRouter()

  const roles = [
    {
      id: "ADMIN",
      name: "Administrator",
      description: "Full system access and user management",
      icon: Shield,
      color: "bg-red-100 text-red-800",
    },
    {
      id: "OFFICER",
      name: "Forest Officer",
      description: "Field operations and data validation",
      icon: User,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "ANALYST",
      name: "Data Analyst",
      description: "Analytics and reporting capabilities",
      icon: BarChart3,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "NGO",
      name: "NGO Partner",
      description: "Limited access for community support",
      icon: Users,
      color: "bg-purple-100 text-purple-800",
    },
  ]

  const handleLogin = () => {
    if (selectedRole) {
      // Store role in localStorage for demo purposes
      localStorage.setItem("userRole", selectedRole)
      router.push("/atlas")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">FRA Atlas</CardTitle>
          <CardDescription>Select your role to access the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedRole === role.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-start space-x-3">
                  <role.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{role.name}</h3>
                      <Badge className={role.color} variant="secondary">
                        {role.id}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleLogin} disabled={!selectedRole} className="w-full">
            Access System
          </Button>

          <div className="text-center text-xs text-muted-foreground">Demo mode - no actual authentication required</div>
        </CardContent>
      </Card>
    </div>
  )
}
