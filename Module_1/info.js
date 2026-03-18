console.log('Hello, Node.js');
console.log('Node,js version: ', process.version);
console.log('Current platform:', process.platform);
console.log('Current directory:', process.cwd());
console.log('Arguments:', process.argv.slice(2));
console.log('Memory:', process.memoryUsage().heapUsed, 'byte');
