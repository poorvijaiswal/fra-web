"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function TrendChart() {
  const data = [
    { month: "Jan", approved: 1200, pending: 800, rejected: 150 },
    { month: "Feb", approved: 1350, pending: 750, rejected: 180 },
    { month: "Mar", approved: 1500, pending: 900, rejected: 200 },
    { month: "Apr", approved: 1650, pending: 850, rejected: 170 },
    { month: "May", approved: 1800, pending: 950, rejected: 190 },
    { month: "Jun", approved: 1950, pending: 1100, rejected: 220 },
    { month: "Jul", approved: 2100, pending: 1200, rejected: 180 },
    { month: "Aug", approved: 2250, pending: 1050, rejected: 200 },
    { month: "Sep", approved: 2400, pending: 1150, rejected: 190 },
    { month: "Oct", approved: 2550, pending: 1300, rejected: 210 },
    { month: "Nov", approved: 2700, pending: 1250, rejected: 180 },
    { month: "Dec", approved: 2850, pending: 1400, rejected: 220 },
  ]

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} name="Approved" />
          <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
          <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
