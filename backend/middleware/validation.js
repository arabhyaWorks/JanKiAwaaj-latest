// Validation middleware for API requests

const validateQuery = (req, res, next) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Query parameter "q" is required and must be a non-empty string'
    });
  }

  if (q.length > 500) {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Query parameter "q" must be less than 500 characters'
    });
  }

  // Sanitize query
  req.query.q = q.trim();
  next();
};

const validateUsername = (req, res, next) => {
  const { username } = req.params;
  
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Username parameter is required and must be a non-empty string'
    });
  }

  if (!/^[a-zA-Z0-9_]{1,15}$/.test(username)) {
    return res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: 'Username must be 1-15 characters and contain only letters, numbers, and underscores'
    });
  }

  next();
};

module.exports = {
  validateQuery,
  validateUsername
};