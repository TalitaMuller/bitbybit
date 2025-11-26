const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const jwt = require('jsonwebtoken');
const pool = require('./db.js');
const authenticateToken = require('./authMiddleware.js');
require('dotenv').config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//const systemInstruction = `
//  Você é o Byb, um assistente de IA especialista em hardware. 
//  Responda de forma curta e objetiva.
//`;

const systemInstruction = `
  Você é o Byb, um assistente de IA especialista em hardware e software de computadores.
  Sua personalidade é amigável, prestativa e um pouco "nerd" de forma entusiasmada.
  Seu objetivo principal é ajudar usuários a escolher as melhores peças para seus computadores,
  tirar dúvidas sobre compatibilidade, e dar recomendações baseadas em orçamento e necessidade.
  Responda sempre em português do Brasil.
  Se o usuário fizer uma pergunta fora do tópico de hardware ou software,
  gentilmente redirecione a conversa de volta para sua especialidade.
  Por exemplo: "Essa é uma ótima pergunta, mas meu foco é em bits e bytes! Que tal falarmos sobre qual processador se encaixaria melhor no seu setup?".
`;

router.get('/conversations', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const [conversations] = await pool.query(
            `SELECT id, title, created_at FROM conversations WHERE user_id = ? ORDER BY created_at DESC`,
            [userId]
        );
        res.json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar conversas.' });
    }
});

router.get('/history/:conversationId', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const conversationId = req.params.conversationId;

        const [checkOwner] = await pool.query(
            'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
            [conversationId, userId]
        );

        if (checkOwner.length === 0) {
            return res.status(403).json({ error: 'Acesso negado.' });
        }

        const [history] = await pool.query(
            `SELECT role, content AS text 
             FROM chat_history 
             WHERE conversation_id = ? 
             ORDER BY created_at ASC`,
            [conversationId]
        );
        
        const geminiHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        res.json(geminiHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar mensagens.' });
    }
});

router.post('/', async (req, res) => {
    let userId = null;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            userId = user.userId;
        }
    } catch (error) { console.log("Visitante"); }

    try {
        let { history, conversationId } = req.body; 

        const lastMessageObj = history.pop(); 
        const lastMessage = lastMessageObj.parts[0].text;

        while (history.length > 0 && history[0].role === 'model') {
            history.shift(); 
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash", 
            systemInstruction: systemInstruction,
        });

        const chat = model.startChat({ history: history });
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const botResponse = response.text();

        if (userId) {
            let finalConversationId = conversationId;

            if (!finalConversationId) {
                const title = lastMessage.substring(0, 30) + '...';
                const [newConv] = await pool.query(
                    'INSERT INTO conversations (user_id, title) VALUES (?, ?)',
                    [userId, title]
                );
                finalConversationId = newConv.insertId;
            }

            await pool.query(
                `INSERT INTO chat_history (user_id, conversation_id, role, content) VALUES (?, ?, ?, ?), (?, ?, ?, ?)`,
                [
                    userId, finalConversationId, 'user', lastMessage,
                    userId, finalConversationId, 'model', botResponse
                ]
            );

            res.json({ reply: botResponse, conversationId: finalConversationId });
        } else {
            res.json({ reply: botResponse });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no Gemini', details: error.message });
    }
});

router.delete('/conversations/:id', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const conversationId = req.params.id;

        const [check] = await pool.query(
            'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
            [conversationId, userId]
        );

        if (check.length === 0) {
            return res.status(404).json({ error: 'Conversa não encontrada.' });
        }

        await pool.query(
            'DELETE FROM chat_history WHERE conversation_id = ?',
            [conversationId]
        );

        await pool.query(
            'DELETE FROM conversations WHERE id = ?',
            [conversationId]
        );

        res.json({ message: 'Conversa deletada.' });

    } catch (error) {
        console.error("Erro ao deletar conversa:", error);
        res.status(500).json({ error: 'Erro ao deletar conversa.' });
    }
});

module.exports = router;