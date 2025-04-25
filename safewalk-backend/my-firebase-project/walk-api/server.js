const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // ✅ Set to match frontend

const SECRET_KEY = 'safewalk_secret';

app.use(cors());
app.use(bodyParser.json());

// ⛓️ In-memory user storage (simulate DB)
const users = [
  // Preload test users with bcrypt-hashed passwords
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    id: 2,
    name: 'Jane',
    email: 'jane@demo.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    id: 3,
    name: 'John',
    email: 'john@demo.com',
    password: bcrypt.hashSync('abcdef', 10),
  },
];
let userId = 4; // Counter for new signups

app.get("/",(req,res)=>{
  res.send("Server is Working!!!");
})
// 🔐 Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password); // 🔍 Log inputs

  const user = users.find(u => u.email === email);
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Invalid password');
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  console.log('Login successful');
  res.json({ token });
});
// 🆕 Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: userId++, name, email, password: hashedPassword };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1d' });
  res.status(201).json({ token });
});

// 📡 Dashboard (protected)
app.get('/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    res.json({
      email: user.email,
      message: `Welcome back, ${user.name}`,
      tasksCompleted: 7,
      pendingApprovals: 2,
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
