import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    element: React.ReactElement; 
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return element;
};