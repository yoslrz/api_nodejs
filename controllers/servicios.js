const Service = require('../service/services.js');
const pool = require('../ConexionDB/DAO.js');
const express = require('express');
const router = express.Router();
const{obtenerServicios, agregarOActualizarServicios, descativarServicios} = require('../service/services.js');


router.get('/', async(req, res) =>{
    try{
        const result = await obtenerServicios();
        res.json(result);
    }catch(error){
        console.error('ERROR: al ejecutar la consulta:', error);
        res.status(500).json({error: error.message});
    }
});

router.put('/agregar/:id', async(re, res) =>{
    const id_servicio = parseInt(req.params.id);
    const datos = req.body;
    try{
        const resultado = await agregarOActualizarServicios(id_servicio, datos);
        res.json(resultado);
    }catch(error){
        console.error('Error al agregar/actualizat Servicios');
        res.status(500).json({error: error.message});
    }
});

router.put('/desactivar/:id', async(req, res) =>{
    const id_servicio = parseInt(req.params.id);
    const fecha = new Date();
    try{
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        await descativarServicios(id_servicio, fechaFormateada);
    }catch(error){
        console.error('Error al desactivar los documentos');
        res.status(500).json({error: error.message});
    }
});

module.exports = router;


