// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Definimos os "formatos" (interfaces)
interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>; // Função de login
    logout: () => void; // Função de logout
    isLoading: boolean; // Para sabermos se está carregando
}

// 2. Criamos o Contexto
// @ts-ignore: Vamos prover um valor real no AuthProvider
const AuthContext = createContext<AuthContextType>(null);

// 3. Criamos o "Provedor" (o componente que vai gerenciar tudo)
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Efeito para carregar o token do localStorage quando o app inicia
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Função de Login
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Falha no login');
            }

            // Se o login deu certo:
            setUser(data.user);
            setToken(data.token);

            // Salvamos no localStorage para "lembrar" do usuário
            localStorage.setItem('authUser', JSON.stringify(data.user));
            localStorage.setItem('authToken', data.token);

            navigate('/'); // Leva o usuário para a Home
            
        } catch (error) {
            console.error('Erro no login:', error);
            // Re-lança o erro para o LoginPage poder tratar
            throw error; 
        } finally {
            setIsLoading(false);
        }
    };

    // Função de Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
        navigate('/login'); // Leva o usuário para o Login
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Criamos o "Hook" (o atalho para usar o contexto)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};