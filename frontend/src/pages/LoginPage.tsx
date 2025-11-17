// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Importe o hook!

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'error', text: string } | null>(null);
    
    // 2. Pegue a função de login e o estado de loading do contexto
    const { login, isLoading } = useAuth();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            // 3. Chame a função de login do contexto!
            await login(email, password);
            // O redirecionamento já é feito dentro da função 'login'
            
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro desconhecido' });
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mt-1 bg-gray-700 rounded-md p-3 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                        disabled={isLoading} // 4. Desabilita o campo
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mt-1 bg-gray-700 rounded-md p-3 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                        disabled={isLoading} // 4. Desabilita o campo
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-600"
                    disabled={isLoading} // 5. Desabilita o botão
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-red-400">
                    {message.text}
                </p>
            )}

            <p className="text-center text-gray-400 mt-6">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-cyan-400 hover:underline">
                    Cadastre-se
                </Link>
            </p>
        </div>
    );
};