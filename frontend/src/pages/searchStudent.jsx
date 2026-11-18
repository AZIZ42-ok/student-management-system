import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './searchStudent.css'

function SearchStudents() {
    const navigate = useNavigate()

    const [matricule, setMatricule] = useState('')
    const [student, setStudent] = useState(null)
    const [message, setMessage] = useState('')

    async function handleSearch(e) {
        e.preventDefault()

        setStudent(null)
        setMessage('')

        try {
            const response = await fetch(
                `http://localhost:3000/students/${encodeURIComponent(matricule)}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

  

            const result = await response.text()

let data

try {
    data = JSON.parse(result)
} catch {
    data = result
}

if (response.ok) {
    setStudent(data)
} else {
    setMessage('Student not found.')
}

        } catch (error) {
            setMessage('Unable to connect to the server.')
        }
    }

    return (
        <div className="search-page">
            <div className="search-card">

                <div className="search-header">
                    <i className="bi bi-search"></i>
                    <h2>Search Students</h2>
                    <p>Find a student using their matricule.</p>
                </div>

                <form onSubmit={handleSearch}>
                    <label className="form-label">Student Matricule</label>

                    <div className="input-group mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter student matricule"
                            value={matricule}
                            onChange={(e) => setMatricule(e.target.value)}
                            required
                        />

                        <button className="btn btn-primary" type="submit">
                            <i className="bi bi-search me-2"></i>
                            Search
                        </button>
                    </div>
                </form>

                {message && (
                    <div className="alert alert-warning">{message}</div>
                )}

                {student && (
                    <div className="student-result">
                        <h4>Student Details</h4>

                        <p><strong>Matricule:</strong> {student.matricule}</p>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Age:</strong> {student.age}</p>
                        <p><strong>Department:</strong> {student.department}</p>
                    </div>
                )}

                <button
                    className="btn btn-outline-secondary w-100 mt-4"
                    onClick={() => navigate('/dashboard')}
                >
                    Back to Dashboard
                </button>

            </div>
        </div>
    )
}

export default SearchStudents