#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import http.server
import socketserver
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

if __name__ == "__main__":
    os.chdir('html')
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"HTTP server running on port {PORT}")
        print(f"Access URL: http://localhost:{PORT}/datacockpit/cockpits.html")
        httpd.serve_forever()