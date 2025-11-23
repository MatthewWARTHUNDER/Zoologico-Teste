const Joi = require('joi');

const animalSchema = Joi.object({
    nome: Joi.string().max(150).required(),
    especie: Joi.string().max(100).required(),
    data_nascimento: Joi.date().iso().less('now').allow(null, ''),
    origem: Joi.string().max(100).allow('', null),
    habitat: Joi.string().max(100).allow('', null),
    descricao: Joi.string().max(2000).allow('', null)
});


function validate(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, convert: true });
        if (error) {
            return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
        }
        req.validated = value;
        next();
    };
}

module.exports = { animalSchema, validate };