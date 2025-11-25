const express = require('express');
const cors = require('cors');
const chatbotRoute = require('./chatbotRoute'); 
const authRoute = require('./authRoute');
const buildRoute = require('./buildRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatbotRoute);

app.use('/api/auth', authRoute);

app.use('/api/builds', buildRoute);

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log('Aguardando mensagens do frontend...');
});