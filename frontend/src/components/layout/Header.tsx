import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
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
                        to="/sobre"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        className="text-white hover:text-cyan-400 transition-colors"
                    >
                        Sobre o Byb
                    </NavLink>
                    <NavLink
                        to="/montador"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        className="text-white hover:text-cyan-400 transition-colors"
                    >
                        Montador de PC
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};