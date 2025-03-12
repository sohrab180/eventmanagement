const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('Connecting database...');
         mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.CONNECTION_STRING || 'mongodb+srv://sohrabali180:JekWxT4NqHahIPmG@cluster0.c9lvv.mongodb.net/eventmanagement?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 100000,
        });
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
