const { pool } = require('../ConexionDB/DAO.js');
const { v4: uuidv4 } = require('uuid');


const obtenerServicios = async() => {
    const query = "SELECT * FROM servicios WHERE estado = true;";
    const result = await pool.query(query);
    return result.rows;
};


const descativarServicios = async(id_doc, fechaFormateada) => {
    const query = "UPDATE SET Servicios fecha_eliminacion = $1, estado_servicio = false WHERE id_servicio = $2";
    const result = await pool.query(query, [fechaFormateada, id_doc]);
    return result.rows;
};


const agregarServicio = async (servicio) => {
  const {
    id = uuidv4(), nombre, descripcion, horario, uso, plantel, estado
  } = servicio;

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
  await pool.query(`UPDATE Servicios SET fecha_eliminacion = CURRENT_DATE WHERE id = $1`, [id]);

  const {
    id_n = uuidv4(), nombre, descripcion, horario, uso, plantel, estado
  } = nuevoServicio;

  const query = `
    INSERT INTO Servicios (id, nombre, descripcion, horario, uso, 
    plantel, estado, fecha_edicion, fecha_eliminacion)
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE, NULL)
    RETURNING *;
  `;
  const result = await pool.query(query, [id_n, nombre, descripcion, horario, uso, plantel, estado]);
  return result.rows[0];
};

module.exports = {
    editarServicio,
    agregarServicio,
    descativarServicios,
    obtenerServicios
}