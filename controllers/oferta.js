const pool = require('../ConexionDB/DAO.js');
const express = require('express');
const router = express.Router();
const {obtenerOfertaAcademica,
    obtenerCarrerasPorPlantel,
    agregarOActualizarOferta,
    eliminarCarrera,
    desactivarOfertaAcademica,
    obtenerPosgradosPorPlantel } = require('../service/services.js');

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


router.put('/agregar/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const datos = req.body;
    try {
        const resultado = await agregarOActualizarOferta(id, datos);
        res.json(resultado);
    } catch (error) {
        console.error('Error al agregar/actualizar oferta académica:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/eliminar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    try{
        const resultado = await eliminarCarrera(id_ofer_academica);
        res.json({ mensaje: 'Registro eliminado' });
    }catch(error){res.json({ mensaje: 'Registro eliminado de Oferta Academica' });
        console.error('ERROR: Al eliminar el registro de la base de datos');
        res.status(500).json({error: error.message});
    }
});

router.put('/desactivar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    const fecha = new Date();
    try{
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        await desactivarOfertaAcademica(id_ofer_academica, fechaFormateada);

    }catch(error){
        res.status(500).json({error: error.message});
    }
});


/*
router.get('/', async(req, res) =>{
    try{
        const result = await pool.query("SELECT * FROM oferta_academica WHERE fecha_eliminacion_ofer_academica = 'null';");
        res.json(result.rows);
    }catch (error){
        console.error('Error al ejecutar la consulta: ' ,error);
        res.status(500).json({error: error.message});
    }
});


router.get('/carreras/:plantel', async (req, res) => {
    const nom_plantel = req.params.plantel;
    try {
        const result = await pool.query("SELECT * FROM oferta_academica WHERE fecha_eliminacion_ofer_academica = 'null' AND plantel_ofer_academica ILIKE '%' || $1 || '%'",[nom_plantel]);
          
        res.json(result.rows);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/eliminar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    try{
        await pool.query('DELETE FROM oferta_academica WHERE id_ofer_academica = $1', [id_ofer_academica]);
        res.json({ mensaje: 'Registro eliminado' });
    }catch(error){res.json({ mensaje: 'Registro eliminado de Oferta Academica' });
        console.error('ERROR: Al eliminar el registro de la base de datos');
        res.status(500).json({error: error.message});
    }
});

router.put('/agregar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    const {nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica } = req.body;
    try{
        const verifica = await pool.query('SELECT * FROM oferta_academica WHERE id_ofer_academica = $1', [id_ofer_academica]);
        if(verifica.rows.lenght > 0){
            await pool.query('UPDATE oferta_academica set nombre_ofer_academica = $1, tipo_ofer_academica = $2, semestres_ofer_academica = $3, plantel_ofer_academica = $4 , fecha_creacion_ofer_academica = $5, fecha_edicion_ofer_academica = $6, fecha_eliminacion_ofer_academica = $7 WHERE id_ofer_academica = $8',
                [nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica, id_ofer_academica]
            );
            res.json({mensaje: 'OFERTA ACADEMICA ACTUALIZADA'});
        }else{
            await pool.query('INSERT INTO oferta_academica (id_ofer_academica, nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [id_ofer_academica, nombre_ofer_academica, tipo_ofer_academica, semestres_ofer_academica, plantel_ofer_academica, fecha_creacion_ofer_academica, fecha_edicion_ofer_academica, fecha_eliminacion_ofer_academica]
            );
            res.json({mensaje: 'Oferta academica agregada'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

router.put('/desactivar/:id', async(req, res) =>{
    const id_ofer_academica = parseInt(req.params.id);
    const fecha = new Date();
    try{
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        const verifica = await pool.query("SELECT * FROM oferta_academica WHERE id_ofer_academica = $1 and fecha_eliminacion_doc = 'null'; ", [id_ofer_academica]);
        if(verifica.rows.length > 0){
            await pool.query('UPDATE oferta_academica SET fecha_eliminacion_ofer_academica = $1 WHERE id_ofer_academica = $2', [fechaFormateada, id_ofer_academica]);
            res.json({mensaje: 'Oferta Academica Desactivado'});
        }else{
            res.json({mensaje: 'El id de la Oferta Academica no existe'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});
*/

module.exports = router;



