// Standalone server for Vercel compatibility
// This file is kept for Vercel deployment compatibility
// The actual API is served by api_server.py

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple proxy to the Python backend
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({
  target: process.env.GROK_BACKEND_URL || 'http://localhost:6969',
  changeOrigin: true,
}));

app.use('/health', createProxyMiddleware({
  target: process.env.GROK_BACKEND_URL || 'http://localhost:6969',
  changeOrigin: true,
}));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Grok API Proxy',
    version: '1.0.0',
    message: 'This is a proxy server. The actual API is served by the Python backend.',
    backend_url: process.env.GROK_BACKEND_URL || 'http://localhost:6969'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Catch-all handler for Vercel compatibility
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});