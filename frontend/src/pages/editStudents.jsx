import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import API_URL from '../api'
import './editStudents.css'



function EditStudent() {
    const location = useLocation()
    const navigate = useNavigate()

    const student = location.state?.student

    const [name, setName] = useState(student?.name || '')
    const [age, setAge] = useState(student?.age || '')
    const [department, setDepartment] = useState(student?.department || '')
    const [message, setMessage] = useState('')

    async function handleUpdate(e) {
        e.preventDefault()

        if (!student) {
            setMessage('Student information not found.')
            return
        }

        try {
            const response = await fetch(
            `${API_URL}/students/${encodeURIComponent(student.matricule)}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name,
                        age: Number(age),
                        department
                    })
                }
            )

            console.log('Update status:', response.status)

            const result = await response.text()
            console.log('Update response:', result)

            if (response.ok) {
                setMessage('Student updated successfully!')
            } else {
                setMessage(result)
            }

        } catch (error) {
            console.error('Update error:', error)
            setMessage('Unable to connect to the server.')
        }
    }

    if (!student) {
        return (
            <div className="edit-page">
                <div className="edit-card">
                    <h2>Student not found</h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/students')}
                    >
                        Back to Students
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="edit-page">
            <div className="edit-card">

                <div className="edit-header">
                    <div className="edit-icon">
                        <i className="bi bi-pencil-square"></i>
                    </div>

                    <div>
                        <h2>Edit Student</h2>
                        <p>Update student information</p>
                    </div>
                </div>

                {message && (
                    <div className={`alert ${
                        message.includes('successfully')
                            ? 'alert-success'
                            : 'alert-danger'
                    }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleUpdate}>

                    <div className="mb-4">
                        <label className="form-label">Matricule</label>

                        <input
                            type="text"
                            className="form-control"
                            value={student.matricule}
                            disabled
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Full Name</label>

                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Age</label>

                        <input
                            type="number"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            min="1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Department</label>

                        <select
                            className="form-select"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="Software Engineering">
                                Software Engineering
                            </option>
                            <option value="Cyber Security">
                                Cyber Security
                            </option>
                            <option value="Network Security">
                                Network Security
                            </option>
                        </select>
                    </div>

                    <div className="edit-actions">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            <i className="bi bi-check-circle me-2"></i>
                            Update Student
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/students')}
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditStudent