const pool = require('../ConexionDB/DAO.js');
const express = require('express');
const router = express.Router();
const{obtenerServicios, descativarServicios,
    agregarServicio, editarServicio, obtenerServicioPorPlantel} = require('../service/servicios.js');
const { requestServicios } = require('../service/models.js')


router.get('/', async(req, res) =>{
    try{
        const result = await obtenerServicios();
        res.json(result);
    }catch(error){
        console.error('ERROR: al ejecutar la consulta:', error);
        res.status(500).json({error: error.message});
    }
});


router.post('/', async (req, res) => {
  const { error, value } = requestServicios.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    if (typeof value.estado === 'undefined') {
        value.estado = true;
    }
    const nuevoServicio = await agregarServicio(value);
    res.status(201).json(nuevoServicio);
  } catch (err) {
    console.error('Error al crear servicio:', err);
    res.status(400).json({ error: err.message }); 
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestServicios.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    if (typeof value.estado === 'undefined') {
        value.estado = true;
    }
    const nuevoServicio = await editarServicio(id, value);
    res.status(201).json(nuevoServicio);
  } catch (err) {
    console.error('Error al editar servicio:', err);
    res.status(400).json({ error: err.message }); 
  }
});

router.put('/cambios-estado/:id', async (req, res) => {
  const id_servicio = req.params.id;
  const { estado } = req.body; // Estado debe venir por body
  try {
    await descativarServicios(id_servicio, estado); // Usa el estado recibido
    res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al desactivar el servicio:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/servicios/:plantel', async (req, res) => {
    const nom_plantel = req.params.plantel;
    try {
        const result = await obtenerServicioPorPlantel(nom_plantel);
        res.json(result);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;


