import { writeFile } from 'fs/promises';

console.log('start async write');
setTimeout(() => console.log('timer fired (async write)'), 0);
await writeFile('async.txt', 'ASYNC DATA\n', 'utf-8');
console.log('end async write');
