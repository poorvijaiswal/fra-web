"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Database, FileText, Settings } from "lucide-react"
import Link from "next/link"

import { RolesMatrix } from "@/components/admin/roles-matrix"
import { DataSources } from "@/components/admin/data-sources"
import { AuditLog } from "@/components/admin/audit-log"
import { FeatureFlags } from "@/components/admin/feature-flags"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/atlas" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Atlas</span>
              </Link>
              <div>
                <h1 className="text-xl font-bold">System Administration</h1>
                <p className="text-sm text-muted-foreground">Manage users, data sources, and system settings</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              Admin Access Required
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles & Access
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Sources
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Audit Log
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Feature Flags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Control (RBAC)</CardTitle>
              </CardHeader>
              <CardContent>
                <RolesMatrix />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Sources & Layer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <DataSources />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle>System Audit Log</CardTitle>
              </CardHeader>
              <CardContent>
                <AuditLog />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Flags & Experimental Features</CardTitle>
              </CardHeader>
              <CardContent>
                <FeatureFlags />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
