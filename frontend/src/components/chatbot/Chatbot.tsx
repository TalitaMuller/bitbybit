import React, { useState, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatWindow } from './ChatWindow';
import { useAuth } from '../../context/AuthContext';

interface GeminiMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

interface Conversation {
    id: number;
    title: string;
}

const guestInitialMessage: GeminiMessage = { 
    role: 'model', 
    parts: [{ text: 'Olá! Sou o Byb. Faça login para salvar seu histórico ou clique aqui se precisar de ajuda!' }] 
};

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<GeminiMessage[]>([guestInitialMessage]);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAuth();
    
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<number | null>(null);

    const fetchConversations = async () => {
        if (!token) return;
        try {
            const res = await fetch('http://localhost:3001/api/chat/conversations', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setConversations(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        if (!token) {
            setMessages([guestInitialMessage]);
            setConversations([]);
            setActiveConversationId(null);
            return;
        }

        if (token && isOpen) {
            setMessages([{ role: 'model', parts: [{ text: 'Olá! Selecione uma conversa ou comece uma nova.' }] }]);
            setConversations([]);
            setActiveConversationId(null);
            fetchConversations();
        }
    }, [token, isOpen]);

    const handleSelectConversation = async (id: number | null) => {
        setActiveConversationId(id);
        if (id === null) {
            setMessages([{ role: 'model', parts: [{ text: 'Olá! Nova conversa iniciada.' }] }]);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/api/chat/history/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setMessages(data);
        } catch (error) { console.error(error); }
        finally { setIsLoading(false); }
    };

    const handleDeleteConversation = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); 
        if (!token) return;
        if (!confirm('Excluir esta conversa?')) return;

        try {
            await fetch(`http://localhost:3001/api/chat/conversations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setConversations(prev => prev.filter(c => c.id !== id));

            if (activeConversationId === id) {
                setActiveConversationId(null);
                setMessages([{ role: 'model', parts: [{ text: 'Olá! Comece uma nova conversa.' }] }]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async (userMessage: string) => {
        const newUserMessage: GeminiMessage = { role: 'user', parts: [{ text: userMessage }] };
        
        let currentHistory: GeminiMessage[];
        const isGreeting = messages.length === 1 && (
            messages[0].parts[0].text.startsWith('Olá! Sou o Byb') || 
            messages[0].parts[0].text.startsWith('Olá! Selecione') ||
            messages[0].parts[0].text.startsWith('Olá! Nova conversa')
        );

        if (isGreeting) {
            currentHistory = [newUserMessage];
        } else {
            currentHistory = [...messages, newUserMessage];
        }

        setMessages(currentHistory);
        setIsLoading(true);

        try {
            const headers: HeadersInit = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ 
                    history: currentHistory,
                    conversationId: activeConversationId 
                }),
            });

            const data = await response.json();
            const botReply = data.reply || "Desculpe, tive um erro de conexão.";
            
            if (data.conversationId && activeConversationId !== data.conversationId) {
                setActiveConversationId(data.conversationId);
                fetchConversations(); 
            }

            setMessages(prev => [...prev, { role: 'model', parts: [{ text: botReply }] }]);

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Erro ao conectar com o servidor." }] }]);
        } finally {
            setIsLoading(false);
        }
    };

    const chatWindowMessages = messages.map(msg => ({
        sender: msg.role === 'user' ? 'user' : 'bot' as 'user' | 'bot',
        text: msg.parts[0]?.text || ''
    }));

    return (
        <>
            <ChatBubble onClick={() => setIsOpen(true)} />
            {isOpen && (
                <ChatWindow
                    messages={chatWindowMessages}
                    onSendMessage={handleSendMessage}
                    onClose={() => setIsOpen(false)}
                    isLoading={isLoading}
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    onDeleteConversation={handleDeleteConversation} 
                />
            )}
        </>
    );
};