const Service = require('../service/services.js');
const pool = require('../ConexionDB/DAO.js');
const serviceInstance = new Service();
const express = require('express');
const router = express.Router();

router.get('/', async(requestAnimationFrame, res) =>{
    try{
        const result = await pool.query('SELECT * FROM servicios WHERE estado_servicio = true;');
        res.json(result.rows);
    }catch(error){
        console.error('ERROR: al ejecutar la consulta:', error);
        res.status(500).json({error: error.message});
    }
});

router.put('/agregar/:id', async(requestAnimationFrame, res) =>{
    const id_servicio = parseInt(requestAnimationFrame.params.id);
    const {nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, 
        plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio
    } = req.body;
    try{
        const verifica = await pool.query('SELECT * FROM Servicios WHERE id_servicio = $1', [id_servicio]);
        if(verifica.rows.lenght > 0){
            await pool.query('UPDATE Servicios SET nombre_servicio = $1, descripcion_servicio = $2, horario_servicio = $3, uso_servicio = $4, plantel_servicio = $5, estado_servicio = $6, fecha_creacion_servicio = $7, fecha_edicion_servicio = $8, fecha_eliminacion_servicio = $9 WHERE id_servicio = $10',
                [nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio, id_servicio]
            );
            res.json({mensaje: 'Servicio Actualizado'});
        }else{
            await pool.query('INSERT INTO Servicios VALUES (id_servicio, nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
                [id_servicio, nombre_servicio, descripcion_servicio, horario_servicio, uso_servicio, plantel_servicio, estado_servicio, fecha_creacion_servicio, fecha_edicion_servicio, fecha_eliminacion_servicio]
            );
            res.json({mensaje: 'Servicio Agregado'});
        }
    }catch(error){
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
        const verifica = await pool.query('SELECT * FROM Servicios WHERE id_servicio = $1', [id_servicio]);
        if(verifica.rows.length > 0){
            await pool.query('UPDATE SET Servicios fecha_eliminacion_servicio = $1, estado_servicio = false WHERE id_servicio = $2', [fechaFormateada, id_servicio]);
            res.json({mensaje: 'Documento Desactivado'});
        }else{
            res.json({mensaje: 'El id del Documento no existe'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router;


