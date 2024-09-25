import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('username'); // Check if username exists

    if (isAuthenticated) {
        navigate('/dashboard'); // Redirect to dashboard if authenticated
        return null; // Prevent rendering of the login form
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password
            });
            localStorage.setItem('username', username);
            alert(response.data); // Handle login success
            navigate('/dashboard')
        } catch (error) {
            console.error(error);
            alert(error.response.data);
        }
    };

    return (
        <div className="formContainer">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="inputGroup">
                    <label>Username:</label>
                    <input required
                        autoComplete='off'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="inputGroup">
                    <label>Password:</label>
                    <input required
                        autoComplete="off"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Dont have an account?{' '}
                <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
