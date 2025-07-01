const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../middleware/imageupload');

// POST /api/items
router.post('/', upload.single('image'), (req, res) => {
  const { type, name } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!type || !name || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO items (type, name, image, available) VALUES (?, ?, ?, ?)';
  db.query(sql, [type, name, image, true], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    res.status(201).json({ id: result.insertId, type, name, image, available: true });
  });
});

// GET /api/items - fetch all items
router.get('/', async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM items");
    res.json(results);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/items/:id - fetch one item by ID
router.get('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    const [rows] = await db.promise().query('SELECT * FROM items WHERE id = ?', [itemId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(rows[0]); // return the single item
  } catch (err) {
    console.error('Error fetching item by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
