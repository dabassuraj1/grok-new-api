// Main entry point for Vercel deployment
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve API routes
app.use('/api', require('./server-routes'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint with API info
app.get('/', (req, res) => {
  res.json({
    name: 'Grok API',
    version: '1.0.0',
    description: 'Grok API with jailbreak functionality for Vercel deployment',
    endpoints: {
      chat: '/api/chat (POST)',
      health: '/health (GET)'
    },
    models: [
      'grok-3-auto',
      'grok-3-fast',
      'grok-4',
      'grok-4-mini-thinking-tahoe'
    ],
    jailbreak: true
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!' 
  });
});

// Catch-all handler
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;