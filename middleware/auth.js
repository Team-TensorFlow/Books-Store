const jwt = require('jsonwebtoken');

// 1. Verify JWT Token Middleware
exports.protect = (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token is provided in the headers
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, missing token' });
  }

  try {
    // Extract the token string (remove 'Bearer ')
    token = token.split(' ')[1];

    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');

    // Attach decoded token data (id, role) to the request object
    req.user = decoded;
    
    // Proceed to the controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
  }
};

// 2. Role-Based Access Control (RBAC) Middleware
exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by the protect middleware above
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Forbidden: You do not have permission to access this resource' 
      });
    }
    
    // User has the correct role, proceed to the controller
    next();
  };
};