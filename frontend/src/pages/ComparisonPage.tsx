import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    store: string;
    imageUrl: string;
    description: string;
}

interface ComparisonPageProps {
    products: Product[];
    compareList: number[];
}

export const ComparisonPage: React.FC<ComparisonPageProps> = ({ products, compareList }) => {
    const selectedProducts = products.filter(p => compareList.includes(p.id));

    if (selectedProducts.length === 0) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl text-gray-400">Nenhum produto selecionado para comparação.</h2>
                <Link to="/" className="text-cyan-400 hover:underline mt-4 inline-block">Voltar para a busca</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Tabela de Comparação</h1>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="p-4 w-1/5 text-white">Atributo</th>
                            {selectedProducts.map(product => (
                                <th key={product.id} className="p-4 text-cyan-400">{product.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-700">
                            <td className="p-4 font-semibold text-white">Imagem</td>
                            {selectedProducts.map(product => (
                                <td key={product.id} className="p-4">
                                    <img src={product.imageUrl} alt={product.name} className="h-32 w-auto mx-auto rounded-md" />
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b border-gray-700 bg-gray-900/50">
                            <td className="p-4 font-semibold text-white">Preço</td>
                            {selectedProducts.map(product => (
                                <td key={product.id} className="p-4 text-xl font-bold">
                                    {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b border-gray-700">
                            <td className="p-4 font-semibold text-white">Loja</td>
                            {selectedProducts.map(product => (
                                <td key={product.id} className="p-4">{product.store}</td>
                            ))}
                        </tr>
                        <tr className="bg-gray-900/50">
                            <td className="p-4 font-semibold text-white">Descrição</td>
                            {selectedProducts.map(product => (
                                <td key={product.id} className="p-4 text-sm">{product.description}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};