import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend running OK!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
