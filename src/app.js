const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

module.exports = app;
