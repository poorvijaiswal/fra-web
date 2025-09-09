"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, User } from "lucide-react"

export function RolesMatrix() {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@fra.gov.in", role: "ADMIN", status: "active" },
    { id: 2, name: "Forest Officer", email: "officer@fra.gov.in", role: "OFFICER", status: "active" },
    { id: 3, name: "Data Analyst", email: "analyst@fra.gov.in", role: "ANALYST", status: "active" },
    { id: 4, name: "NGO Partner", email: "ngo@partner.org", role: "NGO", status: "inactive" },
  ])

  const permissions = [
    { action: "View Atlas", admin: true, officer: true, analyst: true, ngo: true },
    { action: "Ingest Documents", admin: true, officer: true, analyst: true, ngo: false },
    { action: "Edit Rules", admin: true, officer: true, analyst: false, ngo: false },
    { action: "Run DSS", admin: true, officer: true, analyst: true, ngo: false },
    { action: "Export Data", admin: true, officer: true, analyst: true, ngo: true },
    { action: "Manage Users", admin: true, officer: false, analyst: false, ngo: false },
    { action: "System Settings", admin: true, officer: false, analyst: false, ngo: false },
    { action: "Audit Logs", admin: true, officer: false, analyst: false, ngo: false },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800"
      case "OFFICER":
        return "bg-blue-100 text-blue-800"
      case "ANALYST":
        return "bg-green-100 text-green-800"
      case "NGO":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Users Management */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Users</h3>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 border-b">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Status</div>
              <div>Last Login</div>
              <div>Actions</div>
            </div>
          </div>
          <div className="divide-y">
            {users.map((user) => (
              <div key={user.id} className="p-3 hover:bg-muted/50 transition-colors">
                <div className="grid grid-cols-6 gap-4 items-center text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="text-muted-foreground">{user.email}</div>
                  <div>
                    <Badge className={getRoleColor(user.role)} variant="secondary">
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <Badge className={getStatusColor(user.status)} variant="secondary">
                      {user.status}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground">2 hours ago</div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Permissions Matrix</h3>
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 border-b">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium">
              <div>Action</div>
              <div>Admin</div>
              <div>Officer</div>
              <div>Analyst</div>
              <div>NGO</div>
            </div>
          </div>
          <div className="divide-y">
            {permissions.map((perm, index) => (
              <div key={index} className="p-3">
                <div className="grid grid-cols-5 gap-4 items-center text-sm">
                  <div className="font-medium">{perm.action}</div>
                  <div>
                    <Switch checked={perm.admin} disabled />
                  </div>
                  <div>
                    <Switch checked={perm.officer} disabled />
                  </div>
                  <div>
                    <Switch checked={perm.analyst} disabled />
                  </div>
                  <div>
                    <Switch checked={perm.ngo} disabled />
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
