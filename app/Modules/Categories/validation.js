const Joi = require('@hapi/joi');

const categoryValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    id_parent: Joi.number().integer(),
  });
  return schema.validate(data);
};

module.exports = categoryValidation;
