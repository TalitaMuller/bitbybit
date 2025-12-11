// backend/productsRoute.js
const express = require('express');
const router = express.Router();
const pool = require('./db.js');

// Rota para pegar todos os produtos
router.get('/', async (req, res) => {
    try {
        const [products] = await pool.query(
            `SELECT 
                id, 
                name, 
                price, 
                store, 
                image_url as imageUrl, 
                link, 
                description, 
                category 
             FROM products`
        );
        
        // Garante que o preço é número
        const formattedProducts = products.map(p => ({
            ...p,
            price: Number(p.price)
        }));

        res.json(formattedProducts);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;