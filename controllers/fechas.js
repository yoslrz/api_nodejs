const pool = require('../ConexionDB/DAO.js'); // Incluye la ruta donde se encuentra la conexion a DB
const express = require('express');
const router = express.Router();
const {obtenerFechas, obtnerFechaEvento, eliminarEvento, agregarOActualizarEvent, desactivarFechas} = require('../service/services.js');


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


router.delete('/eliminar/:id', async(req, res) => {
    const id_fecha = parseInt(req.params.id);
    try {
        const resultado = await eliminarEvento(id_fecha);
        res.json({ mensaje: 'Registro eliminado' });
    } catch (error){
        console.error('ERROR: Al eliminar el registros a la base de datos.')
        res.status(500).json({ error: error.message});
    }
});

router.put('/agregar/:id', async(req,res) =>{
    const id_fecha = parseInt(req.params.id);
    const datos = req.body;
    try{
        const resultado = await agregarOActualizarEvent(id_fecha, datos);
        res.json(resultado);
    }catch (error){
        console.error('Error al agregar/actualizar fecha de Evento:', error);
        res.status(500).json({error: error.message});
    }
});

router.put('/desactivar/:id', async(req, res) =>{
    const id_fecha = parseInt(req.params.id);
    const fecha = new Date();
    try{
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        await desactivarFechas(id_fecha, fechaFormateada)
        res.json(fechaFormateada);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
