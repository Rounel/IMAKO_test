import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FolderOpen, Users, CheckCircle, Clock, Search, Plus, Calendar, AlertCircle, MoreHorizontal } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { projects, users, dashboardStats } from "@/lib/mock-data"
import { StatisticCard } from "@/components/ui/statistic-card"
import { ProjectModal } from "@/components/ui/project-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2 } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const stats = [
  {
    title: "Total Projects",
    value: dashboardStats.totalProjects,
    icon: <FolderOpen className="h-4 w-4 text-primary" />,
  },
  {
    title: "Active Projects",
    value: dashboardStats.activeProjects,
    icon: <Clock className="h-4 w-4 text-primary" />,
  },
  {
    title: "Completed",
    value: dashboardStats.completedProjects,
    icon: <CheckCircle className="h-4 w-4 text-primary" />,
  },
  {
    title: "Team Members",
    value: dashboardStats.totalUsers,
    icon: <Users className="h-4 w-4 text-primary" />,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter projects for current user
  const userProjects = projects.filter((project) => project.assignedUsers.includes(user?.id || 0))

  // Filter projects based on search
  const filteredProjects = userProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Recent projects (last 5)
  const recentProjects = filteredProjects
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Today's tasks (projects with high priority or due soon)
  const todaysTasks = userProjects
    .filter((project) => {
      const endDate = new Date(project.endDate)
      const today = new Date()
      const diffTime = endDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return project.priority === "high" || project.priority === "critical" || diffDays <= 7
    })
    .slice(0, 4)

  // Chart data
  const projectStatusData = [
    { name: "Active", value: projects.filter((p) => p.status === "active").length },
    { name: "Completed", value: projects.filter((p) => p.status === "completed").length },
    { name: "Paused", value: projects.filter((p) => p.status === "paused").length },
    { name: "Cancelled", value: projects.filter((p) => p.status === "cancelled").length },
  ]

  const monthlyProjectsData = [
    { month: "Jan", projects: 8 },
    { month: "Feb", projects: 12 },
    { month: "Mar", projects: 15 },
    { month: "Apr", projects: 10 },
    { month: "May", projects: 18 },
    { month: "Jun", projects: 20 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatisticCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Overview of all project statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Projects</CardTitle>
            <CardDescription>Projects created over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyProjectsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search and Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest project activities</CardDescription>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{project.name}</h3>
                        <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(project.endDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.assignedUsers.length} members
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      <div className="text-right">
                        <div className="text-sm font-medium">{project.progress}%</div>
                        <Progress value={project.progress} className="w-20" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <span className="sr-only">Actions</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <a href={`/projects/${project.id}`}><Eye className="mr-2 h-4 w-4" />Voir</a>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a href={`/projects/${project.id}/edit`}><Edit className="mr-2 h-4 w-4" />Modifier</a>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Today's Tasks
              </CardTitle>
              <CardDescription>High priority items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysTasks.map((task) => (
                  <div key={task.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">{task.name}</h4>
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(task.priority)} variant="secondary">
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.slice(0, 4).map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${member.isActive ? "bg-green-500" : "bg-gray-300"}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </div>
  )
}
