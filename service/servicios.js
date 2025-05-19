const { pool } = require('../ConexionDB/DAO.js');
const { v4: uuidv4 } = require('uuid');


const obtenerServicios = async() => {
    const query = "SELECT * FROM servicios WHERE estado = true AND fecha_eliminacion IS NULL;";
    const result = await pool.query(query);
    return result.rows;
};


const descativarServicios = async(id_doc, estado) => {
    const query = "UPDATE Servicios SET fecha_edicion = CURRENT_DATE, estado =$2 WHERE id = $1";
    const result = await pool.query(query, [id_doc,estado]);
    return result.rows;
};


const agregarServicio = async (servicio) => {
  const {
    id = uuidv4(), nombre, descripcion, horario, uso, plantel, estado
  } = servicio;
  const checkQuery = `
      SELECT * FROM Servicios
      WHERE LOWER(nombre) = LOWER($1)
      AND fecha_eliminacion IS NULL
      LIMIT 1;
  `;

  const checkResult = await pool.query(checkQuery, [nombre]);

  if (checkResult.rows.length > 0) {
      throw new Error('Ya existe un servicio registrado con ese nombre');
  }
  const query = `
    INSERT INTO Servicios (id, nombre, descripcion, 
    horario, uso, plantel, estado, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NULL, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id, nombre, descripcion, horario, uso, plantel, estado]);
  return result.rows[0];
};


const editarServicio = async (id, nuevoServicio) => {
  const {id_n = uuidv4(), nombre, descripcion, horario, uso, plantel, estado} = nuevoServicio;

  const checkQuery = `
      SELECT 1 FROM Servicios
    WHERE LOWER(nombre) = LOWER($1)
    AND id != $2
    AND fecha_eliminacion IS NULL
    LIMIT 1;
  `;

  const checkResult = await pool.query(checkQuery, [nombre, id]);

  if (checkResult.rows.length > 0) {
      throw new Error('Ya existe un servicio registrado con ese nombre');
  }

  await pool.query(`UPDATE Servicios SET fecha_eliminacion = CURRENT_DATE WHERE id = $1`, [id]);

  const query = `
    INSERT INTO Servicios (id, nombre, descripcion, horario, uso, 
    plantel, estado, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id_n, nombre, descripcion, horario, uso, plantel, estado]);
  return result.rows[0];
};

const obtenerServicioPorPlantel = async(nom_plantel) => {
    const query = `SELECT * FROM servicios
        where fecha_eliminacion IS NULL
        AND estado = true
        and plantel ILIKE '%' || $1 || '%';`;
    const result = await pool.query(query, [nom_plantel]);
    return result.rows;
};

module.exports = {
    editarServicio,
    agregarServicio,
    descativarServicios,
    obtenerServicios,
    obtenerServicioPorPlantel
}