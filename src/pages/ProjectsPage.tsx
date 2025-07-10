import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Calendar, Users, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { projects, users, type Project } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { ProjectModal } from "@/components/ui/project-modal"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; projectId: number | null }>({ open: false, projectId: null })
  const [hiddenProjects, setHiddenProjects] = useState<number[]>([])
  const { toast } = useToast()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editModal, setEditModal] = useState<{ open: boolean; project: Project | null }>({ open: false, project: null })
  const [projectList, setProjectList] = useState(projects)

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      if (hiddenProjects.includes(project.id)) return false;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [searchQuery, statusFilter, priorityFilter, hiddenProjects, projectList])

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  const getAssignedUsers = (userIds: number[]) => {
    return users.filter((user) => userIds.includes(user.id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track all your team projects</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => {
          const assignedUsers = getAssignedUsers(project.assignedUsers)
          const daysLeft = Math.ceil(
            (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
          )

          return (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/projects/${project.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditModal({ open: true, project })}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => setDeleteDialog({ open: true, projectId: project.id })}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                  </span>
                  <span>{project.budget.toLocaleString()} FCFA</span>
                </div>

                {/* Assigned Users */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Team ({assignedUsers.length})
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {assignedUsers.slice(0, 4).map((user) => (
                      <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {assignedUsers.length > 4 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{assignedUsers.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technologies */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className="w-10"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
            <Button asChild>
              <Link to="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this project? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, projectId: null })}>Cancel</Button>
            <Button variant="destructive" onClick={() => {
              if (typeof deleteDialog.projectId === 'number') setHiddenProjects((prev) => [...prev, deleteDialog.projectId!]);
              setDeleteDialog({ open: false, projectId: null });
              toast({ title: "Project deleted", description: "The project has been successfully deleted." });
            }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ProjectModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode="create"
        onSubmit={(form) => {
          // Ajout d'un nouveau projet
          const newProject = {
            ...form,
            id: Math.max(...projectList.map(p => p.id)) + 1,
            progress: 0,
            status: "active",
            createdAt: new Date().toISOString(),
            createdBy: 1, // à adapter selon l'utilisateur courant
            technologies: form.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
            budget: Number(form.budget),
          }
          setProjectList(prev => [newProject, ...prev])
        }}
      />
      <ProjectModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, project: null })}
        mode="edit"
        initialValues={editModal.project ? {
          name: editModal.project.name,
          description: editModal.project.description,
          startDate: editModal.project.startDate,
          endDate: editModal.project.endDate,
          budget: editModal.project.budget,
          priority: editModal.project.priority,
          technologies: editModal.project.technologies,
          assignedUsers: editModal.project.assignedUsers,
        } : undefined}
        onSubmit={(form) => {
          // Edition d'un projet existant
          setProjectList(prev => prev.map(p =>
            p.id === editModal.project?.id
              ? {
                  ...p,
                  ...form,
                  technologies: form.technologies.split(',').map((t: string) => t.trim()).filter(Boolean),
                  budget: Number(form.budget),
                }
              : p
          ))
        }}
      />
    </div>
  )
}
