const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ✅ Add this
const db = require('../db');

// login route
router.post('/login', (req, res) => {
  const { email, password, isAdmin } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      if (isAdmin && user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as admin' });
      }

      // ✅ Generate JWT and set cookie
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      });

      // ✅ Send user info (token is in cookie)
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      res.status(500).json({ message: 'Server error during login' });
    }
  });
});

module.exports = router;
