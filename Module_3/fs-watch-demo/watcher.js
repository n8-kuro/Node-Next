import { watch } from 'fs/promises';
const watcher = watch('src', { recursive: true });
const stopAfterMs = 120_000;
console.log('Watching ./src for 120 seconds...');

const timer = setTimeout(() => {
    watcher.return();
}, stopAfterMs);

try {
    for await (const event of watcher) {
        const file = event.filename ?? '<unknown>';
        const ts = new Date().toISOString();
        console.log('[${ts}] ${event.eventType}: ${file}');
    }
} finally {
    clearTimeout(timer);
    console.log('Watcher stopped');
}