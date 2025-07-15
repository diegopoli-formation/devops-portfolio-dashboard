const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }

  jwt.verify(
    token, 
    process.env.JWT_SECRET || 'your_jwt_secret',
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          success: false, 
          message: 'Failed to authenticate token' 
        });
      }
      
      try {
        const user = await User.findByPk(decoded.id);
        if (!user) {
          return res.status(404).json({ 
            success: false, 
            message: 'User not found' 
          });
        }
        
        req.user = user;
        next();
      } catch (error) {
        return res.status(500).json({ 
          success: false, 
          message: 'Error finding user',
          error: error.message 
        });
      }
    }
  );
};

// Middleware to check if user has admin role
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Requires admin role' 
    });
  }
  next();
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '24h' }
  );
};

exports.generateToken = generateToken;
