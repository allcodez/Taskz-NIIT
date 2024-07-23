import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const userId = sessionStorage.getItem('userId');
    // const token = sessionStorage.getItem('token');

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
