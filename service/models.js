const Joi = require('joi');

const plantelesValidos = [
  'San Lorenzo Tezonco',
  'Centro Historico',
  'Cuactepec',
  'Del valle',
  'Casa Libertad'
];

const requestFechas = Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).optional(),
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
    id: Joi.string().guid({ version: 'uuidv4' }).optional(),
    nombre: Joi.string().required(),
    tipo: Joi.string().valid('Licenciatura', 'Posgrado').required(),
    semestres: Joi.number().required(),
    plantel: Joi.string().custom((value, helpers) => {
        const valores = value.split(',').map(v => v.trim());
        const invalidos = valores.filter(v => !plantelesValidos.includes(v));

        if (invalidos.length > 0) {
        return helpers.message(`Planteles inválidos: ${invalidos.join(', ')}`);
        }

        return value;
    }).required()
})

module.exports = {
    requestFechas,
    requestInscripcion,
    requestOferta
};
