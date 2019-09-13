const Router = require('express').Router();
const Controller = require('./Controller');

Router.post('/', Controller.create);
Router.get('/:id', Controller.getById);
Router.get('/articles/:id', Controller.getArticlesById);
Router.get('/recipes/:id', Controller.getRecipesById);

Router.put('/:id', Controller.update);
Router.delete('/:id', Controller.delete);

module.exports = Router;
