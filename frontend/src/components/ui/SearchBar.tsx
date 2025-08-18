import React from 'react';

interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="w-full max-w-2xl mx-auto my-8">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="search"
                    placeholder="Digite o nome de um produto..."
                    className="block w-full bg-gray-700 border border-transparent rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:border-cyan-500 focus:ring-cyan-500 focus:text-gray-900 transition-colors"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};