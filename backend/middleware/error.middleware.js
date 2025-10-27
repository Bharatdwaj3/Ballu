// backend/middleware/dbMiddleware.js
// MONGO-SPECIFIC ERROR HANDLER – FIXED FOR DOUBLE-SEND CRASH
// Handles: ValidationError, CastError, Duplicate Key (11000), Connection, etc.

const errorMiddleware = (err, req,res, next) => {
  console.error('MONGO ERROR CAUGHT:', err); // LOG FULL ERROR

  // === CRASH FIX: STOP IF RESPONSE ALREADY SENT ===
  if (res.headersSent) {
    return next(err); // Let Express close cleanly
  }
  // ================================================

  let status = 500;
  let message = 'Server Error';
  const errors = {};

  // === MONGO-SPECIFIC PARSING (keep ALL your special cases) ===
  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Validation Failed';
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } 
  else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid ID format';
  } 
  else if (err.code === 11000) { // Duplicate key
    status = 400;
    message = 'Duplicate field value';
    const field = Object.keys(err.keyValue)[0];
    errors[field] = `${field} already exists`;
  } 
  else if (err.name === 'MongoServerError' || err.message.includes('ECONNREFUSED')) {
    status = 503;
    message = 'Database connection failed';
  }
  // Add MORE Mongo cases here if you have them...

  // === SEND ONE CLEAN RESPONSE ===
  res.status(status).json({
    success: false,
    message,
    ...(Object.keys(errors).length && { errors }),
    // Dev stack trace
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.module.exports = errorMiddleware;