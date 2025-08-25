// src/components/chatbot/Chatbot.tsx
import React, { useState } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatWindow } from './ChatWindow';

interface GeminiMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<GeminiMessage[]>([
        { role: 'model', parts: [{ text: 'Olá! Sou o Byb. Clique aqui se precisar de ajuda com seu hardware!' }] }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (userMessage: string) => {
        const newUserMessage: GeminiMessage = { role: 'user', parts: [{ text: userMessage }] };
        const currentConversation = [...messages, newUserMessage];
        setMessages(currentConversation);
        setIsLoading(true);

        const historyForApi = currentConversation.slice(1);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: historyForApi }),
            });

            if (!response.ok) {
                throw new Error('A resposta da rede não foi OK.');
            }

            const data = await response.json();
            // Verificação de segurança: garantimos que a resposta existe
            const botReply = data.reply || "Desculpe, não consegui pensar em uma resposta.";
            const botResponse: GeminiMessage = { role: 'model', parts: [{ text: botReply }] };

            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            const errorResponse: GeminiMessage = { role: 'model', parts: [{ text: 'Desculpe, estou com problemas para me conectar. Tente novamente mais tarde.' }] };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    // A CORREÇÃO PRINCIPAL ESTÁ AQUI
    // Adicionamos `?.text || ''` para garantir que, se a mensagem for inválida,
    // ela se torne um texto vazio em vez de `undefined`, evitando o crash.
    const chatWindowMessages = messages.map(msg => ({
        sender: msg.role === 'user' ? 'user' : 'bot',
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
                />
            )}
        </>
    );
};