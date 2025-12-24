// ** CRUD para la oferta académica **
const express = require('express');
const { requestOferta } = require('../service/models.js');
const {
  obtenerOfertaAcademica,
  agregarOfertaAcademica,
  obtenerCarrerasPorPlantel,
  eliminarCarrera,
  obtenerPosgradosPorPlantel,
  editarOfertaAcademica,
} = require('../service/oferta.js');

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Oferta Académica
 *     description: Gestión de la oferta académica por plantel
 */

/**
 * @openapi
 * /api/ofertaAcademicaBD:
 *   get:
 *     summary: Obtener toda la oferta académica
 *     tags:
 *       - Oferta Académica
 *     responses:
 *       200:
 *         description: Lista completa de la oferta académica
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res) => {
  try {
    const resultados = await obtenerOfertaAcademica();
    res.json(resultados);
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @openapi
 * /api/ofertaAcademicaBD/carreras/{plantel}:
 *   get:
 *     summary: Obtener carreras por plantel
 *     tags:
 *       - Oferta Académica
 *     parameters:
 *       - in: path
 *         name: plantel
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del plantel
 *     responses:
 *       200:
 *         description: Lista de carreras del plantel
 *       500:
 *         description: Error del servidor
 */
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

/**
 * @openapi
 * /api/ofertaAcademicaBD/posgrados/{plantel}:
 *   get:
 *     summary: Obtener posgrados por plantel
 *     tags:
 *       - Oferta Académica
 *     parameters:
 *       - in: path
 *         name: plantel
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del plantel
 *     responses:
 *       200:
 *         description: Lista de posgrados del plantel
 *       500:
 *         description: Error del servidor
 */
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

/**
 * @openapi
 * /api/ofertaAcademicaBD:
 *   post:
 *     summary: Crear una nueva oferta académica
 *     tags:
 *       - Oferta Académica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfertaRequest'
 *     responses:
 *       201:
 *         description: Oferta académica creada correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
  const { error, value } = requestOferta.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaOferta = await agregarOfertaAcademica(value);
    res.status(201).json(nuevaOferta);
  } catch (err) {
    console.error('Error al crear oferta académica:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /api/ofertaAcademicaBD/{id}:
 *   put:
 *     summary: Editar una oferta académica
 *     tags:
 *       - Oferta Académica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la oferta académica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfertaRequest'
 *     responses:
 *       200:
 *         description: Oferta académica actualizada correctamente
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestOferta.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaOferta = await editarOfertaAcademica(id, value);
    res.status(201).json(nuevaOferta);
  } catch (err) {
    console.error('Error al editar oferta académica:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @openapi
 * /api/ofertaAcademicaBD/{id}:
 *   delete:
 *     summary: Eliminar una oferta académica
 *     tags:
 *       - Oferta Académica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la oferta académica
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       500:
 *         description: Error al eliminar el registro
 */
router.delete('/:id', async (req, res) => {
  const id_ofer_academica = req.params.id;
  try {
    await eliminarCarrera(id_ofer_academica);
    return res.json({ mensaje: 'Registro eliminado' });
  } catch (error) {
    console.error('ERROR: Al eliminar el registro de la base de datos:', error);
    return res.status(500).json({
      mensaje: 'Error al eliminar el registro',
      error: error.message,
    });
  }
});

module.exports = router;
