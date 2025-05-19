const pool = require('../ConexionDB/DAO.js'); // Incluye la ruta donde se encuentra la conexion a DB
const express = require('express');
const router = express.Router();
const {obtenerFechas, obtnerFechaEvento, eliminarEvento, agregarFecha, editarFecha} = require('../service/fechas.js');
const { requestFechas } = require('../service/models.js')


router.get('/', async (req, res) => {
    try {
        const result = await obtenerFechas();
        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/evento/:evento', async (req, res) => {
    const event = req.params.evento;
    try {
        const result = await obtnerFechaEvento(event);
        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async(req, res) => {
    const id_fecha = req.params.id;
    try {
        const resultado = await eliminarEvento(id_fecha);
        res.json({ mensaje: 'Registro eliminado' });
    } catch (error){
        console.error('ERROR: Al eliminar el registros a la base de datos.')
        res.status(500).json({ error: error.message});
    }
});

router.post('/', async (req, res) => {
  const { error, value } = requestFechas.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaFecha = await agregarFecha(value);
    res.status(201).json(nuevaFecha);
  } catch (err) {
    console.error('Error al crear fecha:', err);
    res.status(400).json({ error: err.message }); 
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestFechas.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaFecha = await editarFecha(id, value);
    res.status(201).json(nuevaFecha);
  } catch (err) {
    console.error('Error al editar fecha:', err);
    res.status(400).json({ error: err.message }); 
  }
});



module.exports = router;
