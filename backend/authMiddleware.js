// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv/config');

const authenticateToken = (req, res, next) => {
    // Pega o token do cabeçalho 'Authorization'
    // O formato é "Bearer SEU_TOKEN_AQUI"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega só o token

    if (token == null) {
        // Se não tem token, não tem permissão
        return res.sendStatus(401); // Unauthorized
    }

    // Verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Se o token é inválido ou expirou
            return res.sendStatus(403); // Forbidden
        }

        // Se o token é válido, anexa os dados do usuário na requisição
        // 'user' aqui é o objeto que colocamos no token (userId, username)
        req.user = user; 
        
        next(); // Deixa a requisição continuar
    });
};

module.exports = authenticateToken;