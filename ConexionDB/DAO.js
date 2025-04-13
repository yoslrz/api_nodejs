const { Pool } = require('pg');

const pool = new Pool({
  user: 'web',
  host: 'postgres',
  database: 'web-dbase',
  password: 'web123456',
  port: 5432,
});

// Verifica la conexión
pool.connect((err) => {
  if (err) {
    console.error('Error al conectar con PostgreSQL:', err);
  } else {
    console.log('Conexión exitosa con PostgreSQL');
  }
});

module.exports = pool;
