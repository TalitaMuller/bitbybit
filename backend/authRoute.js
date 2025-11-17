// authRoute.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db.js'); // 1. Importa a conexão do db.js
const router = express.Router(); // 2. Cria o router

const saltRounds = 10;

// Rota '/register'
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // 3. Usa o pool para consultar o banco
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Nome de usuário ou email já cadastrado.' });
        }
        
        // 4. Criptografa a senha
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 5. Insere no banco
        await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        
        console.log('Novo usuário cadastrado:', username);
        
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});



// ROTA DE LOGIN DE USUÁRIO
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        // 1. Encontrar o usuário pelo email
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // 2. Checar se o usuário existe
        if (users.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' }); // Mensagem genérica por segurança
        }

        const user = users[0];

        // 3. Comparar a senha enviada com o hash salvo no banco
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' }); // Mensagem genérica
        }

        // 4. Se a senha estiver correta, criar um Token (JWT)
        // O token é um "passe livre" que prova que o usuário está logado.
        const token = jwt.sign(
            { 
                userId: user.id, 
                username: user.username 
            },
            process.env.JWT_SECRET, // <--- Precisamos adicionar isso no .env
            { expiresIn: '1d' } // Token expira em 1 dia
        );

        // 5. Enviar o token e os dados do usuário para o frontend
        res.status(200).json({
            message: 'Login bem-sucedido!',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

// 6. Exporta o ROUTER, não o pool
module.exports = router;