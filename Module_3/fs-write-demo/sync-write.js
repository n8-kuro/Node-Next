import { writeFileSync } from 'fs';

console.log('start sync write');
setTimeout(() => console.log('time fired (sync write)'), 0);
writeSync('sync.txt', 'SYNC DATA\n', 'utf-8');
console.log('end sync write');
