// src/components/chatbot/ChatWindow.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

// A correção está aqui nesta interface
interface ChatWindowProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    onClose: () => void;
    isLoading: boolean; // Adicionamos a propriedade que estava faltando
}

// E aqui na lista de parâmetros da função
export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onClose, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue('');
        }
    };

    return (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-800 rounded-lg shadow-xl flex flex-col z-30">
            {/* Cabeçalho */}
            <div className="bg-gray-900 p-4 rounded-t-lg flex justify-between items-center">
                <h3 className="font-bold text-white">Fale com o Byb</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
            </div>

            {/* Corpo das Mensagens */}
            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === 'user'
                                    ? 'bg-cyan-500 text-white rounded-br-none'
                                    : 'bg-gray-700 text-gray-200 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {/* Indicador de "digitando..." */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-gray-200 rounded-bl-none">
                                <span className="animate-pulse">Byb está digitando...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t border-gray-700">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite sua dúvida..."
                        className="flex-grow bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                        disabled={isLoading} // Opcional: desabilita o input enquanto o bot responde
                    />
                    <button
                        type="submit"
                        className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 disabled:bg-gray-600"
                        disabled={isLoading} // Opcional: desabilita o botão enquanto o bot responde
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};