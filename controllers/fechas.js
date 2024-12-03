const express = require('express');
const Service = require('../service/services.js'); // Asegúrate de incluir la extensión del archivo
const serviceInstance = new Service();  // Crea una instancia de la clase Service
const router = express.Router();

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

module.exports = router;
