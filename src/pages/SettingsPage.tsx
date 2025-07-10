import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user?.firstName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user?.lastName} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue={user?.role} />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="project-updates">Project Updates</Label>
                  <p className="text-sm text-gray-500">Get notified about project changes</p>
                </div>
                <Switch id="project-updates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="task-assignments">Task Assignments</Label>
                  <p className="text-sm text-gray-500">Notifications when assigned to tasks</p>
                </div>
                <Switch id="task-assignments" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="deadline-reminders">Deadline Reminders</Label>
                  <p className="text-sm text-gray-500">Reminders for upcoming deadlines</p>
                </div>
                <Switch id="deadline-reminders" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>

              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Account Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Member Since</p>
                <p className="text-sm text-gray-600">
                  {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Account Status</p>
                <p className="text-sm text-green-600">Active</p>
              </div>
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-sm text-gray-600">{user?.role}</p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Delete Account</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
