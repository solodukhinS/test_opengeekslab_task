const Joi = require('@hapi/joi');

const articleValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    text: Joi.string().required(),
    id_category: Joi.number()
      .integer()
      .required(),
  });
  return schema.validate(data);
};

module.exports = articleValidation;
