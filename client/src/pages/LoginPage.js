import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // CORRECT: Import the useAuth hook
import authService from '../api/auth.service';
import './AuthPages.css'; // A shared stylesheet for Login and Signup pages
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false); // State to track login process

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useAuth(); // CORRECT: Use the hook

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        setIsLoading(true); // Show loading feedback

        try {
            const response = await authService.login(requestBody);
            
            // CORRECT: The key from the backend is 'authToken'
            storeToken(response.data.authToken); 
            
            await authenticateUser(); // Verify token and set user state
            navigate('/dashboard'); // Redirect to dashboard on success
        } catch (error) {
            // Safely access the error message
            const errorDescription = error.response?.data?.message || "An unexpected error occurred. Please try again.";
            setErrorMessage(errorDescription);
            setIsLoading(false); // Stop loading on error
        }
    };

    return (
        <main className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Disable button during login process */}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                
                <p className="redirect-link">
                    Don't have an account yet? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </main>
    );
}

export default LoginPage;