import React from 'react';

export const AboutPage: React.FC = () => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">Sobre o Byb</h2>
            <p className="text-lg">
                Byb é o seu assistente de IA pessoal, especialista em hardware e software.
            </p>
            <p className="mt-2">
                Ele foi projetado para te ajudar a encontrar as melhores peças, tirar dúvidas
                e garantir que você faça a melhor compra para suas necessidades.
            </p>
        </div>
    );
};