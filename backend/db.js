// db.js
const mysql = require('mysql2/promise'); // MUDANÇA: de 'import' para 'const require'
require('dotenv/config');                // MUDANÇA: de 'import' para 'require'

// O resto do código é igual
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'seu-password-aqui',
    database: process.env.DB_NAME || 'bitbybit_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão com o banco de dados MySQL estabelecida com sucesso! 🎉');
        connection.release();
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
    }
})();

module.exports = pool; // MUDANÇA: de 'export default pool' para 'module.exports'