const pool = require('../ConexionDB/DAO.js');
const express = require('express');
const { requestOferta } = require('../service/models.js');
const {
        obtenerOfertaAcademica,
        agregarOfertaAcademica,
        obtenerCarrerasPorPlantel,
        eliminarCarrera,
        obtenerPosgradosPorPlantel,
        editarOfertaAcademica 
    } = require('../service/oferta.js');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const resultados = await obtenerOfertaAcademica();
        res.json(resultados);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/carreras/:plantel', async (req, res) => {
    const nom_plantel = req.params.plantel;
    try {
        const result = await obtenerCarrerasPorPlantel(nom_plantel);         
        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/posgrados/:plantel', async (req, res) => {
    const nom_plantel = req.params.plantel;
    try {
        const result = await obtenerPosgradosPorPlantel(nom_plantel);         
        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
  const { error, value } = requestOferta.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaOferta = await agregarOfertaAcademica(value);
    res.status(201).json(nuevaOferta);
  } catch (err) {
    console.error('Error al crear oferta académica:', err);
    res.status(400).json({ error: err.message }); 
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestOferta.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaOferta = await editarOfertaAcademica(id, value);
    res.status(201).json(nuevaOferta);
  } catch (err) {
    console.error('Error al editar oferta académica:', err);
    res.status(400).json({ error: err.message }); 
  }
});


router.delete('/eliminar/:id', async (req, res) => {
  const id_ofer_academica = req.params.id;
  try {
    const resultado = await eliminarCarrera(id_ofer_academica);
    return res.json({ mensaje: 'Registro eliminado' }); // ✅ única respuesta en éxito
  } catch (error) {
    console.error('ERROR: Al eliminar el registro de la base de datos:', error);
    return res.status(500).json({ mensaje: 'Error al eliminar el registro', error: error.message }); // ✅ única respuesta en error
  }
});


module.exports = router;



