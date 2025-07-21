const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken'); // ✅ Required for token decoding

// 📌 1. Booking count (for notifications)
router.get('/count', async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting count' });
  }
});

// 📌1.1 Admin: Get all bookings
router.get('/all', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        b.id, 
        b.status, 
        b.message, 
        b.comment, 
        i.name AS item_name, 
        u.userName AS user_name
      FROM bookings b
      JOIN items i ON b.item_id = i.id
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});


// 📌 2. Get bookings for logged-in user via token
router.get('/me', (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized: No token found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const query = `
      SELECT b.id, b.status, b.message, b.comment, i.name AS item_name
      FROM bookings b
      JOIN items i ON b.item_id = i.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }

      res.json(results);
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// 📌 3. Get bookings by user ID
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.promise().query(`
      SELECT b.id, b.status, b.message, b.comment, i.name AS item_name
      FROM bookings b
      JOIN items i ON b.item_id = i.id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
    `, [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user bookings" });
  }
});

// 📌 4. Create booking
router.post('/', async (req, res) => {
  const { itemId, userId, message } = req.body;

  try {
    const [itemRows] = await db.promise().query('SELECT available FROM items WHERE id = ?', [itemId]);
    if (itemRows.length === 0) return res.status(404).json({ message: 'Item not found' });

    await db.promise().query(
      'INSERT INTO bookings (item_id, user_id, message, status) VALUES (?, ?, ?, ?)',
      [itemId, userId, message || '', 'pending']
    );

    res.status(201).json({ message: 'Booking request submitted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📌 5. Edit booking message (only if pending)
router.put('/:id/message', async (req, res) => {
  const bookingId = req.params.id;
  const { message } = req.body;

  try {
    await db.promise().query(
      'UPDATE bookings SET message = ? WHERE id = ? AND status = "pending"',
      [message, bookingId]
    );
    res.json({ message: 'Booking message updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update message' });
  }
});

// 📌 6. Admin update status/comment
router.put('/:id', async (req, res) => {
  const { status, comment } = req.body;
  const bookingId = req.params.id;

  try {
    await db.promise().query(
      'UPDATE bookings SET status = ?, comment = ? WHERE id = ?',
      [status, comment, bookingId]
    );

    if (status === 'accepted') {
      await db.promise().query(
        'UPDATE items SET available = 0 WHERE id = (SELECT item_id FROM bookings WHERE id = ?)',
        [bookingId]
      );
    }

    res.json({ message: 'Booking updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
