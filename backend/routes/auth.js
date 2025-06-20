const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// GET /auth/me
router.get('/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const query = 'SELECT id, username, email, role FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = results[0];
      res.json(user);
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out successfully' });
});


module.exports = router;
