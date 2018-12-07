var pgp = require('pg-promise')();

var dbConfig;

 if (process.env.DATABASE_URL == null){
 	dbConfig = {
 		host: 'localhost',
 		port: 5432,
 		database: 'Database',
 		user: 'postgres',
 		password: 'password'
 	};
 }else{
 	dbConfig = process.env.DATABASE_URL;
 }


var db = pgp(dbConfig);
module.exports = db;