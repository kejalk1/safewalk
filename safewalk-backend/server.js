const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// 🔥 Initialize Firebase Admin SDK
const serviceAccount = require('./my-firebase-project/config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// ✅ Create the /login endpoint
app.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    res.status(200).json({ message: 'Login successful', uid });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});

// 🔥 Your existing routes (keep them)
// app.use('/users', require('./users'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
