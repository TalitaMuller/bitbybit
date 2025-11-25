const express = require('express');
const router = express.Router();
const pool = require('./db.js');
const authenticateToken = require('./authMiddleware.js'); 


router.post('/save', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId; 
        
        const { name, parts } = req.body;

        if (!parts || parts.length === 0) {
            return res.status(400).json({ message: 'A build não pode estar vazia.' });
        }

        const connection = await pool.getConnection();
        await connection.beginTransaction();

        const [buildResult] = await connection.query(
            'INSERT INTO builds (user_id, name) VALUES (?, ?)',
            [userId, name || 'Minha Build']
        );
        
        const newBuildId = buildResult.insertId;

        const componentValues = parts.map(part => [
            newBuildId,
            part.category,
            part.product_id,
            part.product_name
        ]);

        await connection.query(
            'INSERT INTO build_components (build_id, category, product_id, product_name) VALUES ?',
            [componentValues]
        );

        await connection.commit();
        connection.release();

        res.status(201).json({ message: 'Build salva com sucesso!', buildId: newBuildId });

    } catch (error) {
        if (connection) {
            await connection.rollback();
            connection.release();
        }
        console.error('Erro ao salvar build:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;

        const [builds] = await pool.query(
            `SELECT id, name, created_at 
             FROM builds 
             WHERE user_id = ? 
             ORDER BY created_at DESC`,
            [userId]
        );

        if (builds.length === 0) {
            return res.status(200).json([]);
        }

        const buildIds = builds.map(b => b.id);

        const [components] = await pool.query(
            `SELECT build_id, category, product_id, product_name 
             FROM build_components 
             WHERE build_id IN (?)`,
            [buildIds]
        );

        const buildsComComponentes = builds.map(build => {
            return {
                ...build,
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