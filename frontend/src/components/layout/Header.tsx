// src/components/layout/Header.tsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. Importe o hook

export const Header: React.FC = () => {
    const { user, logout } = useAuth(); // 2. Pegue o usuário e a função de logout

    const activeLinkStyle = {
        color: '#2dd4bf',
        textDecoration: 'underline',
    };

    return (
        <header className="bg-gray-800 shadow-md sticky top-0 z-10">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-2xl font-bold text-white">
                        Bit<span className="text-cyan-400">By</span>Bit
                    </h1>
                </Link>
                <div className="flex items-center space-x-6">
                    <NavLink
                        to="/"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        className="text-white hover:text-cyan-400 transition-colors"
                    >
                        Buscar
                    </NavLink>
                    <NavLink
                        to="/montador"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        className="text-white hover:text-cyan-400 transition-colors"
                    >
                        Montador de PC
                    </NavLink>

                    {/* --- A MÁGICA ACONTECE AQUI --- */}
                    {user ? (
                        // 3. Se o usuário ESTIVER logado
                        <>
                            <NavLink
                                to="/my-builds"
                                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                                className="text-white hover:text-cyan-400 transition-colors"
                            >
                                Minhas Builds
                            </NavLink>
                            <span className="text-gray-300">
                                Olá, <span className="font-bold text-cyan-400">{user.username}</span>
                            </span>
                            <button
                                onClick={logout}
                                className="text-white hover:text-cyan-400 transition-colors"
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        // 4. Se o usuário NÃO ESTIVER logado
                        <>
                            <NavLink
                                to="/login"
                                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                                className="text-white hover:text-cyan-400 transition-colors"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                                className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600"
                            >
                                Cadastre-se
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};