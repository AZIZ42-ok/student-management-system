import { Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import RegisterStudent from './pages/registerStudents'
import ViewStudents from './pages/viewStudents'
import SearchStudents from './pages/searchStudent'
import EditStudent from './pages/editStudents'
import RegisterAdmin from './pages/registerAdmin'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterStudent />} />
            <Route path="/students" element={<ViewStudents />} />
            <Route path="/search" element={<SearchStudents />} />
            <Route path="/edit" element={<EditStudent />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />

        </Routes>
    )
}

export default App