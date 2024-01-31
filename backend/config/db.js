// const mysql = require("mysql");

// const db = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:process.env.PASSWORD,
//     database:"tennis_app",
// })

// module.exports = db

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "tennis_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
