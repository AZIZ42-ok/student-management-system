
import { useState } from 'react'
import API_URL from '../api'
import './registerAdmin.css'

function RegisterAdmin() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.')
            return
        }

        if (password.length < 8) {
            setMessage('Password must contain at least 8 characters.')
            return
        }

        try {
            setLoading(true)
            setMessage('')

            const response = await fetch(
                `${API_URL}/auth/register`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                }
            )

            const result = await response.text()

            if (response.ok) {
                setMessage('Administrator registered successfully! Redirecting to login...')

                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')

                setTimeout(() => {
                    window.location.href = '/'
                }, 1500)

            } else {
                setMessage(result || 'Registration failed.')
            }

        } catch (error) {
            console.error(error)
            setMessage('Unable to connect to the server.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-register-page">

            <div className="admin-register-card">

                <div className="admin-register-icon">
                    <i className="bi bi-person-lock"></i>
                </div>

                <h2>Register Administrator</h2>

                <p className="admin-register-subtitle">
                    Create your administrator account
                </p>

                {message && (
                    <div className={`alert ${
                        message.includes('successfully')
                            ? 'alert-success'
                            : 'alert-danger'
                    }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    <div className="mb-4">
                        <label className="form-label">
                            Administrator Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter administrator username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Administrator Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter administrator email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Register Admin'}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default RegisterAdmin
