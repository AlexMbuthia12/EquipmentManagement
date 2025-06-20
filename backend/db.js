// const mysql = require('mysql2');

// // db.js
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "EQMGMT",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('✅ Connected to MySQL');
// });

// module.exports = pool; // Export the raw pool (supports both)
// // module.exports = pool.promise(); // Enables async/await use
const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "EQMGMT",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test connection once to verify setup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL');
    connection.release(); // Always release manually acquired connections
  }
});

module.exports = pool; // Allows both callback and async/await usage



