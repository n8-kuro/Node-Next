import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Home page' });
});
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: 'Запроше пользователь с ID: ${userId}'});
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ message: 'Пользователь создан', name, email});
});

app.listen(PORT, () => {
    console.log('Server: https://localhost:$(PORT)');
});