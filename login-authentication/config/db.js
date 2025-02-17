const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "payslips",
    connectionLimit: 10,
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
    } else {
      console.log("Connected to MySQL database");
      connection.release();
    }
});
  
module.exports = pool.promise();