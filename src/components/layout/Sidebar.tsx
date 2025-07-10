"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, FolderOpen, Users, Settings, LogOut, Menu, X, Bell, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Team", href: "/team", icon: Users },
  // { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  className?: string
  isMobileOpen?: boolean
  setIsMobileOpen?: (open: boolean) => void
}

export function Sidebar({ className, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  // Desktop sidebar (toujours visible en sm+)
  const desktopSidebar = (
    <div
      className={cn(
        "flex-col h-full hidden sm:flex bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <img src="/logo.png" alt="logo" className="h-auto w-40" />
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="p-2">
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-primary border-r-2 border-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start p-2", isCollapsed ? "justify-center" : "justify-start")}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  // Champ de recherche pour mobile
  const mobileSearch = (
    <div className="p-4 border-b border-gray-200 sm:hidden">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search projects, tasks, or team members..."
          className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )

  // Mobile sidebar overlay
  if (typeof isMobileOpen === 'boolean' && setIsMobileOpen) {
    return (
      <>
        {/* Overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity",
            isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileOpen(false)}
        />
        {/* Sidebar */}
        <div
          className={cn(
            "fixed top-0 left-0 z-50 h-full w-[85vw] bg-white border-r border-gray-200 flex flex-col transition-transform sm:hidden",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {mobileSearch}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <img src="/logo.png" alt="logo" className="h-auto w-40" />
            <Button variant="ghost" size="sm" onClick={() => setIsMobileOpen(false)} className="p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {/* Navigation and profile (reuse below) */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-primary border-r-2 border-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {desktopSidebar}
      </>
    )
  }

  return desktopSidebar
}
