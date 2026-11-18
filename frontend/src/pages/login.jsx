import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const result = await response.text()

            let data
            try {
                data = JSON.parse(result)
            } catch {
                data = result
            }

            if (response.ok) {
                localStorage.setItem('token', data.token)
                navigate('/dashboard')
            } else {
                alert(typeof data === 'string' ? data : data.message)
            }

        } catch (error) {
            alert('Unable to connect to the server')
        }
    }

    return (
        <div className="login-page">

            <div className="container">
                <div className="row justify-content-center align-items-center min-vh-100">

                    <div className="col-12 col-md-10 col-lg-9 col-xl-8">

                        <div className="card login-card border-0 shadow-lg">

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <i className="bi bi-mortarboard-fill login-icon"></i>

                                    <h3 className="fw-bold mt-3">
                                        Student Management
                                    </h3>

                                    <p className="text-muted">
                                        Administrator Portal
                                    </p>

                                </div>

                                <form onSubmit={handleLogin}>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                    >
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Login
                                    </button>

                                </form>

                            </div>

                        </div>

                        <p className="text-center text-muted mt-4">
                            Student Management System © 2026
                        </p>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Login