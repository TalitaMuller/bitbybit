import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    store: string;
    imageUrl: string;
    isSelectedForCompare: boolean;
    onToggleCompare: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, store, imageUrl, isSelectedForCompare, onToggleCompare }) => {

    const handleCompareClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        onToggleCompare(id);
    };

    const buttonStyle = isSelectedForCompare
        ? "bg-cyan-500 text-white"
        : "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <Link to={`/produto/${id}`} className="block group">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col justify-between transform transition-all group-hover:scale-105 group-hover:shadow-cyan-500/20">
                <div>
                    <img className="w-full h-48 object-cover bg-gray-700" src={imageUrl} alt={name} onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x200/1a202c/9f7aea?text=Imagem+N/D' }} />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2 h-14">{name}</h3>
                        <p className="text-2xl font-bold text-cyan-400">
                            {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">Vendido por: {store}</p>
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <button
                        onClick={handleCompareClick}
                        className={`w-full font-bold py-2 px-4 rounded-md transition-colors ${buttonStyle}`}
                    >
                        {isSelectedForCompare ? 'Remover da Comparação' : 'Comparar'}
                    </button>
                </div>
            </div>
        </Link>
    );
};