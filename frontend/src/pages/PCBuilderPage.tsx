// src/pages/PCBuilderPage.tsx
import React, { useState, useMemo } from 'react';
import { PartSelector } from '../components/ui/PartSelector.tsx'; // Criaremos este componente a seguir

// Definindo a "forma" de um produto
interface Product {
    id: number;
    name: string;
    price: number;
    store: string;
    imageUrl: string;
    description: string;
    category: string;
}

interface PCBuilderPageProps {
    products: Product[];
}

// Definindo os slots de componentes para a nossa build
const componentSlots = [
    'Processador',
    'Placa Mãe',
    'Memória RAM',
    'Placa de Vídeo',
    'Armazenamento',
    'Fonte',
    'Monitor',
];

export const PCBuilderPage: React.FC<PCBuilderPageProps> = ({ products }) => {
    // Estado para guardar o produto selecionado para cada slot
    const [selectedParts, setSelectedParts] = useState<Record<string, Product | null>>({});

    // Função para selecionar uma peça
    const handleSelectPart = (category: string, product: Product) => {
        setSelectedParts(prev => ({
            ...prev,
            [category]: product,
        }));
    };

    // Função para remover uma peça
    const handleRemovePart = (category: string) => {
        setSelectedParts(prev => ({
            ...prev,
            [category]: null,
        }));
    };

    // Calcula o preço total da build
    const totalPrice = useMemo(() => {
        return Object.values(selectedParts).reduce((total, part) => {
            return total + (part?.price || 0);
        }, 0);
    }, [selectedParts]);

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