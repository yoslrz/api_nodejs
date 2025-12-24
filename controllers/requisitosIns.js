//** CRUD de la tabla documentos */
const express = require('express');
const router = express.Router();
const { requestDocuemento } = require('../service/models.js');

const {
  obtenerDocumentos,
  agregarDocumentacion,
  editarDocumentacion,
} = require('../service/requisitos.js');

/**
 * @openapi
 * tags:
 *   - name: Requisitos
 *     description: Gestión de documentacion 
 */

/**
 * @openapi
 * /api/documentosDB:
 *   get:
 *     summary: Obtener la lista de documentos
 *     description: Retorna todos los documentos registrados en el sistema académico.
 *     tags:
 *       - Documentos
 *     responses:
 *       200:
 *         description: Lista de documentos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DocumentoRequest'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', async (req, res) => {
  try {
    const result = await obtenerDocumentos();
    res.json(result);
  } catch (error) {
    console.error('ERROR al ejecutar la consulta: ', error);
    res.status(500).json({ error: error.message });
  }
});


/**
 * @openapi
 * /api/documentosDB:
 *   post:
 *     summary: Crear un nuevo documento
 *     description: Registra un nuevo documento requerido para un evento académico.
 *     tags:
 *       - Documentos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentoRequest'
 *     responses:
 *       201:
 *         description: Documento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentoRequest'
 *       400:
 *         description: Error de validación o datos incorrectos
 */
router.post('/', async (req, res) => {
  const { error, value } = requestDocuemento.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoDoc = await agregarDocumentacion(value);
    res.status(201).json(nuevoDoc);
  } catch (err) {
    console.error('Error al crear doc:', err);
    res.status(400).json({ error: err.message });
  }
});


/**
 * @openapi
 * /api/documentosDB:
 *   post:
 *     summary: Edicion de documento
 *     description: Modificacion de documento para un evento académico.
 *     tags:
 *       - Documentos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DocumentoRequest'
 *     responses:
 *       201:
 *         description: Documento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DocumentoRequest'
 *       400:
 *         description: Error de validación o datos incorrectos
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = requestDocuemento.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaDoc = await editarDocumentacion(id, value);
    res.status(201).json(nuevaDoc);
  } catch (err) {
    console.error('Error al editar doc:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
