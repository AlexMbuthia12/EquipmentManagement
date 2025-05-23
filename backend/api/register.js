const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { userName, email, password, department, role } = req.body;

  if (!userName || !email || !password || !department || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0)
      return res.status(400).json({ message: 'Email already exists' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = `
        INSERT INTO users (userName, email, password, department, role)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [userName, email, hashedPassword, department, role],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error creating user' });
          }

          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
});

module.exports = router;
