const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
    connection.release();
  }
});

module.exports = pool;


// const mysql = require('mysql2');

// // Create connection pool
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "EQMGMT",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Optional: test connection once to verify setup
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('❌ MySQL connection failed:', err);
//   } else {
//     console.log('✅ Connected to MySQL');
//     connection.release(); // Always release manually acquired connections
//   }
// });

// module.exports = pool; // Allows both callback and async/await usage



