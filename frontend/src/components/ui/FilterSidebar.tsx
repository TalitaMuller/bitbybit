import React from 'react';

interface FilterSidebarProps {
    stores: string[];
    selectedStores: string[];
    onStoreChange: (store: string) => void;

    priceRange: { min: string; max: string };
    onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    stores,
    selectedStores,
    onStoreChange,
    priceRange,
    onPriceChange,
}) => {
    return (
        <aside className="w-full md:w-64 bg-gray-800 p-6 rounded-lg self-start">
            <h3 className="text-xl font-bold text-white mb-4">Filtros</h3>

            <div>
                <h4 className="font-semibold text-white mb-2">Lojas</h4>
                <div className="space-y-2">
                    {stores.map((store) => (
                        <label key={store} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600"
                                checked={selectedStores.includes(store)}
                                onChange={() => onStoreChange(store)}
                            />
                            <span className="text-gray-300">{store}</span>
                        </label>
                    ))}
                </div>
            </div>

            <hr className="my-6 border-gray-700" />


            <div>
                <h4 className="font-semibold text-white mb-2">Faixa de Preço</h4>
                <div className="flex items-center space-x-2">
                    <input
                        type="number"
                        name="min"
                        placeholder="Mín"
                        value={priceRange.min}
                        onChange={onPriceChange}
                        className="w-full bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        name="max"
                        placeholder="Máx"
                        value={priceRange.max}
                        onChange={onPriceChange}
                        className="w-full bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>
            </div>
        </aside>
    );
};