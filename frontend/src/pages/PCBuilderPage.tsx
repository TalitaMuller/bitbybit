import React, { useState, useMemo } from 'react';
import { PartSelector } from '../components/ui/PartSelector';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types';



interface PCBuilderPageProps {
    products: Product[];
}

const componentSlots = [
    'Processador',
    'Cooler', 
    'Placa Mãe',
    'Memória RAM',
    'Placa de Vídeo',
    'Armazenamento',
    'Fonte',
    'Gabinete', 
    'Monitor',
];

export const PCBuilderPage: React.FC<PCBuilderPageProps> = ({ products }) => {
    const [selectedParts, setSelectedParts] = useState<Record<string, Product | null>>({});

    const { token } = useAuth(); 
    const [buildName, setBuildName] = useState('Minha Build'); 
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSelectPart = (category: string, product: Product) => {
        setSelectedParts(prev => ({
            ...prev,
            [category]: product,
        }));
    };

    const handleRemovePart = (category: string) => {
        setSelectedParts(prev => ({
            ...prev,
            [category]: null,
        }));
    };

    const totalPrice = useMemo(() => {
        return Object.values(selectedParts).reduce((total, part) => {
            return total + (part?.price || 0);
        }, 0);
    }, [selectedParts]); 

    const handleSaveBuild = async () => {
        if (!token) {
            setMessage({ type: 'error', text: 'Você precisa estar logado para salvar.' });
            return;
        }

        const partsToSave = Object.entries(selectedParts)
            .filter(([_, part]) => part !== null) 
            .map(([category, part]) => ({
                category: category,
                product_id: part!.id,
                product_name: part!.name
            }));

        if (partsToSave.length === 0) {
            setMessage({ type: 'error', text: 'Sua build está vazia!' });
            return;
        }

        setIsSaving(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:3001/api/builds/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    name: buildName,
                    parts: partsToSave
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Falha ao salvar build');
            }

            setMessage({ type: 'success', text: 'Build salva com sucesso!' });

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Monte seu PC</h1>
                <div className="text-right">
                    <p className="text-gray-400">Preço Total</p>
                    <p className="text-3xl font-bold text-cyan-400">
                        {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                </div>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg flex items-center justify-between mb-6">
                <input
                    type="text"
                    value={buildName}
                    onChange={(e) => setBuildName(e.target.value)}
                    className="bg-gray-700 text-white text-lg font-semibold rounded-md p-2 w-1/2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                <button
                    onClick={handleSaveBuild}
                    disabled={isSaving}
                    className="bg-green-500 text-white font-bold py-3 px-6 rounded-md hover:bg-green-600 disabled:bg-gray-600"
                >
                    {isSaving ? 'Salvando...' : 'Salvar Build'}
                </button>
            </div>
            
            {message && (
                <p className={`mb-4 text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {message.text}
                </p>
            )}

            <div className="space-y-4">
                {componentSlots.map(category => (
                    <PartSelector
                        key={category}
                        category={category}
                        products={products.filter(p => p.category === category)}
                        selectedPart={selectedParts[category] || null}
                        onSelectPart={handleSelectPart}
                        onRemovePart={handleRemovePart}
                    />
                ))}
            </div>
        </div>
    );
};