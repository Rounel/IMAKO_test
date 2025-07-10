import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Dialog as ConfirmDialog, DialogContent as ConfirmDialogContent, DialogHeader as ConfirmDialogHeader, DialogTitle as ConfirmDialogTitle, DialogFooter as ConfirmDialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { users } from "@/lib/mock-data"

interface ProjectModalProps {
  open: boolean
  onClose: () => void
  mode: "edit" | "create"
  initialValues?: {
    name: string
    description: string
    startDate: string
    endDate: string
    budget: number
    priority: string
    technologies: string[]
    assignedUsers?: number[]
  }
  onSubmit?: (form: any) => void
}

const priorities = ["low", "medium", "high", "critical"]

export function ProjectModal({ open, onClose, mode, initialValues, onSubmit }: ProjectModalProps) {
  const [form, setForm] = useState({
    name: initialValues?.name || "",
    description: initialValues?.description || "",
    startDate: initialValues?.startDate || "",
    endDate: initialValues?.endDate || "",
    budget: initialValues?.budget?.toString() || "",
    priority: initialValues?.priority || "medium",
    technologies: initialValues?.technologies?.join(", ") || "",
    assignedUsers: initialValues?.assignedUsers || [],
  })

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmType, setConfirmType] = useState<'edit' | 'create' | null>(null)

  useEffect(() => {
    setForm({
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      startDate: initialValues?.startDate || "",
      endDate: initialValues?.endDate || "",
      budget: initialValues?.budget?.toString() || "",
      priority: initialValues?.priority || "medium",
      technologies: initialValues?.technologies?.join(", ") || "",
      assignedUsers: initialValues?.assignedUsers || [],
    })
  }, [initialValues])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAssignedUsersChange = (userId: number) => {
    setForm((prev) => {
      const alreadySelected = prev.assignedUsers.includes(userId)
      return {
        ...prev,
        assignedUsers: alreadySelected
          ? prev.assignedUsers.filter((id: number) => id !== userId)
          : [...prev.assignedUsers, userId],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmType(mode)
    setShowConfirmDialog(true)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Project" : "New Project"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" rows={3} required />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Budget (FCFA)</label>
            <Input type="number" name="budget" value={form.budget} onChange={handleChange} required min={0} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange} className="w-full border rounded p-2">
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
            <Input name="technologies" value={form.technologies} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Assign Members</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.assignedUsers.length > 0 && form.assignedUsers.map((id: number) => {
                const user = users.find(u => u.id === id)
                if (!user) return null
                return (
                  <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {user.firstName} {user.lastName}
                  </span>
                )
              })}
            </div>
            <div className="max-h-32 overflow-y-auto border rounded p-2 bg-gray-50">
              {users.map((user) => (
                <label key={user.id} className="flex items-center gap-2 cursor-pointer mb-1">
                  <input
                    type="checkbox"
                    checked={form.assignedUsers.includes(user.id)}
                    onChange={() => handleAssignedUsersChange(user.id)}
                  />
                  <span className="text-sm">{user.firstName} {user.lastName} <span className="text-xs text-gray-400">({user.role})</span></span>
                </label>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{mode === "edit" ? "Save Changes" : "Create Project"}</Button>
          </DialogFooter>
        </form>
        {/* Dialog de confirmation pour création/édition */}
        <ConfirmDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <ConfirmDialogContent>
            <ConfirmDialogHeader>
              <ConfirmDialogTitle>
                {confirmType === 'edit' ? 'Confirmer la modification' : 'Confirmer la création'}
              </ConfirmDialogTitle>
            </ConfirmDialogHeader>
            <p>
              {confirmType === 'edit'
                ? 'Voulez-vous vraiment enregistrer les modifications de ce projet ?'
                : 'Voulez-vous vraiment créer ce projet ?'}
            </p>
            <ConfirmDialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Annuler</Button>
              <Button variant="default" onClick={() => {
                if (onSubmit) onSubmit(form)
                setShowConfirmDialog(false)
                onClose()
              }}>Confirmer</Button>
            </ConfirmDialogFooter>
          </ConfirmDialogContent>
        </ConfirmDialog>
      </DialogContent>
    </Dialog>
  )
} 