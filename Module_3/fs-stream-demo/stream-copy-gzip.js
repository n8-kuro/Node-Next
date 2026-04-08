import { createReadStream, createWriteStream  } from 'fs';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

console.time('copy');
await pipeline(
    createReadStream('big.log'),
    createWriteStream('big-copy.log')
);
console.timeEnd('copy');
console.time('gzip');
await pipeline(
    createReadStream('big.log'),
    createGzip(),
    createWriteStream('big.log.gz')
);
console.timeEnd('gzip');
const original = await stat('big.log');
const copy = await stat('big-copy.log');
const zipped = await stat('big.log.gz');
console.log('original:', original.size);
console.log('copy:', copy.size);
console.log('gzip:', zipped.size);
