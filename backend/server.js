// server.js
const express = require('express');
const cors = require('cors');

// Importação das rotas
const chatbotRoute = require('./chatbotRoute');
const authRoute = require('./authRoute');
const buildRoute = require('./buildRoute'); // Se tiver o buildRoute, mantenha
const productsRoute = require('./productsRoute'); // <--- 1. IMPORTANTE: Importar o arquivo

const app = express();
app.use(cors());
app.use(express.json());

// Definição das Rotas
app.use('/api/chat', chatbotRoute);
app.use('/api/auth', authRoute);
app.use('/api/builds', buildRoute); // Se tiver
app.use('/api/products', productsRoute); // <--- 2. IMPORTANTE: Ativar a rota

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🔗 Rota de produtos ativa: http://localhost:3001/api/products`);
});