#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import urllib.parse

class UTF8HTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

    def translate_path(self, path):
        path = urllib.parse.unquote(path)
        if path.startswith('/assets/'):
            path = path.replace('/assets/', '')
            for root, dirs, files in os.walk('首页 _ SIS_files'):
                for file in files:
                    if path.endswith(file):
                        return os.path.join(root, file)
        return super().translate_path(path)

if __name__ == '__main__':
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, UTF8HTTPRequestHandler)
    print(f'Serving HTTP on 0.0.0.0 port {port} (http://0.0.0.0:{port}/) ...')
    httpd.serve_forever()
