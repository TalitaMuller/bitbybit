// src/components/layout/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
    element: React.ReactElement; // A página que queremos proteger (ex: <PCBuilderPage />)
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { user, isLoading } = useAuth();

    // 1. Espera o AuthContext terminar de carregar do localStorage
    if (isLoading) {
        // Você pode colocar um "Spinner" de loading aqui
        return <div>Carregando...</div>;
    }

    // 2. Se não estiver carregando e NÃO houver usuário...
    if (!user) {
        // Redireciona o usuário para a página de login
        return <Navigate to="/login" replace />;
    }

    // 3. Se o usuário existir, mostre a página que ele tentou acessar
    return element;
};