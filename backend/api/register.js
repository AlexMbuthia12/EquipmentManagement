const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

  router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0)
      return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(insertQuery, [email, hashedPassword, 'user'], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating user' });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

 module.exports = router;
