const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// Load environment variables (ensure dotenv is configured in your main file or here if needed)
// Usually dotenv.config() is in app.js, but we'll assume it's loaded or process.env works
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_123';

class AuthController {
  // 1. Register a new user
  static async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      // Check for existing user
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create the user
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user' // Default to 'user' if not provided
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }

  // 2. Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Check if user exists
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT Token
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({
        message: 'Login successful',
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Failed to login' });
    }
  }
}

module.exports = AuthController;
