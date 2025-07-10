import { useParams, Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Users, DollarSign, Edit, Trash2 } from "lucide-react"
import { projects, users } from "@/lib/mock-data"
import { ProjectModal } from "@/components/ui/project-modal"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === Number.parseInt(id || "0"))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const { toast } = useToast()

  if (!project || isDeleted) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
        <Button asChild>
          <Link to="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    )
  }

  const assignedUsers = users.filter((user) => project.assignedUsers.includes(user.id))
  const projectCreator = users.find((user) => user.id === project.createdBy)

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
              <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Project Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-gray-600">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">End Date</p>
                  <p className="text-sm text-gray-600">{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-sm text-gray-600">FCFA{project.budget.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Team Size</p>
                  <p className="text-sm text-gray-600">{assignedUsers.length} members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${user.isActive ? "bg-green-500" : "bg-gray-300"}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Creator */}
          {projectCreator && (
            <Card>
              <CardHeader>
                <CardTitle>Project Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={projectCreator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {projectCreator.firstName[0]}
                      {projectCreator.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {projectCreator.firstName} {projectCreator.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{projectCreator.role}</p>
                    <p className="text-xs text-gray-400">
                      Created on {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <ProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="edit"
        initialValues={{
          name: project.name,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          budget: project.budget,
          priority: project.priority,
          technologies: project.technologies,
        }}
      />
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this project? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setIsDeleted(true); setShowDeleteDialog(false); toast({ title: "Project deleted", description: "The project has been successfully deleted." }); navigate("/projects"); }}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
