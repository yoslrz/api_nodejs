const pool = require('../ConexionDB/DAO.js');
//const serviceInstance = new Service();
const express = require('express');
const router = express.Router();

const{obtenerDocumentos} = require('../service/requisitos.js');


router.get('/', async(req, res) =>{
    try{
        const result = await obtenerDocumentos();
        res.json(result);
    }catch(error){
        console.error('ERROR al ejecutar la consulta: ', error);
        res.status(500).json({ error: error.message});
    }    
});

router.put('/agregar/:id', async(req, res) =>{
    const id_doc = parseInt(req.params.id);
    const datos = req.body;
    try{
       const resultado = await agregarOActualizarDocumentos(id_doc, datos);
       res.json(resultado);
    }catch(error){
        console.error('Error al agregar/actualizar Documentos:', error);
        res.status(500).json({error: error.message});
    }
});

router.put('/desactivar/:id', async(req, res) =>{
    const id_doc = parseInt(req.params.id);
    const fecha = new Date();
    try{
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        await descativarDocumentos(id_doc, fechaFormateada);
    }catch(error){
        console.error('Error al desactivar los Documentos:', error);
        res.status(500).json({error: error.message});
    }
});
module.exports = router;
