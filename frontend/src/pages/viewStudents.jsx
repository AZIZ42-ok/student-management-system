import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../api'
import './viewStudents.css'

function ViewStudents() {
    const navigate = useNavigate()

    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(null)

    async function fetchStudents() {
        try {
            const response = await fetch(`${API_URL}/students`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json()

            if (response.ok) {
                setStudents(data)
            } else {
                alert(data.message || 'Unable to load students')
            }
        } catch (error) {
            console.error(error)
            alert('Unable to connect to the server')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    async function handleDelete(matricule) {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete student ${matricule}?`
        )

        if (!confirmDelete) return

        try {
            setDeleting(matricule)

            const response = await fetch(
                `${API_URL}/students/${encodeURIComponent(matricule)}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            const result = await response.text()

            if (response.ok) {
                setStudents(previous =>
                    previous.filter(student => student.matricule !== matricule)
                )

                alert('Student deleted successfully!')
            } else {
                alert(result || 'Unable to delete student')
            }

        } catch (error) {
            console.error(error)
            alert('Unable to connect to the server')
        } finally {
            setDeleting(null)
        }
    }

    return (
        <div className="view-students-page">
            <div className="students-container">

                <div className="students-header">
                    <div>
                        <h2>Registered Students</h2>
                        <p>Manage all student records</p>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/register')}
                    >
                        <i className="bi bi-person-plus me-2"></i>
                        Add Student
                    </button>
                </div>

                <div className="students-table-card">

                    {loading ? (
                        <p className="text-center p-5">
                            Loading students...
                        </p>
                    ) : (
                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>
                                    <tr>
                                        <th>Matricule</th>
                                        <th>Full Name</th>
                                        <th>Age</th>
                                        <th>Department</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students.length > 0 ? (

                                        students.map(student => (
                                            <tr key={student.matricule}>

                                                <td>{student.matricule}</td>
                                                <td>{student.name}</td>
                                                <td>{student.age}</td>
                                                <td>{student.department}</td>

                                                <td>
                                                    <div className="d-flex gap-2">

                                                        <button
                                                            className="btn btn-sm btn-warning"
                                                            onClick={() => navigate('/edit', {
                                                                state: { student }
                                                            })}
                                                        >
                                                            <i className="bi bi-pencil-square me-1"></i>
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(student.matricule)}
                                                            disabled={deleting === student.matricule}
                                                        >
                                                            <i className="bi bi-trash me-1"></i>

                                                            {deleting === student.matricule
                                                                ? 'Deleting...'
                                                                : 'Delete'}
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))

                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center p-4">
                                                No students registered yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

                <button
                    className="btn btn-outline-secondary mt-4"
                    onClick={() => navigate('/dashboard')}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Dashboard
                </button>

            </div>
        </div>
    )
}

export default ViewStudents