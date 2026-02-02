#!/bin/bash
# Quick start script for local development server

cd "$(dirname "$0")"

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║      Starting Local Development Server...                ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 server.py
elif command -v python &> /dev/null; then
    python server.py
else
    echo "❌ Error: Python is not installed."
    echo ""
    echo "Please install Python from: https://www.python.org/downloads/"
    echo ""
    echo "Or try one of these alternatives:"
    echo "  • npx http-server -p 8000"
    echo "  • php -S localhost:8000"
    echo ""
    echo "See START_SERVER.md for more options."
    exit 1
fi
