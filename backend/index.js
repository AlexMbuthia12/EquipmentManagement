require('dotenv').config(); // ✅ Enables .env variables like JWT_SECRET

const express = require('express'); // Import the express module
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Import the cors module
const bcrypt = require('bcrypt'); // Import the bcrypt module
const db = require('./db'); // Import your database module
const loginRoutes = require('./api/login'); // Import your login routes
const registerRoutes = require('./api/register'); // Import your register routes
const path = require('path');
const itemRoutes = require('./api/items');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

const app = express(); // Initialize the Express application
// List of allowed origins
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:4173",
  "https://equipmentmanagement-h96sya2h9-alex-mbuthias-projects.vercel.app",
  "http://localhost:7000",
]);

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Incoming CORS request from:", origin);
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());

// ✅ Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});


// Use the routes
app.use('/api', loginRoutes); // Makes /api/login available
app.use('/api', registerRoutes); // Makes /api/register available
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/items', itemRoutes);
app.use('/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// // ✅ Serve React frontend (client/build)
// app.use(express.static(path.join(__dirname, 'client/build')));

// // ✅ Catch-all route to serve React index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });
// ✅ Add this LAST — global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
// Start server
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
 

