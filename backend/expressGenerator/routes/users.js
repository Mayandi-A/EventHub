const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();
const User = require('../models/user');

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const {username, email, password, role} = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({message: "Invalid credentials"});
    // bcrypt compare
    const valid = await bcrypt.compare(password, user.password);
    console.log(valid);
    if (!valid) return res.status(400).json({message: "Invalid credentials"});
    // You can generate a JWT if needed for sessions
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: "Login successful", user: { id: user._id, username: user.username, email: user.email, role: user.role }, token });
  } catch (e) {
    res.status(500).json({message: "Server error", error: e.message});
  }
});

module.exports = router;
