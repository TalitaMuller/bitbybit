// server.js
const express = require('express');
const cors = require('cors');
const chatbotRoute = require('./chatbotRoute'); // Importa o nosso "Especialista"
const authRoute = require('./authRoute');
const buildRoute = require('./buildRoute');

const app = express();
app.use(cors());
app.use(express.json());

// O "Gerente" diz: qualquer pedido para '/api/chat', mande para o "Especialista"
app.use('/api/chat', chatbotRoute);

// O "Gerente" diz: qualquer pedido para '/api/auth', mande para o "Especialista de Autenticação"
app.use('/api/auth', authRoute);

app.use('/api/builds', buildRoute);

const PORT = 3001; // Definimos a porta aqui
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log('Aguardando mensagens do frontend...');
});