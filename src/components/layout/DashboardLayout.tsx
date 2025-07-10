import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Breadcrumb } from "./Breadcrumb"
import { useState } from "react"

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isMobileOpen={isSidebarOpen} setIsMobileOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  )
}
