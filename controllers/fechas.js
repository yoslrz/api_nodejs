const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const pool = require('../ConexionDB/DAO.js'); // Incluye la ruta donde se encuentra la conexion a DB
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM Fechas WHERE fecha_eliminacion = 'null';");
        res.json(result.rows);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/eliminar/:id', async(req, res) => {
    const id_fecha = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM Fechas WHERE id_fecha = $1;', [id_fecha]);
        res.json({ mensaje: 'Registro eliminado' });
    } catch (error){
        console.error('ERROR: Al eliminar el registros a la base de datos.')
        res.status(500).json({ error: error.message});
    }
});

router.put('/agregar/:id', async(req,res) =>{
    const id_fecha = parseInt(req.params.id);
    const {fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion} = req.body;
    try{
        const verifica = await pool.query('SELECT * FROM fechas WHERE id_fecha = $1', [id_fecha]);
        if(verifica.rows.length > 0){
            await pool.query('UPDATE fechas set fecha_inicio = $1, fecha_fin = $2, evento = $3, fecha_creacion = $4, fecha_edicion = $5, fecha_eliminacion = $6 WHERE id_fecha = $7',
                [fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion, id_fecha]
            );
            res.json({ mensaje: 'Nota Actualizada'});
        }else{
            await pool.query('INSERT INTO Fechas (id_fecha, fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion) VALUES($1,$2,$3,$4,$5,$6,$7)',
                [id_fecha ,fecha_inicio, fecha_fin, evento, fecha_creacion, fecha_edicion, fecha_eliminacion]
            );
            res.json({mensaje: 'Fecha Registrada'});
        }
    }catch (error){
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
        const verifica = await pool.query("SELECT * FROM fechas WHERE id_fecha = $1 and fecha_eliminacion = 'null'; ", [id_fecha]);
        if(verifica.rows.length > 0){
            await pool.query('UPDATE fechas SET fecha_eliminacion = $1 WHERE id_fecha = $2', [fechaFormateada, id_fecha]);
            res.json({mensaje: 'Fecha Desactivado'});
        }else{
            res.json({mensaje: 'El id de la Fecha no existe'});
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
