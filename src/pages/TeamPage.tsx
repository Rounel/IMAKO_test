import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Calendar } from "lucide-react"
import { users } from "@/lib/mock-data"

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  const uniqueRoles = [...new Set(users.map((user) => user.role))]

  return (
    <div className="space-y-6">

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">
                {user.firstName} {user.lastName}
              </CardTitle>
              <CardDescription>{user.role}</CardDescription>
              <div className="flex justify-center">
                <Badge
                  variant={
                    user.position === "Senior" ? "default" : user.position === "Mid-level" ? "secondary" : "outline"
                  }
                >
                  {user.position}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.isActive ? "bg-green-500" : "bg-gray-300"}`} />
                  <span className="text-sm">{user.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No team members found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
