const fs = require('fs');
const path = require('path');

const errorLogPath = path.join(__dirname, '..', 'logs', 'error.txt');

const errorHandler = (err, req, res) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `${timestamp} - ${err.message}\n`;

  fs.appendFile(errorLogPath, errorMessage, (writeErr) => {
    if (writeErr) {
      console.error('Error writing error log:', writeErr.message);
    }
  });

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Unexpected server error',
  });
};

module.exports = errorHandler;
