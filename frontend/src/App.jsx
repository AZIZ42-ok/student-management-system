

import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import API_URL from './api'

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import RegisterStudent from './pages/registerStudents'
import ViewStudents from './pages/viewStudents'
import SearchStudents from './pages/searchStudent'
import EditStudent from './pages/editStudents'
import RegisterAdmin from './pages/registerAdmin'

// Protect pages that require administrator login
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/" replace />
    }

    return children
}

function App() {
    const [adminExists, setAdminExists] = useState(null)
    const [checkError, setCheckError] = useState(false)

    useEffect(() => {
        async function checkAdmin() {
            try {
                const response = await fetch(`${API_URL}/auth/check-admin`)

                if (!response.ok) {
                    throw new Error('Unable to check administrator')
                }

                const data = await response.json()
                setAdminExists(data.adminExists)

            } catch (error) {
                console.error(error)
                setCheckError(true)
            }
        }

        checkAdmin()
    }, [])

    if (checkError) {
        return <p>Unable to connect to the server. Please try again.</p>
    }

    if (adminExists === null) {
        return <p>Checking administrator...</p>
    }

    return (
        <Routes>

            {/* Login page */}
            <Route
                path="/"
                element={
                    adminExists
                        ? <Login />
                        : <Navigate to="/register-admin" replace />
                }
            />

            {/* First administrator registration */}
            <Route
                path="/register-admin"
                element={
                    adminExists
                        ? <Navigate to="/" replace />
                        : <RegisterAdmin />
                }
            />

            {/* Protected dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* Protected student pages */}
            <Route
                path="/register"
                element={
                    <ProtectedRoute>
                        <RegisterStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/students"
                element={
                    <ProtectedRoute>
                        <ViewStudents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/search"
                element={
                    <ProtectedRoute>
                        <SearchStudents />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit"
                element={
                    <ProtectedRoute>
                        <EditStudent />
                    </ProtectedRoute>
                }
            />

            {/* Redirect unknown URLs */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    )
}

export default App
