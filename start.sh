#!/bin/bash
# Startup script for Grok API

echo "Starting Grok API Server..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Python3 is not installed. Please install Python 3.9 or higher."
    exit 1
fi

# Check if pip is available
if ! command -v pip &> /dev/null; then
    echo "pip is not installed. Please install pip."
    exit 1
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Start the API server
echo "Starting API server on port 6969..."
python3 api_server.py