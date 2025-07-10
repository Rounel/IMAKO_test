/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { users } from "@/lib/mock-data"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: string
  position: string
  joinDate: string
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => { success: boolean; message?: string }
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
  }) => { success: boolean; message?: string }
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("currentUser")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.log(error)
        localStorage.removeItem("authToken")
        localStorage.removeItem("currentUser")
      }
    }

    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("authToken", `mock-token-${foundUser.id}`)
      localStorage.setItem("currentUser", JSON.stringify(foundUser))
      return { success: true }
    }

    return { success: false, message: "Invalid email or password" }
  }

  const register = (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
  }) => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === userData.email)
    if (existingUser) {
      return { success: false, message: "User with this email already exists" }
    }

    // Create new user
    const newUser: User = {
      id: users.length + 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatar: `https://i.pravatar.cc/150?img=${users.length + 1}`,
      role: userData.role,
      position: "Junior",
      joinDate: new Date().toISOString().split("T")[0],
      isActive: true,
    }

    // Add to users array (in real app, this would be an API call)
    users.push({ ...newUser, password: userData.password })

    setUser(newUser)
    localStorage.setItem("authToken", `mock-token-${newUser.id}`)
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
