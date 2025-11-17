// buildRoute.js
const express = require('express');
const router = express.Router();
const pool = require('./db.js');
const authenticateToken = require('./authMiddleware.js'); // Importa o "Guarda"

// --- ROTA PARA SALVAR UMA NOVA BUILD ---
// Note que passamos o 'authenticateToken' antes da lógica da rota.
// Isso faz o "guarda" proteger esta rota.
router.post('/save', authenticateToken, async (req, res) => {
    try {
        // 'req.user' foi adicionado pelo middleware!
        const userId = req.user.userId; 
        
        // O frontend vai enviar as peças no formato:
        // { name: "Minha Build Nova", parts: [ { category: 'Processador', product_id: 2, product_name: 'Ryzen 7...' }, ... ] }
        const { name, parts } = req.body;

        if (!parts || parts.length === 0) {
            return res.status(400).json({ message: 'A build não pode estar vazia.' });
        }

        // 1. Inicia uma transação (Tudo ou Nada)
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        // 2. Cria a "capa" da build na tabela 'builds'
        const [buildResult] = await connection.query(
            'INSERT INTO builds (user_id, name) VALUES (?, ?)',
            [userId, name || 'Minha Build']
        );
        
        const newBuildId = buildResult.insertId;

        // 3. Prepara para inserir todos os componentes
        const componentValues = parts.map(part => [
            newBuildId,
            part.category,
            part.product_id,
            part.product_name
        ]);

        // 4. Insere todos os componentes de uma vez
        await connection.query(
            'INSERT INTO build_components (build_id, category, product_id, product_name) VALUES ?',
            [componentValues]
        );

        // 5. Se deu tudo certo, confirma a transação
        await connection.commit();
        connection.release();

        res.status(201).json({ message: 'Build salva com sucesso!', buildId: newBuildId });

    } catch (error) {
        // Se der erro em qualquer passo, desfaz tudo (rollback)
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Erro ao salvar build:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

// --- ROTA PARA BUSCAR AS BUILDS DO USUÁRIO ---
router.get('/', authenticateToken, async (req, res) => {
    try {
        // O ID do usuário vem do token que o "guarda" (middleware) verificou
        const userId = req.user.userId;

        // 1. Busca todas as "capas" de build do usuário
        const [builds] = await pool.query(
            `SELECT id, name, created_at 
             FROM builds 
             WHERE user_id = ? 
             ORDER BY created_at DESC`,
            [userId]
        );

        // Se não tiver builds, retorna um array vazio
        if (builds.length === 0) {
            return res.status(200).json([]);
        }

        // 2. Precisamos buscar os componentes de TODAS as builds
        // Pega todos os IDs das builds (ex: [5, 8, 12])
        const buildIds = builds.map(b => b.id);

        // Busca todos os componentes que pertencem a qualquer uma dessas builds
        const [components] = await pool.query(
            `SELECT build_id, category, product_id, product_name 
             FROM build_components 
             WHERE build_id IN (?)`,
            [buildIds]
        );

        // 3. Agora, vamos "juntar" os componentes em suas respectivas builds
        const buildsComComponentes = builds.map(build => {
            return {
                ...build,
                // Filtra a lista total de componentes para pegar só os desta build
                components: components.filter(c => c.build_id === build.id)
            };
        });

        res.status(200).json(buildsComComponentes);

    } catch (error) {
        console.error('Erro ao buscar builds:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});


module.exports = router;