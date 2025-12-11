const express = require('express');
const cors = require('cors');

const chatbotRoute = require('./chatbotRoute');
const authRoute = require('./authRoute');
const buildRoute = require('./buildRoute'); 
const productsRoute = require('./productsRoute'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatbotRoute);
app.use('/api/auth', authRoute);
app.use('/api/builds', buildRoute); 
app.use('/api/products', productsRoute); 

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🔗 Rota de produtos ativa: http://localhost:3001/api/products`);
});