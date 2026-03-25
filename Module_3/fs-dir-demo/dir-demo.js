import { mkdir, readdir, rm, stat, writeFile } from 'fs/promises';

console.log('1) Создаем структуру директорий');

await mkdir('project/src/utils', { recursive: true });
await mkdir('project/logs/2026/03', { recursive: true });

console.log('2) Создаем тестовые файлы');

await writeFile('project/src/index.js', "console.log('hello from index');\n", 'utf-8');
await writeFile('project/src/utils/mat.js', 'export const sum=(a,b)=>a+b;\n', 'utf-8');

console.log('3) Читаем содержимое project/src');

const files = await readdir('project/src');
console.log(files);
console.log('4) Читаем содержимое с типами');

const entries = await readdir('project/src', { withFileTypes: true });
for (const entry of entries) {
    const type = entry.isDirectory() ? 'DIR' : 'FILE';
    console.log((`${type}: ${entry.name}`));
}

console.log('5) Получаем метаданные файла index.js');
const info = await stat('project/src/index.js');
console.log('size:', info.size, 'bytes');
console.log('updated:', info.mtime.toISOString());
console.log('6) Удаляем временные логи');
await rm('project/logs', { recursive: true, force: true });
console.log('Логи удалены');

try {
    await readdir('project/missing-folder');
} catch (err) {
    if (err.code === 'ENOENT') {
        console.log('Папка не найдена:', err.path);
    } else {
        throw err;
    }
}

