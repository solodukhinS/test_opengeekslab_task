const Joi = require('@hapi/joi');

const recipeValidation = data => {
  const schema = Joi.object({
    name: Joi.string().required(),
    text: Joi.string().required(),
    id_category: Joi.number()
      .integer()
      .required(),
  });
  return schema.validate(data);
};

module.exports = recipeValidation;
