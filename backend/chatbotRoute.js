// chatbotRoute.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Carrega as variáveis do .env

const router = express.Router(); // Usamos o Router do Express, e não um novo app

// Inicializa o cliente do Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// O prompt de sistema continua o mesmo
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

// A rota agora é '/', porque o '/api/chat' já foi definido no server.js
router.post('/', async (req, res) => {
    try {
        const { history } = req.body;

        if (!history || !Array.isArray(history)) {
            return res.status(400).json({ error: 'O histórico de mensagens é obrigatório.' });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemInstruction,
        });

        const chat = model.startChat({
            history: history,
        });

        const lastMessage = history[history.length - 1].parts[0].text;

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const botResponse = response.text();

        res.json({ reply: botResponse });

    } catch (error) {
        console.error("Erro ao comunicar com a API do Gemini:", error);
        res.status(500).json({ error: 'Ocorreu um erro ao processar sua mensagem.' });
    }
});

// Exportamos o router para que o server.js possa usá-lo
module.exports = router;