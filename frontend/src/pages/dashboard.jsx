
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API_URL from '../api'
import './dashboard.css'

function Dashboard() {
    const navigate = useNavigate()

    const [totalStudents, setTotalStudents] = useState(0)

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await fetch(`${API_URL}/students`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await response.json()

                if (response.ok) {
                    setTotalStudents(data.length)
                }
            } catch (error) {
                console.log('Error fetching students:', error)
            }
        }

        fetchStudents()
    }, [])

    function handleLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className="dashboard-container">

            {/* Sidebar */}
            <aside className="sidebar">

                <h3>
                    <i className="bi bi-mortarboard-fill me-2"></i>
                    EduManage
                </h3>

                <p className="sidebar-label">MAIN MENU</p>

                <Link to="/dashboard" className="active">
                    <i className="bi bi-grid me-2"></i>
                    Dashboard
                </Link>

                <Link to="/register">
                    <i className="bi bi-person-plus me-2"></i>
                    Register Student
                </Link>

                <Link to="/students">
                    <i className="bi bi-people me-2"></i>
                    View Students
                </Link>

                <Link to="/search">
                    <i className="bi bi-search me-2"></i>
                    Search Students
                </Link>

                <Link to="/edit">
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Students
                </Link>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-left me-2"></i>
                    Logout
                </button>

            </aside>

            {/* Main content */}
            <main className="main-content">

                <div className="topbar">

                    <div>
                        <h2>Dashboard</h2>
                        <p>Welcome to your administration panel.</p>
                    </div>

                    <div className="admin-profile">
                        <i className="bi bi-person-circle"></i>
                        <span>Administrator</span>
                    </div>

                </div>

                <h4 className="section-title">Overview</h4>

                <div className="row g-4">

                    <div className="col-md-4">
                        <div className="stat-card">
                            <div>
                                <p>Total Students</p>
                                <h2>{totalStudents}</h2>
                            </div>
                            <i className="bi bi-people-fill"></i>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="stat-card">
                            <div>
                                <p>Departments</p>
                                <h2>0</h2>
                            </div>
                            <i className="bi bi-building"></i>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="stat-card">
                            <div>
                                <p>Registered Today</p>
                                <h2>0</h2>
                            </div>
                            <i className="bi bi-person-check-fill"></i>
                        </div>
                    </div>

                </div>

                <div className="welcome-card">
                    <h3>Student Management System</h3>
                    <p>
                        Manage student records, register new students,
                        and search for existing students from one place.
                    </p>
                </div>

            </main>

        </div>
    )
}

export default Dashboard
