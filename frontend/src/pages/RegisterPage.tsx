import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao cadastrar');
            }

            setMessage({ type: 'success', text: 'Usuário cadastrado com sucesso! Redirecionando para o login...' });
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Erro desconhecido' });
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Criar Conta</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300">Nome de Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full mt-1 bg-gray-700 rounded-md p-3 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mt-1 bg-gray-700 rounded-md p-3 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
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
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-600 transition-colors"
                >
                    Cadastrar
                </button>
            </form>
            
            {message && (
                <p className={`mt-4 text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {message.text}
                </p>
            )}

            <p className="text-center text-gray-400 mt-6">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-cyan-400 hover:underline">
                    Faça login
                </Link>
            </p>
        </div>
    );
};