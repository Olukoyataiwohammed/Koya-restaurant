import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    // if authenticated, render child routes/components (outlet)
    // otherwise, redirect to the login page

    return isAuthenticated ? <Outlet/> : <Navigate to="/account" replace/>

  
};

export default PrivateRoute;