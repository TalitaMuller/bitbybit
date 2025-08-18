// src/components/chatbot/ChatBubble.tsx
import React from 'react';

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
            {/* Ícone de Robô (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-1.414-8.414L16 6m-8.414 9.414L6 16m6-6a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
        </button>
    );
};