// Standalone server to run the Python backend and proxy
const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files and API routes
app.use('/api', require('./server-routes'));

// Start the Python backend
let pythonBackend;

function startPythonBackend() {
  console.log('Starting Python backend...');
  pythonBackend = spawn('python3', ['api_server.py'], {
    cwd: __dirname, // Run in the current directory
    env: { ...process.env }
  });

  pythonBackend.stdout.on('data', (data) => {
    console.log(`Python backend: ${data}`);
  });

  pythonBackend.stderr.on('data', (data) => {
    console.error(`Python backend error: ${data}`);
  });

  pythonBackend.on('close', (code) => {
    console.log(`Python backend exited with code ${code}`);
    // Restart after a delay
    setTimeout(startPythonBackend, 5000);
  });
}

// Start the Python backend when the server starts
startPythonBackend();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all handler for Vercel compatibility
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});