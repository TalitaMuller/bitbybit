import React from 'react';
import { Link } from 'react-router-dom';

interface Product { id: number; name: string; }
interface ComparisonBarProps {
    products: Product[];
    compareList: number[];
    onRemove: (id: number) => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({ products, compareList, onRemove }) => {
    if (compareList.length === 0) {
        return null; 
    }

    const selectedProducts = products.filter(p => compareList.includes(p.id));

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg p-4 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-white">Comparando:</span>
                    {selectedProducts.map(product => (
                        <div key={product.id} className="bg-gray-700 rounded-full px-3 py-1 text-sm text-white flex items-center gap-2">
                            {product.name}
                            <button onClick={() => onRemove(product.id)} className="text-red-400 hover:text-red-600">
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
                <Link to="/comparar">
                    <button
                        disabled={compareList.length < 2}
                        className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Comparar ({compareList.length})
                    </button>
                </Link>
            </div>
        </div>
    );
};