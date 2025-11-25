import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface ChatWindowProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    onClose: () => void;
    isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, onClose, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const [isFullScreen, setIsFullScreen] = useState(false);
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

    const windowClasses = isFullScreen
        ? "fixed inset-0 w-full h-full rounded-none z-30"
        : "fixed bottom-24 right-6 w-96 h-[500px] rounded-lg z-30";

    return (
        <div className={`bg-gray-800 shadow-xl flex flex-col ${windowClasses}`}>
            <div className="bg-gray-900 p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
                <h3 className="font-bold text-white">Fale com o Byb</h3>
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-400 hover:text-white">
                        {isFullScreen ? (
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h4v4M20 10h-4V6" />
                            </svg>
                        ) : (
                            
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" />
                            </svg>
                        )}
                    </button>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-xl px-4 py-2 rounded-lg ${msg.sender === 'user'
                                        ? 'bg-cyan-500 text-white rounded-br-none'
                                        : 'bg-gray-700 text-gray-200 rounded-bl-none'
                                    }`}
                            >
                                {msg.sender === 'bot' && msg.text ? (
                                    <div className="prose prose-invert prose-sm">
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}
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

            <div className="p-4 border-t border-gray-700 flex-shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite sua dúvida..."
                        className="flex-grow bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 disabled:bg-gray-600" disabled={isLoading}>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};