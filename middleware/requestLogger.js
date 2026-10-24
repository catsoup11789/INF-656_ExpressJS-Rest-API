const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '..', 'logs', 'requests.txt');

const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${req.method} ${req.originalUrl} ${timestamp}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing request log:', err.message);
    }
  });

  next();
};

module.exports = requestLogger;

