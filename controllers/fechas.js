const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const pool = require('../ConexionDB/DAO.js'); // Incluye la ruta donde se encuentra la conexion a DB
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Fechas;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/eliminar/:id_fecha', async(req, res) => {
    const id_fecha = parseInt(req.params.id_fecha);
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



module.exports = router;

/*

// Ruta GET para obtener fechas de los distintos módulos
router.get('/:modulo', async (req, res) => {
    try {
        const info = await serviceInstance.readData();  // Lee los datos de forma asíncrona
        const modulo = req.params.modulo;
        const fechas_modulo = info.fechas.find((fechas_modulo) => fechas_modulo.modulo === modulo);  // Busca el módulo

        if (fechas_modulo) {
            res.json(fechas_modulo);  // Si se encuentra el módulo, responde con los datos
        } else {
            res.status(404).json({ error: "Módulo inválido" });  // Si no se encuentra, responde con error 404
        }
    } catch (error) {
        console.error(error);  // Si ocurre un error en la lectura, muestra el error
        res.status(500).json({ error: "Error interno del servidor" });  // Responde con error 500
    }
});

// Ruta POST para agregar una nueva fecha
router.post('/', async (req, res) => {
    try {
        const info = await serviceInstance.readData();  // Lee los datos
        const body = req.body;
        const nuevo = {
            id: info.fechas.length + 1,  // Genera un nuevo ID
            ...body,  // Agrega el cuerpo de la petición a la nueva fecha
        };
        info.fechas.push(nuevo);  // Agrega la nueva fecha al array de fechas
        await serviceInstance.writeData(info);  // Escribe los datos actualizados en el archivo
        res.json(nuevo);  // Responde con la nueva fecha
    } catch (error) {
        console.error(error);  // Si ocurre un error en la escritura, muestra el error
        res.status(500).json({ error: "Error al agregar la fecha" });  // Responde con error 500
    }
});

// Ruta PUT para actualizar una fecha existente
router.put('/:id', async (req, res) => {
    try {
        const data = await serviceInstance.readData();  // Lee los datos
        const body = req.body;
        const id = parseInt(req.params.id);  // Obtiene el ID de la ruta
        const fechaIndex = data.fechas.findIndex((fechas) => fechas.id === id);  // Busca el índice de la fecha por el ID

        if (fechaIndex === -1) {
            return res.status(404).json({ error: "Fecha no encontrada" });  // Si no se encuentra la fecha, responde con error 404
        }

        data.fechas[fechaIndex] = {  // Actualiza la fecha encontrada
            ...data.fechas[fechaIndex],
            ...body,
        };
        await serviceInstance.writeData(data);  // Escribe los datos actualizados
        res.json({ message: "Fecha actualizada con éxito" });  // Responde con éxito
    } catch (error) {
        console.error(error);  // Si ocurre un error, muestra el error
        res.status(500).json({ error: "Error al actualizar la fecha" });  // Responde con error 500
    }
});
*/

