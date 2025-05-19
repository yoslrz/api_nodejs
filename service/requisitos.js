const { pool } = require('../ConexionDB/DAO.js');
const { v4: uuidv4 } = require('uuid');


const obtenerDocumentos = async () => {
    const query = "SELECT * FROM documentacion WHERE fecha_eliminacion IS NULL;";
    const result = await pool.query(query);
    return result.rows;
};

const agregarDocumentacion = async (doc) => {
  const { id = uuidv4(), nombre, descripcion, evento } = doc;

  const checkQuery = `
      SELECT * FROM Documentacion
      WHERE LOWER(nombre) = LOWER($1)
      AND LOWER(evento) = LOWER($2)
      AND fecha_eliminacion IS NULL
      LIMIT 1;
  `;

  const checkResult = await pool.query(checkQuery, [nombre, evento]);

  if (checkResult.rows.length > 0) {
      throw new Error('Ya existe una documentación registrada con ese nombre para el evento.');
  }

  const query = `
    INSERT INTO Documentacion (id, nombre, descripcion, evento, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, NULL, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id, nombre, descripcion, evento]);
  return result.rows[0];
};


const editarDocumentacion = async (id, docNuevo) => {
  const checkQuery = `
      SELECT * FROM Documentacion
      WHERE LOWER(nombre) = LOWER($1)
      AND LOWER(evento) = LOWER($2)
      AND fecha_eliminacion IS NULL
      LIMIT 1;
  `;

  const checkResult = await pool.query(checkQuery, [nombre, evento]);

  if (checkResult.rows.length > 0) {
      throw new Error('Ya existe una documentación registrada con ese nombre para el evento.');
  }
  await pool.query(`UPDATE Documentacion SET fecha_eliminacion = CURRENT_DATE WHERE id = $1`, [id]);

  const { id_n = uuidv4(), nombre, descripcion, evento } = docNuevo;

  const query = `
    INSERT INTO Documentacion (id, nombre, descripcion, evento, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, CURRENT_DATE, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id_n, nombre, descripcion, evento]);
  return result.rows[0];
};

module.exports = {
    obtenerDocumentos,
    agregarDocumentacion,
    editarDocumentacion
}