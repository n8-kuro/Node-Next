import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello, express' });
});

app.listen(PORT, () => {
    console.log('Server: https://localhost:$(PORT)');
});