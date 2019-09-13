const Router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');

Router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Router.use('/article', require('../app/Modules/Articles/routes'));
Router.use('/category', require('../app/Modules/Categories/routes'));
Router.use('/recipe', require('../app/Modules/Recipes/routes'));

module.exports = Router;
