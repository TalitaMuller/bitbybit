import React from 'react';
import roboIcone from '../../assets/robo.png';

interface ChatBubbleProps {
    onClick: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 bg-cyan-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform transition-transform hover:scale-110 focus:outline-none z-20"
            aria-label="Abrir chat de ajuda"
        >
            
            <img src={roboIcone} alt="Ícone do chatbot Byb" className="h-8 w-8" />
        </button>
    );
};