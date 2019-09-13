# Test Open Geeks Lab Task
 
 `docker-compose` only for an easy way to run the mysql db. Run the app localy on node version not lower than 8.
 

## List of some modules which are important
 - <a href="https://www.npmjs.com/package/mysql-migrations">mysql-migrations</a>
## Migration/Seed guide
From database folder
`node migration.js up` - runs up all migrations
`node seed.js up` - seed the db with demo data

For editional info read the docs

### Instalation
 Copy the content of .env.example file into .env file and fill all of config variables.
 Make sure that the db server is up and running


 - `npm install`
 - `npm install nodemon -g`
 - `npm start`
