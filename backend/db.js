const mysql = require('mysql2');

// db.js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'EQMGMT'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

module.exports = db;
