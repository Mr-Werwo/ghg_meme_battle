import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'school_meme_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const query = async (sql: string, params: any[]) => {
    const [results] = await pool.execute(sql, params);
    return results;
};

export default pool;