// Mock Data for Project Management Application

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  avatar: string
  role: string
  position: string
  joinDate: string
  isActive: boolean
}

export interface Project {
  id: number
  name: string
  description: string
  status: "active" | "completed" | "paused" | "cancelled"
  priority: "low" | "medium" | "high" | "critical"
  startDate: string
  endDate: string
  assignedUsers: number[]
  progress: number
  createdAt: string
  createdBy: number
  budget: number
  technologies: string[]
}

export interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  pausedProjects: number
  cancelledProjects: number
  totalUsers: number
  totalBudget: number
  thisMonthProjects: number
}

export const users: User[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Martin",
    email: "alice.martin@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Frontend Developer",
    position: "Senior",
    joinDate: "2023-06-15",
    isActive: true,
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "Backend Developer",
    position: "Senior",
    joinDate: "2023-05-20",
    isActive: true,
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Williams",
    email: "carol.williams@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "UI/UX Designer",
    position: "Mid-level",
    joinDate: "2023-07-10",
    isActive: true,
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "Project Manager",
    position: "Senior",
    joinDate: "2023-04-01",
    isActive: true,
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Davis",
    email: "emma.davis@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Full Stack Developer",
    position: "Mid-level",
    joinDate: "2023-08-15",
    isActive: true,
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.miller@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=6",
    role: "DevOps Engineer",
    position: "Senior",
    joinDate: "2023-03-12",
    isActive: true,
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Wilson",
    email: "grace.wilson@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=7",
    role: "QA Engineer",
    position: "Mid-level",
    joinDate: "2023-09-01",
    isActive: true,
  },
  {
    id: 8,
    firstName: "Henry",
    lastName: "Moore",
    email: "henry.moore@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "Frontend Developer",
    position: "Junior",
    joinDate: "2023-10-05",
    isActive: true,
  },
  {
    id: 9,
    firstName: "Ivy",
    lastName: "Taylor",
    email: "ivy.taylor@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Product Manager",
    position: "Senior",
    joinDate: "2023-02-28",
    isActive: true,
  },
  {
    id: 10,
    firstName: "Jack",
    lastName: "Anderson",
    email: "jack.anderson@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "Backend Developer",
    position: "Junior",
    joinDate: "2023-11-10",
    isActive: true,
  },
  {
    id: 11,
    firstName: "Kate",
    lastName: "Thomas",
    email: "kate.thomas@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "UI/UX Designer",
    position: "Senior",
    joinDate: "2023-01-15",
    isActive: true,
  },
  {
    id: 12,
    firstName: "Liam",
    lastName: "Jackson",
    email: "liam.jackson@company.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Full Stack Developer",
    position: "Senior",
    joinDate: "2022-12-01",
    isActive: true,
  },
]

export const projects: Project[] = [
  {
    id: 1,
    name: "E-commerce Platform ModernShop",
    description:
      "Development of a modern online store with React and Node.js, featuring advanced search, payment integration, and inventory management.",
    status: "active",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    assignedUsers: [1, 2, 3, 4],
    progress: 75,
    createdAt: "2024-01-10",
    createdBy: 4,
    budget: 25000,
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: 2,
    name: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial dashboard.",
    status: "active",
    priority: "critical",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    assignedUsers: [2, 5, 6, 7],
    progress: 45,
    createdAt: "2024-01-25",
    createdBy: 9,
    budget: 45000,
    technologies: ["React Native", "Express", "PostgreSQL", "JWT"],
  },
  {
    id: 3,
    name: "Corporate Website Redesign",
    description:
      "Complete redesign of company website with modern UI/UX, improved performance, and mobile-first approach.",
    status: "completed",
    priority: "medium",
    startDate: "2023-11-01",
    endDate: "2024-01-01",
    assignedUsers: [1, 3, 8],
    progress: 100,
    createdAt: "2023-10-20",
    createdBy: 4,
    budget: 15000,
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    id: 4,
    name: "Inventory Management System",
    description:
      "Comprehensive inventory tracking system with real-time updates, automated reordering, and detailed analytics.",
    status: "active",
    priority: "high",
    startDate: "2024-01-20",
    endDate: "2024-04-20",
    assignedUsers: [2, 5, 10],
    progress: 60,
    createdAt: "2024-01-15",
    createdBy: 9,
    budget: 30000,
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
  },
  {
    id: 5,
    name: "Customer Support Portal",
    description: "Self-service customer support portal with ticket system, knowledge base, and live chat integration.",
    status: "paused",
    priority: "medium",
    startDate: "2023-12-01",
    endDate: "2024-03-01",
    assignedUsers: [1, 7, 11],
    progress: 30,
    createdAt: "2023-11-25",
    createdBy: 4,
    budget: 20000,
    technologies: ["Angular", "Spring Boot", "PostgreSQL"],
  },
  {
    id: 6,
    name: "Data Analytics Dashboard",
    description:
      "Interactive dashboard for business intelligence with real-time data visualization and custom reporting features.",
    status: "active",
    priority: "high",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
    assignedUsers: [5, 6, 12],
    progress: 25,
    createdAt: "2024-02-10",
    createdBy: 9,
    budget: 35000,
    technologies: ["React", "D3.js", "Python", "FastAPI"],
  },
  {
    id: 7,
    name: "HR Management System",
    description:
      "Complete HR solution with employee onboarding, performance tracking, payroll integration, and document management.",
    status: "completed",
    priority: "medium",
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    assignedUsers: [2, 4, 8, 10],
    progress: 100,
    createdAt: "2023-08-20",
    createdBy: 4,
    budget: 40000,
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    id: 8,
    name: "Social Media Management Tool",
    description: "Multi-platform social media management with scheduling, analytics, and team collaboration features.",
    status: "active",
    priority: "medium",
    startDate: "2024-01-10",
    endDate: "2024-04-10",
    assignedUsers: [1, 3, 5, 11],
    progress: 55,
    createdAt: "2024-01-05",
    createdBy: 9,
    budget: 28000,
    technologies: ["Vue.js", "Express", "Redis", "Socket.io"],
  },
  {
    id: 9,
    name: "Learning Management System",
    description:
      "Educational platform with course creation, student tracking, assessments, and video streaming capabilities.",
    status: "active",
    priority: "high",
    startDate: "2024-02-20",
    endDate: "2024-06-20",
    assignedUsers: [2, 6, 7, 12],
    progress: 35,
    createdAt: "2024-02-15",
    createdBy: 4,
    budget: 50000,
    technologies: ["React", "Django", "PostgreSQL", "AWS S3"],
  },
  {
    id: 10,
    name: "IoT Device Dashboard",
    description:
      "Real-time monitoring dashboard for IoT devices with alerts, data visualization, and remote control capabilities.",
    status: "active",
    priority: "critical",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    assignedUsers: [5, 6, 8],
    progress: 20,
    createdAt: "2024-02-25",
    createdBy: 9,
    budget: 42000,
    technologies: ["React", "Node.js", "InfluxDB", "MQTT"],
  },
  {
    id: 11,
    name: "Event Management Platform",
    description: "Comprehensive event planning and management system with booking, payments, and attendee management.",
    status: "completed",
    priority: "low",
    startDate: "2023-08-01",
    endDate: "2023-11-01",
    assignedUsers: [1, 3, 7],
    progress: 100,
    createdAt: "2023-07-20",
    createdBy: 4,
    budget: 22000,
    technologies: ["Angular", "ASP.NET", "SQL Server"],
  },
  {
    id: 12,
    name: "Cryptocurrency Trading Bot",
    description: "Automated trading bot with machine learning algorithms, risk management, and portfolio optimization.",
    status: "cancelled",
    priority: "low",
    startDate: "2023-10-01",
    endDate: "2024-01-01",
    assignedUsers: [2, 12],
    progress: 15,
    createdAt: "2023-09-25",
    createdBy: 9,
    budget: 18000,
    technologies: ["Python", "TensorFlow", "PostgreSQL"],
  },
  {
    id: 13,
    name: "Restaurant POS System",
    description:
      "Point of sale system for restaurants with order management, inventory tracking, and payment processing.",
    status: "active",
    priority: "medium",
    startDate: "2024-01-25",
    endDate: "2024-04-25",
    assignedUsers: [1, 5, 10],
    progress: 65,
    createdAt: "2024-01-20",
    createdBy: 4,
    budget: 32000,
    technologies: ["React", "Express", "MongoDB", "Stripe"],
  },
  {
    id: 14,
    name: "Fitness Tracking App",
    description:
      "Mobile fitness application with workout tracking, nutrition logging, and social features for motivation.",
    status: "active",
    priority: "medium",
    startDate: "2024-02-10",
    endDate: "2024-05-10",
    assignedUsers: [3, 8, 11],
    progress: 40,
    createdAt: "2024-02-05",
    createdBy: 9,
    budget: 26000,
    technologies: ["React Native", "Firebase", "Node.js"],
  },
  {
    id: 15,
    name: "Real Estate Portal",
    description: "Property listing platform with advanced search, virtual tours, and mortgage calculator integration.",
    status: "completed",
    priority: "medium",
    startDate: "2023-07-01",
    endDate: "2023-10-01",
    assignedUsers: [1, 2, 4, 6],
    progress: 100,
    createdAt: "2023-06-25",
    createdBy: 4,
    budget: 38000,
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Mapbox"],
  },
  {
    id: 16,
    name: "Video Streaming Platform",
    description:
      "Netflix-like streaming service with content management, user subscriptions, and recommendation engine.",
    status: "active",
    priority: "high",
    startDate: "2024-03-15",
    endDate: "2024-08-15",
    assignedUsers: [2, 5, 6, 12],
    progress: 10,
    createdAt: "2024-03-10",
    createdBy: 9,
    budget: 65000,
    technologies: ["React", "Node.js", "AWS", "FFmpeg"],
  },
  {
    id: 17,
    name: "Task Management Tool",
    description: "Team collaboration tool with task assignment, time tracking, and project timeline visualization.",
    status: "active",
    priority: "medium",
    startDate: "2024-01-30",
    endDate: "2024-04-30",
    assignedUsers: [1, 7, 8],
    progress: 70,
    createdAt: "2024-01-25",
    createdBy: 4,
    budget: 24000,
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
  },
  {
    id: 18,
    name: "Weather Monitoring System",
    description: "Weather data collection and analysis system with predictive modeling and alert notifications.",
    status: "paused",
    priority: "low",
    startDate: "2023-11-15",
    endDate: "2024-02-15",
    assignedUsers: [6, 10],
    progress: 25,
    createdAt: "2023-11-10",
    createdBy: 9,
    budget: 16000,
    technologies: ["Python", "Django", "PostgreSQL", "Celery"],
  },
  {
    id: 19,
    name: "Blockchain Voting System",
    description: "Secure electronic voting platform using blockchain technology for transparency and immutability.",
    status: "active",
    priority: "critical",
    startDate: "2024-02-25",
    endDate: "2024-07-25",
    assignedUsers: [2, 6, 12],
    progress: 30,
    createdAt: "2024-02-20",
    createdBy: 9,
    budget: 55000,
    technologies: ["Solidity", "Web3.js", "React", "IPFS"],
  },
  {
    id: 20,
    name: "AI Chatbot Platform",
    description: "Intelligent chatbot platform with natural language processing, multi-channel support, and analytics.",
    status: "active",
    priority: "high",
    startDate: "2024-03-05",
    endDate: "2024-06-05",
    assignedUsers: [5, 7, 11, 12],
    progress: 15,
    createdAt: "2024-03-01",
    createdBy: 4,
    budget: 48000,
    technologies: ["Python", "TensorFlow", "React", "WebSocket"],
  },
]

export const dashboardStats: DashboardStats = {
  totalProjects: projects.length,
  activeProjects: projects.filter((p) => p.status === "active").length,
  completedProjects: projects.filter((p) => p.status === "completed").length,
  pausedProjects: projects.filter((p) => p.status === "paused").length,
  cancelledProjects: projects.filter((p) => p.status === "cancelled").length,
  totalUsers: users.length,
  totalBudget: projects.reduce((sum, project) => sum + project.budget, 0),
  thisMonthProjects: 3,
}

// Session management
export let currentUser: User | null = null

export const authUser = (email: string, password: string) => {
  const user = users.find((u) => u.email === email && u.password === password)
  if (user) {
    currentUser = user
    localStorage.setItem("authToken", "mock-token-" + user.id)
    localStorage.setItem("currentUser", JSON.stringify(user))
    return { success: true, user }
  }
  return { success: false, message: "Invalid email or password" }
}

export const logoutUser = () => {
  currentUser = null
  localStorage.removeItem("authToken")
  localStorage.removeItem("currentUser")
}
