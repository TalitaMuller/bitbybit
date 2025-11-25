import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/ui/SearchBar';
import { ProductCard } from '../components/ui/ProductCard';
import { FilterSidebar } from '../components/ui/FilterSidebar';

interface Product {
    id: number;
    name: string;
    price: number;
    store: string;
    imageUrl: string;
    description: string;
}

interface HomePageProps {
    products: Product[];
    compareList: number[];
    onToggleCompare: (id: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ products, compareList, onToggleCompare }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [selectedStores, setSelectedStores] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const availableStores = useMemo(() => {
        return [...new Set(products.map(p => p.store))];
    }, [products]);

    const processedProducts = useMemo(() => {
        let tempProducts = [...products];
        if (searchTerm) { tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())); }
        if (selectedStores.length > 0) { tempProducts = tempProducts.filter(p => selectedStores.includes(p.store)); }
        const minPrice = parseFloat(priceRange.min);
        const maxPrice = parseFloat(priceRange.max);
        if (!isNaN(minPrice)) { tempProducts = tempProducts.filter(p => p.price >= minPrice); }
        if (!isNaN(maxPrice)) { tempProducts = tempProducts.filter(p => p.price <= maxPrice); }
        if (sortOrder === 'price-asc') { tempProducts.sort((a, b) => a.price - b.price); }
        else if (sortOrder === 'price-desc') { tempProducts.sort((a, b) => b.price - a.price); }
        return tempProducts;
    }, [searchTerm, products, sortOrder, selectedStores, priceRange]);

    const handleStoreChange = (store: string) => { setSelectedStores(prev => prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]); };
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPriceRange(prev => ({ ...prev, [e.target.name]: e.target.value })); };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <FilterSidebar
                stores={availableStores}
                selectedStores={selectedStores}
                onStoreChange={handleStoreChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
            />
            <div className="flex-grow">
                <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <div className="mb-6 flex justify-end">
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-gray-700 border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500">
                        <option value="default">Ordenar por</option>
                        <option value="price-asc">Preço: Menor para Maior</option>
                        <option value="price-desc">Preço: Maior para Menor</option>
                    </select>
                </div>
                {processedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                store={product.store}
                                imageUrl={product.imageUrl}
                                isSelectedForCompare={compareList.includes(product.id)}
                                onToggleCompare={onToggleCompare}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-800 rounded-lg">
                        <p className="text-gray-400">Nenhum produto encontrado com esses filtros.</p>
                    </div>
                )}
            </div>
        </div>
    );
};