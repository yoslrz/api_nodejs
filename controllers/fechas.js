// ** Métodos para el CRUD de fechas **
const express = require('express');
const router = express.Router();
const {
  obtenerFechas,
  obtnerFechaEvento,
  eliminarEvento,
  agregarFecha,
  editarFecha,
} = require('../service/fechas.js');
const { requestFechas } = require('../service/models.js');

/**
 * @openapi
 * tags:
 *   - name: Fechas
 *     description: Operaciones relacionadas con fechas académicas
 */

/**
 * @openapi
 * /api/fechasDB:
 *   get:
 *     summary: Obtener todas las fechas
 *     tags:
 *       - Fechas
 *     responses:
 *       200:
 *         description: Lista de fechas académicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const result = await obtenerFechas();
    res.json(result);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /api/fechasDB/evento/{evento}:
 *   get:
 *     summary: Obtener fecha por nombre de evento
 *     tags:
 *       - Fechas
 *     parameters:
 *       - in: path
 *         name: evento
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del evento académico
 *     responses:
 *       200:
 *         description: Fecha encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error del servidor
 */
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

/**
 * @openapi
 * /api/fechasDB/{id}:
 *   delete:
 *     summary: Eliminar una fecha por ID
 *     tags:
 *       - Fechas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fecha
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       500:
 *         description: Error al eliminar el registro
 */
router.delete('/:id', async (req, res) => {
  const id_fecha = req.params.id;
  try {
    await eliminarEvento(id_fecha);
    res.json({ mensaje: 'Registro eliminado' });
  } catch (error) {
    console.error('ERROR: Al eliminar el registros a la base de datos.');
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /api/fechasDB:
 *   post:
 *     summary: Crear una nueva fecha académica
 *     tags:
 *       - Fechas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FechaRequest'
 *     responses:
 *       201:
 *         description: Fecha creada correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  const { error, value } = requestFechas.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaFecha = await agregarFecha(value);
    res.status(201).json(nuevaFecha);
  } catch (err) {
    console.error('Error al crear fecha:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /api/fechasDB/{id}:
 *   put:
 *     summary: Editar una fecha existente
 *     tags:
 *       - Fechas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fecha a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FechaRequest'
 *     responses:
 *       201:
 *         description: Fecha actualizada correctamente
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestFechas.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaFecha = await editarFecha(id, value);
    res.status(201).json(nuevaFecha);
  } catch (err) {
    console.error('Error al editar fecha:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
