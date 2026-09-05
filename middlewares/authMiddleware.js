const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

// Middleware to verify JWT Token
const authenticateUser = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided or invalid format.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach decoded user info to the request object
    req.user = decoded;
    
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Middleware for Role-Based Access Control (RBAC)
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRole
};
