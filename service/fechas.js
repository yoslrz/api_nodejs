const { pool } = require('../ConexionDB/DAO');
const { v4: uuidv4 } = require('uuid');



const obtenerFechas = async() => {
    const query = "SELECT * FROM Fechas WHERE fecha_eliminacion IS NULL;";
    const result = await pool.query(query);
    return result.rows;
};

const obtnerFechaEvento = async(evento) =>{
    const query = "SELECT * FROM Fechas WHERE fecha_eliminacion IS NULL AND evento ILIKE '%' || $1 || '%'";
    const result = await pool.query(query,[evento]);
    return result.rows;
}


const eliminarEvento = async (id_fecha) => {
  const query = `
    UPDATE Fechas 
    SET fecha_eliminacion = CURRENT_TIMESTAMP 
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [id_fecha]);
  return result.rows;
};


const agregarFecha = async (fecha) => {
  const { id = uuidv4(), fecha_inicio, fecha_fin, evento } = fecha;

  const query = `
    INSERT INTO Fechas (id, fecha_inicio, fecha_fin, evento, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, NULL, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id, fecha_inicio, fecha_fin, evento]);
  return result.rows[0];
};


const editarFecha = async (id, nuevaFecha) => {
  await pool.query(`UPDATE Fechas SET fecha_eliminacion = CURRENT_DATE WHERE id = $1`, [id]);

  const { id_n = uuidv4(), fecha_inicio, fecha_fin, evento } = nuevaFecha;

  const query = `
    INSERT INTO Fechas (id, fecha_inicio, fecha_fin, evento, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, CURRENT_DATE, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id_n, fecha_inicio, fecha_fin, evento]);
  return result.rows[0];
};

module.exports = { 
    obtenerFechas,
    obtnerFechaEvento,
    eliminarEvento,
    agregarFecha,
    editarFecha
};
