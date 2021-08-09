require('dotenv').config();
const mysql = require('mysql');
let db;
if (process.env.NODE_ENV === "production") {
  db = mysql.createPool({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
  });

} else {
  db = mysql.createPool({
    host : process.env.LOCAL_DATABASE_HOST,
    user : process.env.LOCAL_DATABASE_USER,
    password : process.env.LOCAL_DATABASE_PASSWORD,
    database : process.env.LOCAL_DATABASE
  });
}

// console.log('process.env--', process.env);

module.exports = db;