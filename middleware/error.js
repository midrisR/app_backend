const errorHandler = (err, req, res, next) => {
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({
    success: false,
    error: err,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
