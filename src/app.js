const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const propertiesRoutes = require('./routes/properties');
const inquiriesRoutes = require('./routes/inquiries');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/inquiries', inquiriesRoutes);

app.get('/', (req, res) => res.send('Rimora Backend Online'));

module.exports = app;
