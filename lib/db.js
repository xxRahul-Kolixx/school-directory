// lib/db.js
import mysql from "mysql2/promise";

let pool;

// Use global to avoid creating multiple pools during hot reloads in dev
if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

pool = global._mysqlPool;

export default pool;
