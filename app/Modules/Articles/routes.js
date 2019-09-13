const Router = require('express').Router();
const Controller = require('./Controller');

Router.post('/', Controller.create);
Router.get('/:id', Controller.getById);
Router.get('/category/:id', Controller.getCategoryById);
Router.put('/:id', Controller.update);
Router.delete('/:id', Controller.delete);

module.exports = Router;
