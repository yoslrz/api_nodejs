// db.js
require('dotenv').config();
const { Pool } = require('pg');
const models = require('./models');
const inserts = require('./data_base');
const isDocker = process.env.DOCKER_ENV === 'true';


const pool = new Pool({
  user: process.env.DB_USER,
  host: isDocker ? 'postgres' : 'localhost',
  database: process.env.DB_NAME,  // ya existe, gracias a Docker
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect(err => {
  if (err) console.error('Error al conectar con PostgreSQL:', err);
  else console.log('Conexión exitosa con PostgreSQL');
});

const crearTablas = async () => {
  try {
    for (const query of models) {
      await pool.query(query);
      console.log('✅ Tabla procesada');
    }
    console.log('Todas las tablas se han creado o ya existían.');
  } catch (err) {
    console.error('Error al crear tablas:', err);
  }
};

const insertarDatos = async () => {
  try {
    for (const instert of inserts){
      await pool.query(instert);
      console.log('✅ Tabla procesada');
    }
    console.log('Todas las tablas se han creado o ya existían.');
  } catch (err) {
    console.error('❌ Error al insertar:', err);
  } finally {
    await pool.end();
  }
};
module.exports = { pool, crearTablas, insertarDatos};
