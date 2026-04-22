import { createServer } from 'http';
import { text } from 'stream/consumers';

const users = [
    { id: 1, name: 'Алексей' },
    { id: 2, name: 'Мария' },
];

const messages = [
    { id: 1, author: 'Alex', text: 'Hello' },
    { id: 2, author: 'Maria', text: 'Hi' },
    { id: 3, author: 'Alex', text: 'Node.js' },

]

const server = createServer((req, res) => {
    const { method, url } = req;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (method === 'GET' && url === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Главная страница' }));
    } else if (method === 'GET' && url === '/api/users') {
        res.writeHead(200);
        res.end(JSON.stringify(users));
    } else if (method === 'POST' && url === '/api/users') {
        let body = '';
        req.on('data', (chunk) => body += chunk);
        req.on('end', () => {
            try {
                const user = JSON.parse(body);
                user.id = Date.now();
                users.push(user);
                res.writeHead(201);
                res.end(JSON.stringify(user));
            } catch {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Некорректный JSON' }));
            }
        });
    } else if (method === "GET" && url.startsWith("/api/messages")) {
        const parsedUrl = new URL(url, `http://${req.headers.host}`);
        const query = Object.fromEntries(parsedUrl.searchParams);
        const page = Number(query.page ?? 1);
        const limit = Number(query.limit ?? 10);
        let filtered = messages;
        if (query.author) {
            filtered = filtered.filter((m) => m.author === query.author);
        }
        const start = (page - 1) * limit;
        const paged = filtered.slice(start, start + limit);
        res.writeHead(200);
        res.end(JSON.stringify({
            query, total: filtered.length, data:
                paged
        }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Не найдено' }));
    }
});
server.listen(3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
});
