"use client"

import { Bell, Search, Sun, Moon, Menu, Link, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"

export function Header({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Hamburger for mobile */}
        <button
          type="button"
          className="sm:hidden mr-4 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Open menu"
          onClick={onOpenSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>
        {/* Search (desktop only) */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search projects, tasks, or team members..."
              className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="font-medium">New project assigned</div>
                  <div className="text-sm text-gray-500">You've been assigned to "E-commerce Platform"</div>
                  <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="font-medium">Task completed</div>
                  <div className="text-sm text-gray-500">Sarah completed "User Authentication"</div>
                  <div className="text-xs text-gray-400 mt-1">4 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="font-medium">Deadline approaching</div>
                  <div className="text-sm text-gray-500">"Mobile App" is due in 2 days</div>
                  <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Dark mode toggle */}
          <Button variant="ghost" size="sm" aria-label="Toggle dark mode" onClick={() => setTheme(theme === "dark" ? "light" : "dark") }>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
