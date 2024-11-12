export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      message: 'Resource not found'
    });
  }

  res.status(500).json({
    message: 'Internal Server Error'
  });
};