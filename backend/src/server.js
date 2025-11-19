const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const setupSwagger = require('./swagger');

const app = express(); // <-- declare app first

setupSwagger(app); // <-- now app exists

const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.get('/health', (req, res) => res.send('Backend is running!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
