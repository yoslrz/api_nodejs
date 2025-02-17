const Joi = require('joi');

const requestFechas = Joi.object({
    id: Joi.number().optional(),
    modulo: Joi.string().min(3).max(50).required(),  // Requerido
    evento: Joi.string().required(),  // Requerido
    fecha_inicio: Joi.date().required(), // OPCIONAL
    fecha_fin: Joi.date().required(),
});

const requestInscripcion = Joi.object({
    id: Joi.number().optional(),
    documento: Joi.string().required(),
    descripcion: Joi.string().optional()
});

const requestOferta = Joi.object({
    id: Joi.number().optional(),
    duracion: Joi.string().required(),
    nombre: Joi.string().required(),
    tipo: Joi.string().valid('Licenciatura', 'Posgrado'),
    plantel: Joi.string().valid('San Lorenzo Tezonco','Centro Historico','Cuactepec', 'Del valle')
})

module.exports = {
    requestFechas,
    requestInscripcion,
    requestOferta
};
