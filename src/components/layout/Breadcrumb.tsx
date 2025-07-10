import { useLocation, Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Breadcrumb() {
  const location = useLocation()
  const segments = location.pathname.split("/").filter(Boolean)

  const breadcrumbItems = [
    { name: "Home", href: "/dashboard" },
    ...segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/")
      const name = segment.charAt(0).toUpperCase() + segment.slice(1)
      return { name, href}
    }),
  ]

  if (breadcrumbItems.length <= 1) return null

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-6">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-gray-900 font-medium flex items-center">
              {item.name}
            </span>
          ) : (
            <Link
              to={item.href}
              className={cn(
                "hover:text-gray-700 flex items-center",
                index === 0 && "text-blue-600 hover:text-blue-700",
              )}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
