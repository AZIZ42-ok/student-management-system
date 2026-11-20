
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

function App() {
    const [adminExists, setAdminExists] = useState(null)

    useEffect(() => {
        async function checkAdmin() {
            try {
                const response = await fetch(`${API_URL}/auth/check-admin`)

                if (!response.ok) {
                    throw new Error('Unable to check admin')
                }

                const data = await response.json()
                setAdminExists(data.adminExists)

            } catch (error) {
                console.error(error)
            }
        }

        checkAdmin()
    }, [])

    if (adminExists === null) {
        return <p>Checking administrator...</p>
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    adminExists
                        ? <Login />
                        : <Navigate to="/register-admin" replace />
                }
            />

            <Route
                path="/register-admin"
                element={
                    adminExists
                        ? <Navigate to="/" replace />
                        : <RegisterAdmin />
                }
            />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterStudent />} />
            <Route path="/students" element={<ViewStudents />} />
            <Route path="/search" element={<SearchStudents />} />
            <Route path="/edit" element={<EditStudent />} />
        </Routes>
    )
}

export default App
