const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const pool = require('../ConexionDB/DAO.js');
const serviceInstance = new Service();
const express = require('express');
const router = express.Router();

router.get('/', async(requestAnimationFrame, res) =>{
    try{
        const result = await pool.query("SELECT * FROM Documentacion WHERE fecha_eliminacion_doc = 'null';");
        res.json(result.rows);
    }catch(error){
        console.error('ERROR al ejecutar la consulta: ', error);
        res.status(500).json({ error: error.message});
    }    
});

router.put('/agregar/:id', async(req, res) =>{
    const id_doc = parseInt(req.params.id);
    const {nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc} = req.body;
    try{
        const verifica = await pool.query('SELECT * FROM Documentacion WHERE id_doc = $1', [id_doc]);
        if(verifica.rows.length > 0){
            await pool.query('UPDATE Documentacion SET nombre_doc = $1, descripcion_doc = $2, evento_doc = $3, fecha_creacion_doc = $4, fecha_edicion_doc = $5, fecha_eliminacion_doc = $6 WHERE id_doc = $7',
                [nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc]
            );
            res.json({ mensaje: 'Documento Actualizada'});
        }else{
            await pool.query('INSERT INTO Documentacion (id_doc, nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                [id_doc, nombre_doc, descripcion_doc, evento_doc, fecha_creacion_doc, fecha_edicion_doc, fecha_eliminacion_doc]
            );
            res.json({mensaje: 'Documento registrado'});    
        }
    }catch(error){
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
        const verifica = await pool.query("SELECT * FROM Documentacion WHERE id_doc = $1 and fecha_eliminacion_doc = 'null'; ", [id_doc]);
        if(verifica.rows.length > 0){
            await pool.query('UPDATE Documentacion SET fecha_eliminacion_doc = $1 WHERE id_doc = $2', [fechaFormateada, id_doc]);
            res.json({mensaje: 'Documento Desactivado'});
        }else{
            res.json({mensaje: 'El id del Documento no existe'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});



module.exports = router;
