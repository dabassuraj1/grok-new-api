@echo off
REM Startup script for Grok API on Windows

echo Starting Grok API Server...

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.9 or higher.
    pause
    exit /b 1
)

REM Check if pip is available
pip --version >nul 2>&1
if errorlevel 1 (
    echo pip is not installed. Please install pip.
    pause
    exit /b 1
)

REM Install dependencies if requirements.txt exists
if exist "requirements.txt" (
    echo Installing dependencies...
    pip install -r requirements.txt
)

REM Start the API server
echo Starting API server on port 6969...
python api_server.py

pause