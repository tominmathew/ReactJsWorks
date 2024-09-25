import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('username'); // Check if username is in localStorage

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
