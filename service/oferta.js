const { pool } = require('../ConexionDB/DAO.js');
const { v4: uuidv4 } = require('uuid');


const obtenerOfertaAcademica = async () => {
    const query = "SELECT * FROM oferta_academica WHERE fecha_eliminacion IS NULL";
    const result = await pool.query(query);
    return result.rows;
};

const obtenerCarrerasPorPlantel = async (nom_plantel) => {
    const query = `SELECT * FROM oferta_academica 
        WHERE fecha_eliminacion IS NULL 
        AND tipo = 'Licenciatura' 
        AND plantel ILIKE '%' || $1 || '%';`;
    const result = await pool.query(query, [nom_plantel]);
    return result.rows;
};


const obtenerPosgradosPorPlantel = async (nom_plantel) => {
    const query = `SELECT * FROM oferta_academica 
        WHERE fecha_eliminacion IS NULL
        AND tipo = 'Posgrado' 
        AND plantel ILIKE '%' || $1 || '%';`;
    const result = await pool.query(query, [nom_plantel]);
    return result.rows;
};

const eliminarCarrera = async (id_ofer_academica) => {
    const query = `UPDATE oferta_academica 
    SET fecha_eliminacion = CURRENT_TIMESTAMP 
    WHERE id = $1
    RETURNING *;`;
    const result = await pool.query(query, [id_ofer_academica]);
    return result.rows;
}


const desactivarOfertaAcademica = async(id_ofer_academica, fechaFormateada) =>{
    const query = "UPDATE oferta_academica SET fecha_eliminacion = $1 WHERE id = $2;";
    const result = await pool.query(query, [fechaFormateada, id_ofer_academica]);
    return result.rows;
}


const agregarOfertaAcademica = async (oferta) => {
    const {id = uuidv4(), nombre, tipo, semestres, plantel} = oferta;
    console.log(oferta);

    const checkQuery = `
        SELECT * FROM Oferta_Academica
        WHERE LOWER(nombre) = LOWER($1)
        AND fecha_eliminacion IS NULL
        LIMIT 1;
        `;
    const checkResult = await pool.query(checkQuery, [nombre]);

    if (checkResult.rows.length > 0) {
        throw new Error('Ya existe una oferta académica con ese nombre.');
    }

    const query = `
        INSERT INTO Oferta_Academica (id, nombre, tipo, 
        semestres, plantel, fecha_edicion, fecha_eliminacion)
        VALUES ($1, $2, $3, $4, $5, NULL, NULL)
        RETURNING *;
    `;

    const result = await pool.query(query, [id, nombre, tipo, semestres, plantel]);
    return result.rows[0];
};


const editarOfertaAcademica = async (id, oferta) => {
    const checkQuery = `
        SELECT * FROM Oferta_Academica
        WHERE LOWER(nombre) = LOWER($1)
        AND fecha_eliminacion IS NULL
        LIMIT 1;
    `;
    const checkResult = await pool.query(checkQuery, [nombre]);

    if (checkResult.rows.length > 0) {
        // Ya existe una oferta con ese nombre
        throw new Error('Ya existe una oferta académica con ese nombre.');
    }
    const query_up = `UPDATE oferta_academica 
    SET fecha_eliminacion = CURRENT_TIMESTAMP 
    WHERE id = $1
    RETURNING *;`;
    await pool.query(query_up, [id]);
    const {id_n = uuidv4(), nombre, tipo, semestres, plantel} = oferta;

    const query = `
        INSERT INTO Oferta_Academica (id, nombre, tipo, 
        semestres, plantel, fecha_edicion, fecha_eliminacion)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, NULL)
        RETURNING *;
    `;

    const result = await pool.query(query, [id_n, nombre, tipo, semestres, plantel]);
    return result.rows[0];
};

module.exports = {
    agregarOfertaAcademica,
    editarOfertaAcademica,
    desactivarOfertaAcademica,
    eliminarCarrera,
    obtenerPosgradosPorPlantel,
    obtenerCarrerasPorPlantel,
    obtenerOfertaAcademica
 }