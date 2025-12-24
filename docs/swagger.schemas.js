/**
 * @openapi
 * components:
 *   schemas:
 *     FechaRequest:
 *       type: object
 *       required:
 *         - evento
 *         - fecha_inicio
 *         - fecha_fin
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         evento:
 *           type: string
 *           example: "Inscripciones"
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           example: "2025-01-10"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           example: "2025-01-20"
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     OfertaRequest:
 *       type: object
 *       required:
 *         - nombre
 *         - tipo
 *         - semestres
 *         - plantel
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único de la oferta académica
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *
 *         nombre:
 *           type: string
 *           description: Nombre de la carrera o posgrado
 *           example: "Ingeniería en Software"
 *
 *         tipo:
 *           type: string
 *           description: Tipo de programa académico
 *           enum:
 *             - Licenciatura
 *             - Posgrado
 *           example: "Licenciatura"
 *
 *         semestres:
 *           type: integer
 *           description: Número total de semestres del programa
 *           example: 8
 *           minimum: 1
 *
 *         plantel:
 *           type: string
 *           description: |
 *             Lista de planteles separados por coma.
 *             Los valores deben pertenecer al catálogo de planteles válidos.
 *           example: "San Lorenzo Tezonco, Centro Historico, Casa Libertad, Cuautepec, Del valle"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     DocumentoRequest:
 *       type: object
 *       required:
 *         - documento
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         documento:
 *           type: string
 *           example: "Acta de nacimiento"
 *         descripcion:
 *           type: string
 *           format: date
 *           example: "Documento oficial que acredita la identidad, nombre completo, fecha y lugar de nacimiento del aspirante."
 *         evento:
 *           type: string
 *           format: date
 *           example: "Inscripcion"
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     ServicioRequest:
 *       type: object
 *       required:
 *         - nombre
 *         - plantel
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *           description: Identificador del servicio
 *
 *         nombre:
 *           type: string
 *           example: "Biblioteca"
 *           description: Nombre del servicio institucional
 *
 *         descripcion:
 *           type: string
 *           example: "Servicio de consulta y préstamo de libros"
 *           description: Descripción del servicio
 *
 *         plantel:
 *           type: string
 *           example: "Iztapalapa"
 *           description: Plantel donde se ofrece el servicio
 *
 *         estado:
 *           type: boolean
 *           example: true
 *           description: Indica si el servicio está activo
 */
