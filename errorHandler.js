const express = require('express');
const router = express.Router();

const app = express();

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    message: err.message,
    /*
     if we're in development mode, include stack trace (full error object)
     otherwise, it's an empty object so the user doesn't see all of that
    */
    error: app.get('env') === 'development' ? err : {}
  });
}

module.exports = errorHandler;
