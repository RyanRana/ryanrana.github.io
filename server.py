#!/usr/bin/env python3
"""
Simple HTTP Server for Local Development
Run this script to serve your website locally and avoid CORS issues.
"""

import http.server
import socketserver
import os
import sys

# Change to the directory where this script is located
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow fetch requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging format
        sys.stdout.write("%s - [%s] %s\n" %
                         (self.address_string(),
                          self.log_date_time_string(),
                          format % args))

Handler = MyHTTPRequestHandler

print(f"""
╔══════════════════════════════════════════════════════════╗
║           Local Development Server Started               ║
╚══════════════════════════════════════════════════════════╝

Server running at: http://localhost:{PORT}

Open your browser and navigate to:
  → http://localhost:{PORT}

To stop the server, press Ctrl+C

""")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n\n✓ Server stopped")
    sys.exit(0)
except OSError as e:
    if e.errno == 48:  # Address already in use
        print(f"\n✗ Error: Port {PORT} is already in use.")
        print(f"  Try a different port by editing this script, or stop the other server.\n")
    else:
        print(f"\n✗ Error: {e}\n")
    sys.exit(1)
