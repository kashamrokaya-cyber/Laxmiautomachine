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
const Bank = require('./models/Bank');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:5173", "https://laxmiautomachine.vercel.app"], // Add your Vercel URL here later
    methods: ["GET", "POST", "PATCH"] 
  }
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'laxmi_auto_secret_123';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/countingMachine';
mongoose.connect(MONGODB_URI)
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
    console.log('Admin user created');
  } else {
    admin.password = hashedPassword;
    await admin.save();
    console.log('Admin user updated');
  }
}

// Auth Middleware
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    io.emit('newBooking', savedBooking);
    sendAdminEmail(savedBooking).catch(err => console.error('Email failed:', err.message));
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.patch('/api/bookings/:id/archive', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'archived' }, { new: true });
    if (booking) sendCustomerEmail(booking).catch(err => console.error('Email failed:', err.message));
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ status: { $ne: 'archived' } }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Bank Routes
app.get('/api/banks', async (req, res) => {
  try {
    const banks = await Bank.find().sort({ createdAt: -1 });
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// app.post('/api/banks', protect, async (req, res) => {
//   try {
//     const newBank = new Bank(req.body);
//     const savedBank = await newBank.save();
//     res.status(201).json(savedBank);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

app.delete('/api/banks/:id', protect, async (req, res) => {
  try {
    await Bank.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bank deleted' });
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
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'New Service Request',
    text: `New request from ${booking.name}. Phone: ${booking.phone}. Problem: ${booking.problem}`
  });
}

async function sendCustomerEmail(booking) {
  if (!booking.email || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: 'Request Received',
    text: `Hi ${booking.name}, your request for ${booking.brand} is being processed.`
  });
}

io.on('connection', (socket) => {
  console.log('Admin connected');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
