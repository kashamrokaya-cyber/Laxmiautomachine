const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Booking = require('./models/Booking');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/countingMachine')
  .then(() => {
    console.log('MongoDB Connected');
    seedAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Seed Admin Function
async function seedAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await User.findOne({ email: 'admin@countfix.com' });
  
  if (!admin) {
    await User.create({
      email: 'admin@countfix.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created: admin@countfix.com / admin123');
  } else {
    admin.password = hashedPassword;
    await admin.save();
    console.log('Admin user password reset: admin@countfix.com / admin123');
  }
}

// Authentication Middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- ROUTES ---

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Post Booking (Public)
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    io.emit('newBooking', savedBooking);
    
    // Attempt to send email but DON'T crash if it fails
    sendAdminEmail(savedBooking).catch(err => console.error('Email error:', err.message));
    
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Archive Booking (Protected)
app.patch('/api/bookings/:id/archive', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'archived' }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Attempt to notify customer but DON'T crash if it fails
    sendCustomerEmail(booking).catch(err => console.error('Customer email error:', err.message));
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Bookings (Protected)
app.get('/api/bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ status: { $ne: 'archived' } }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Email Helpers
async function sendAdminEmail(booking) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'New Service Request - CountFix',
    text: `New request from ${booking.name}. Phone: ${booking.phone}.`
  };
  await transporter.sendMail(mailOptions);
}

async function sendCustomerEmail(booking) {
  if (!booking.email || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Update on your Service Request - CountFix',
    text: `Hello ${booking.name}, your service request for ${booking.brand} has been processed. Thank you!`
  };
  await transporter.sendMail(mailOptions);
}

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('Admin connected:', socket.id);
  socket.on('disconnect', () => console.log('Admin disconnected'));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
