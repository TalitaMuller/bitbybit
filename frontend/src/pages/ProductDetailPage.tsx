import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    price: number;
    store: string;
    imageUrl: string;
    description: string;
}

interface ProductDetailPageProps {
    products: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
    const { id } = useParams<{ id: string }>();
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl text-red-500">Produto não encontrado!</h2>
                <Link to="/" className="text-cyan-400 hover:underline mt-4 inline-block">Voltar para a busca</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full md:w-1/2 rounded-lg object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1a202c/9f7aea?text=Imagem+N/D' }}
                />
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                    <p className="text-sm text-gray-400 mb-4">Vendido e entregue por: {product.store}</p>
                    <p className="text-4xl font-bold text-cyan-400 mb-6">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <h3 className="text-xl font-semibold text-white mb-2">Descrição</h3>
                    <p className="text-gray-300">{product.description}</p>
                    <button className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                        Ir para a loja
                    </button>
                </div>
            </div>
        </div>
    );
};