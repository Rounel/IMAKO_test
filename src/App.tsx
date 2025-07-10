import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./contexts/auth-context"
import DashboardLayout from "./components/layout/DashboardLayout"
import LoadingSpinner from "./components/ui/loading-spinner"
import './App.css'
import './index.css';

const NotFoundPage = lazy(() => import('./pages/NotFound'));
const LoginPage = lazy(() => import("./pages/LoginPage"))
const RegisterPage = lazy(() => import("./pages/RegisterPage"))
const DashboardPage = lazy(() => import("./pages/DashboardPage"))
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"))
const TeamPage = lazy(() => import("./pages/TeamPage"))
const SettingsPage = lazy(() => import("./pages/SettingsPage"))

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />

            {/* Protected routes */}
            <Route path="/" element={user ? <DashboardLayout /> : <Navigate to="/login" replace />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:id" element={<ProjectDetailPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} /> */}
          </Routes>
        </Suspense>
    </Router>
  )
}

export default App
