const { crearTablas, pool, insertarDatos } = require('./ConexionDB/DAO');

const iniciar = async () => {
  await crearTablas();
  await insertarDatos();
  await pool.end();
};

iniciar();
