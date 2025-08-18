// src/components/ui/PartSelector.tsx
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
}

interface PartSelectorProps {
    category: string;
    products: Product[];
    selectedPart: Product | null;
    onSelectPart: (category: string, product: Product) => void;
    onRemovePart: (category: string) => void;
}

export const PartSelector: React.FC<PartSelectorProps> = ({ category, products, selectedPart, onSelectPart, onRemovePart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSelect = (product: Product) => {
        onSelectPart(category, product);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-gray-900/50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {selectedPart ? (
                        <>
                            <img src={selectedPart.imageUrl} alt={selectedPart.name} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                                <p className="font-bold text-white">{selectedPart.name}</p>
                                <p className="text-sm text-cyan-400">
                                    {selectedPart.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center">
                            <span className="text-gray-500 text-xs text-center">Escolha</span>
                        </div>
                    )}
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
                <div>
                    {selectedPart ? (
                        <button
                            onClick={() => onRemovePart(category)}
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600"
                        >
                            Remover
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600"
                        >
                            Escolher
                        </button>
                    )}
                </div>
            </div>

            {/* Modal para seleção de peças */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-30">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Selecione: {category}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 text-2xl">&times;</button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {products.map(product => (
                                    <div key={product.id} className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                        <p className="text-white font-semibold flex-grow">{product.name}</p>
                                        <p className="text-cyan-400 font-bold my-2">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        <button
                                            onClick={() => handleSelect(product)}
                                            className="w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600"
                                        >
                                            Selecionar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};