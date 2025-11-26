import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

interface Conversation {
    id: number;
    title: string;
}

interface ChatWindowProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    onClose: () => void;
    isLoading: boolean;
    conversations: Conversation[];
    activeConversationId: number | null;
    onSelectConversation: (id: number | null) => void;
    onDeleteConversation: (id: number, e: React.MouseEvent) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
    messages, 
    onSendMessage, 
    onClose, 
    isLoading,
    conversations,
    activeConversationId,
    onSelectConversation,
    onDeleteConversation 
}) => {
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
        : "fixed bottom-24 right-6 w-[800px] h-[600px] rounded-lg z-30"; 

    return (
        <div className={`bg-gray-800 shadow-xl flex overflow-hidden ${windowClasses}`}>
            
            <div className="w-64 bg-gray-900 flex-shrink-0 flex flex-col border-r border-gray-700">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-white">Conversas</h3>
                    <button onClick={() => onSelectConversation(null)} className="text-cyan-400 hover:text-white text-sm">
                        + Nova
                    </button>
                </div>
                <div className="overflow-y-auto flex-grow p-2 space-y-1">
                    {conversations.length === 0 && <p className="text-gray-500 text-center text-sm mt-4">Nenhuma conversa.</p>}
                    
                    {conversations.map(conv => (
                        <div 
                            key={conv.id}
                            className={`group flex items-center w-full rounded-md px-2 ${
                                activeConversationId === conv.id ? 'bg-cyan-600' : 'hover:bg-gray-700'
                            }`}
                        >
                            <button
                                onClick={() => onSelectConversation(conv.id)}
                                className={`flex-grow text-left py-2 text-sm truncate ${
                                    activeConversationId === conv.id ? 'text-white' : 'text-gray-300'
                                }`}
                            >
                                {conv.title}
                            </button>
                            
                            <button
                                onClick={(e) => onDeleteConversation(conv.id, e)}
                                className={`p-1 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ${
                                    activeConversationId === conv.id ? 'text-white' : ''
                                }`}
                                title="Excluir"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex-grow flex flex-col bg-gray-800">
                <div className="bg-gray-900 p-4 flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                        {activeConversationId ? 'Conversa #' + activeConversationId : 'Nova Conversa'}
                    </span>
                    <div className="flex gap-3">
                        <button onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-400 hover:text-white">
                            {isFullScreen ? 'Restaurar' : 'Expandir'}
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-white font-bold">X</button>
                    </div>
                </div>

                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {msg.sender === 'bot' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && <span className="text-gray-400 text-sm ml-2">Byb digitando...</span>}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="p-4 border-t border-gray-700">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Digite sua dúvida..."
                            className="flex-grow bg-gray-700 rounded-md p-2 text-white"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-cyan-500 text-white px-4 rounded-md disabled:bg-gray-600" disabled={isLoading}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};