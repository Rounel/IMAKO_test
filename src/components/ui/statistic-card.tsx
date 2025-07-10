import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { type ReactNode } from "react"

interface StatisticCardProps {
  title: string
  value: ReactNode
  icon: ReactNode
}

export function StatisticCard({ title, value, icon}: StatisticCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="p-3 rounded-full bg-primary/20 text-primary">
            {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
} 