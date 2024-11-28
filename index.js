const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const studentRoutes = require('./src/routes/student'); // Use 'routes' folder instead of 'model'
const classRoutes = require('./src/routes/class');     // Use 'routes' folder instead of 'model'
const teacherRoutes = require('./src/routes/teacher'); // Use 'routes' folder instead of 'model'
const errorHandler = require('./src/validator/erorHandler');

dotenv.config();
app.use(cors());

// Middleware for JSON and URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/student', studentRoutes);
app.use('/class', classRoutes);
app.use('/teacher', teacherRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'School app is working fine',
        status: 'Server is up',
        now: new Date().toLocaleDateString()
    });
});

// Error handling middleware (after routes)
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MongoDBUrl)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Start the server
const Port = process.env.PORT || 4000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
