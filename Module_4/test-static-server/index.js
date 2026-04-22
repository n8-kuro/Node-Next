import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
};
const server = createServer(async (req, res) => {
    const rawPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = join("public", rawPath);
    const ext = extname(filePath);
    const contentType = MIME[ext] ?? "application/octet-stream";
    try {
        const data = await readFile(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
    } catch {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=utf-8"
        });
        res.end("<h1>404 — Файл не найден</h1>");
    }
});
server.listen(3000);