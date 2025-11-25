import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types'; 

interface BuildComponent {
    build_id: number;
    category: string;
    product_id: number;
    product_name: string;
}

interface Build {
    id: number;
    name: string;
    created_at: string;
    components: BuildComponent[];
}

export const MyBuildsPage: React.FC = () => {
    const [builds, setBuilds] = useState<Build[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); 

    useEffect(() => {
        const fetchBuilds = async () => {
            if (!token) {
                setError('Você precisa estar logado para ver suas builds.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/builds', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar builds.');
                }

                const data: Build[] = await response.json();
                setBuilds(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuilds();
    }, [token]); 

    if (isLoading) {
        return <div className="text-center text-white">Carregando builds...</div>;
    }

    if (error) {
        return <div className="text-center text-red-400">{error}</div>;
    }

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Minhas Builds Salvas</h1>
            
            {builds.length === 0 ? (
                <p className="text-gray-400">Você ainda não salvou nenhuma build.</p>
            ) : (
                <div className="space-y-6">
                    {builds.map(build => (
                        <div key={build.id} className="bg-gray-900/50 p-6 rounded-lg">
                            <h2 className="text-2xl font-semibold text-cyan-400 mb-3">{build.name}</h2>
                            <p className="text-sm text-gray-400 mb-4">
                                Salvo em: {new Date(build.created_at).toLocaleDateString('pt-BR')}
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                {build.components.map(comp => (
                                    <li key={comp.product_id} className="text-gray-300">
                                        <span className="font-semibold text-white">{comp.category}:</span> {comp.product_name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};