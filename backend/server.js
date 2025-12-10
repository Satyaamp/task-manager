const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');


dotenv.config();


connectDB();

const app = express();
app.set('trust proxy', 1);


app.use(cors());                 
app.use(express.json());         


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                 // 5 attempts per IP
  message: 'Too many login attempts. Try again later.',
});

app.use('/api/auth/login', loginLimiter);


app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});


const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




