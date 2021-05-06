const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// Import routes
const authRoute = require('./routes/auth');
console.log("🚀 ~ file: index.js ~ line 7 ~ authRoute", authRoute)
const postRoute = require('./routes/posts');

dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log('connected to db'))

// Middleware
app.use(express.json())
// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000, ()=> console.log('Server up and running'));