// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuth();
  
    // return (
    //     <Route
    //         {...rest}
    //         element={isAuthenticated ? element : <Navigate to="/login" replace />}
    //     />
    // );

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
