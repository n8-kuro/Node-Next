import { createReadStream } from 'fs';

let chunks = 0;
let bytes = 0;
const stream = createReadStream('big.log', {
    encoding: 'utf-8',
    highWaterMark: 64 * 1024
});

stream.on('data', (chunk) => {
    chunks += 1;
    bytes += Buffer.byteLength(chunk, 'utf-8');
});
stream.on('end', () => {
    console.log('chunks:', chunks);
    console.log('bytes:', bytes);
});
stream.on('error', (err) => {
    console.error('read error:', err.message);
});