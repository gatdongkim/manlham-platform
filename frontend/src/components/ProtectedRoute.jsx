import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/Loader';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // 1. Handle the "Checking Auth" state
    if (loading) {
        return <Loader fullPage label="Securing Session..." />;
    }

    // 2. Not Logged In? 
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // 3. Logged In but Wrong Role?
    // Instead of showing "Access Denied", we send them to their specific home base
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        console.warn(`Access denied for role: ${user?.role}. Redirecting to dashboard.`);
        
        const role = user?.role?.toUpperCase();
        if (role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
        if (role === 'MSME') return <Navigate to="/client/dashboard" replace />;
        if (role === 'PRO') return <Navigate to="/students/dashboard" replace />;
        
        return <Navigate to="/unauthorized" replace />;
    }

    // 4. Authorized - Render the child routes
    return <Outlet />;
};

export default ProtectedRoute;