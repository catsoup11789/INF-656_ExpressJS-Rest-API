const express = require('express');
const path = require('path');
const cors = require('cors');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/browse', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'browse.html'));
});

app.use('/api/items', itemRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

module.exports = app;
