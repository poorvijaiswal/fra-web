"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download } from "lucide-react"

export function AuditLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("")
  const [filterUser, setFilterUser] = useState("")

  const auditEntries = [
    {
      id: "AUD_001",
      timestamp: "2024-01-15 14:30:25",
      user: "admin@fra.gov.in",
      action: "USER_LOGIN",
      resource: "System",
      details: "Successful login from 192.168.1.100",
      severity: "info",
    },
    {
      id: "AUD_002",
      timestamp: "2024-01-15 14:25:10",
      user: "officer@fra.gov.in",
      action: "DOCUMENT_UPLOAD",
      resource: "Ingestion System",
      details: "Uploaded FRA document: patta_claim_001.pdf",
      severity: "info",
    },
    {
      id: "AUD_003",
      timestamp: "2024-01-15 14:20:45",
      user: "analyst@fra.gov.in",
      action: "DSS_RUN",
      resource: "Decision Support",
      details: "Executed DSS analysis for Seoni district",
      severity: "info",
    },
    {
      id: "AUD_004",
      timestamp: "2024-01-15 14:15:30",
      user: "admin@fra.gov.in",
      action: "RULE_MODIFIED",
      resource: "Schemes Management",
      details: "Modified PM-KISAN eligibility rules",
      severity: "warning",
    },
    {
      id: "AUD_005",
      timestamp: "2024-01-15 14:10:15",
      user: "system",
      action: "DATA_SYNC_FAILED",
      resource: "Survey Department API",
      details: "Failed to sync survey data: Connection timeout",
      severity: "error",
    },
    {
      id: "AUD_006",
      timestamp: "2024-01-15 14:05:00",
      user: "officer@fra.gov.in",
      action: "EXPORT_DATA",
      resource: "Atlas System",
      details: "Exported parcel data for Balaghat district (CSV format)",
      severity: "info",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-orange-100 text-orange-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes("LOGIN") || action.includes("LOGOUT")) return "bg-green-100 text-green-800"
    if (action.includes("MODIFIED") || action.includes("DELETED")) return "bg-orange-100 text-orange-800"
    if (action.includes("FAILED") || action.includes("ERROR")) return "bg-red-100 text-red-800"
    return "bg-blue-100 text-blue-800"
  }

  const filteredEntries = auditEntries
    .filter((entry) => (filterAction ? entry.action.includes(filterAction) : true))
    .filter((entry) => (filterUser ? entry.user.includes(filterUser) : true))
    .filter((entry) =>
      searchTerm
        ? entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.details.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All actions</SelectItem>
            <SelectItem value="LOGIN">Login/Logout</SelectItem>
            <SelectItem value="UPLOAD">Document Upload</SelectItem>
            <SelectItem value="DSS">DSS Operations</SelectItem>
            <SelectItem value="MODIFIED">Modifications</SelectItem>
            <SelectItem value="EXPORT">Data Export</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterUser} onValueChange={setFilterUser}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All users</SelectItem>
            <SelectItem value="admin">Admin Users</SelectItem>
            <SelectItem value="officer">Officers</SelectItem>
            <SelectItem value="analyst">Analysts</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Audit Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted p-3 border-b">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium">
            <div>Timestamp</div>
            <div>User</div>
            <div>Action</div>
            <div>Resource</div>
            <div>Details</div>
            <div>Severity</div>
          </div>
        </div>
        <div className="divide-y max-h-96 overflow-y-auto">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="p-3 hover:bg-muted/50 transition-colors">
              <div className="grid grid-cols-6 gap-4 items-start text-sm">
                <div className="font-mono text-xs">{entry.timestamp}</div>
                <div className="text-muted-foreground">{entry.user}</div>
                <div>
                  <Badge className={getActionColor(entry.action)} variant="secondary">
                    {entry.action}
                  </Badge>
                </div>
                <div className="font-medium">{entry.resource}</div>
                <div className="text-muted-foreground">{entry.details}</div>
                <div>
                  <Badge className={getSeverityColor(entry.severity)} variant="secondary">
                    {entry.severity}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredEntries.length} of {auditEntries.length} entries
      </div>
    </div>
  )
}
