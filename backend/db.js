// const mysql = require('mysql2');

// // Replace with your actual values from freesqldatabase.com
// const pool = mysql.createPool({
//   host: "sql.freesqldatabase.com",     // ✅ Freesqldatabase host
//   user: "sql3789931",                 // ✅ Your username
//   password: "gWtruJYFk7",            // ✅ Your password
//   database: "sql3789931",             // ✅ Database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Optional: test connection
// pool.getConnection((err, connection) => {
//   if (err) {
//     console.error('❌ MySQL connection failed:', err);
//   } else {
//     console.log('✅ Connected to remote MySQL');
//     connection.release();
//   }
// });

// module.exports = pool;

require('dotenv').config();
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



