import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './registerStudents.css'

function RegisterStudent() {
    const navigate = useNavigate()

    const [student, setStudent] = useState({
        name: '',
        matricule: '',
        age: '',
        department: ''
    })

    const [message, setMessage] = useState('')

    function handleChange(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...student,
                    age: Number(student.age)
                })
            })

            const data = await response.json()

            if (response.ok) {
                setMessage('Student registered successfully!')

                setStudent({
                    name: '',
                    matricule: '',
                    age: '',
                    department: ''
                })
            } else {
                setMessage(data.message || 'Registration failed.')
            }

        } catch (error) {
            setMessage('Unable to connect to the server.')
        }
    }

    return (
        <div className="register-page">
            <div className="register-card">

                <div className="register-header">
                    <i className="bi bi-person-plus-fill"></i>
                    <h2>Register New Student</h2>
                    <p>Enter the student's information below.</p>
                </div>

                {message && (
                    <div className="alert alert-info">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter full name"
                            value={student.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Matricule</label>
                        <input
                            type="text"
                            name="matricule"
                            className="form-control"
                            placeholder="Enter matricule"
                            value={student.matricule}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            name="age"
                            className="form-control"
                            placeholder="Enter age"
                            value={student.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Department</label>
                        <select
                            name="department"
                            className="form-select"
                            value={student.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select department</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Network Security">Network Security</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        <i className="bi bi-person-check-fill me-2"></i>
                        Register Student
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mt-3"
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </button>

                </form>
            </div>
        </div>
    )
}

export default RegisterStudent