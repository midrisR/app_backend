const errorHandler = (err, req, res, next) => {
  res.json({
    success: false,
    error: err,
    // stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
