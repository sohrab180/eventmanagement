require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorLogger = require('./middlewares/errorLoger');


// Initialize Express App
const app = express();

// Import Routes
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/eventManagement');

// Load Environment Variables
const API_PREFIX = process.env.API_URL || '/api/v1';
const PORT = process.env.PORT || 3000;

// Connect to Database
const connectDB = require('./config/dbConnection');
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}));

// Routes
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/event-managemnet`, eventRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});
app.use((err, req, res, next) => {
    errorLogger(err, req, res, next);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
