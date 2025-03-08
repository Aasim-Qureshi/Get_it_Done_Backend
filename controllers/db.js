const { Pool } = require('pg');

const pool = new Pool({

    connectionString: process.env.DATABASE_URL,
    user: process.env.USERNAME,
    host: process.env.HOSTNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,

    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;