const express = require('express'); // Import the express module
const cors = require('cors'); // Import the cors module
const bcrypt = require('bcrypt'); // Import the bcrypt module
const db = require('./db'); // Import your database module
const app = express(); // Initialize the Express application
const loginRoutes = require('./api/login'); // Import your login routes
const registerRoutes = require('./api/register'); // Import your register routes

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Use the routes
app.use('/api', loginRoutes); // Makes /api/login available
app.use('/api', registerRoutes); // Makes /api/register available

// Start server
app.listen(7000, () => {
  console.log('🚀 Backend running on http://localhost:7000');
});
