import { readFile } from 'fs/promises';
const mb = (n) => (n / 1024 / 1024).toFixed(2) + 'MB';
console.log('heap before:', mb(process.memoryUsage().heapUsed));
const content = await readFile('big.log', 'utf-8');
console.log('length:', content.length);
console.log('heap after:', mb(process.memoryUsage().heapUsed));
