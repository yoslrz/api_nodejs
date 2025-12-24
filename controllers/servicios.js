//** CRUD para la tabla servicios */
const express = require('express');
const router = express.Router();
const {
  obtenerServicios,
  descativarServicios,
  agregarServicio,
  editarServicio,
  obtenerServicioPorPlantel,
} = require('../service/servicios.js');
const { requestServicios } = require('../service/models.js');

/**
 * @openapi
 * /api/serviciosDB:
 *   get:
 *     summary: Obtener todos los servicios
 *     description: Retorna la lista completa de servicios registrados.
 *     tags:
 *       - Servicios
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServicioRequest'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', async (req, res) => {
  try {
    const result = await obtenerServicios();
    res.json(result);
  } catch (error) {
    console.error('ERROR: al ejecutar la consulta:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /api/serviciosDB:
 *   post:
 *     summary: Crear un nuevo servicio
 *     description: Registra un nuevo servicio institucional.
 *     tags:
 *       - Servicios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicioRequest'
 *     responses:
 *       201:
 *         description: Servicio creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServicioRequest'
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  const { error, value } = requestServicios.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    if (typeof value.estado === 'undefined') {
      value.estado = true;
    }
    const nuevoServicio = await agregarServicio(value);
    res.status(201).json(nuevoServicio);
  } catch (err) {
    console.error('Error al crear servicio:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /api/serviciosDB/{id}:
 *   put:
 *     summary: Editar un servicio
 *     description: Actualiza la información de un servicio existente.
 *     tags:
 *       - Servicios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicioRequest'
 *     responses:
 *       201:
 *         description: Servicio actualizado correctamente
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestServicios.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    if (typeof value.estado === 'undefined') {
      value.estado = true;
    }
    const nuevoServicio = await editarServicio(id, value);
    res.status(201).json(nuevoServicio);
  } catch (err) {
    console.error('Error al editar servicio:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /api/serviciosDB/cambios-estado/{id}:
 *   put:
 *     summary: Cambiar el estado de un servicio
 *     description: Activa o desactiva un servicio institucional.
 *     tags:
 *       - Servicios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.put('/cambios-estado/:id', async (req, res) => {
  const id_servicio = req.params.id;
  const { estado } = req.body; // Estado debe venir por body
  try {
    await descativarServicios(id_servicio, estado); // Usa el estado recibido
    res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
  } catch (error) {
    console.error('Error al desactivar el servicio:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /api/serviciosDB/servicios/{plantel}:
 *   get:
 *     summary: Obtener servicios por plantel
 *     description: Retorna los servicios disponibles para un plantel específico.
 *     tags:
 *       - Servicios
 *     parameters:
 *       - in: path
 *         name: plantel
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del plantel
 *     responses:
 *       200:
 *         description: Lista de servicios del plantel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServicioRequest'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/servicios/:plantel', async (req, res) => {
  const nom_plantel = req.params.plantel;
  try {
    const result = await obtenerServicioPorPlantel(nom_plantel);
    res.json(result);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
