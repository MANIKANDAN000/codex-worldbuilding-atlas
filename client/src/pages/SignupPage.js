import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../api/auth.service';
import '../styles/SignupPage.css';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        try {
            await authService.signup(requestBody);
            // After successful signup, redirect to the login page
            navigate('/login');
        } catch (error) {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        }
    };

    return (
        <main>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />

                <label>Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    minLength="6"
                />

                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </main>
    );
}

export default SignupPage;