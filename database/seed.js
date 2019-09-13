require('dotenv').config({ path: './../.env' });
const connection = require('./../connectors');
const migration = require('mysql-migrations');

migration.init(connection, __dirname + '/seeds');
