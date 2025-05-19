const { crearTablas, pool, insertarDatos } = require('./ConexionDB/DAO');

const iniciar = async () => {
  try {
    await crearTablas();
    await insertarDatos();
    await pool.end();
    console.log('Inicialización completada correctamente.');
  } catch (error) {
    console.error('Error durante la inicialización:', error);
    process.exit(1); // Salir con error para que Docker lo detecte
  }
};

iniciar();
