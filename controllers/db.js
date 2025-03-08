const { Pool } = require('pg');

const pool = new Pool({
    user: 'altimate',
    host: 'localhost',
    database: 'projectmanagementsystem',
    password: 'anything',
    port: 5432
});

module.exports = pool;