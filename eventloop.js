console.log('0: EventLoop');
console.log('Hidden');

// console.log('1: Начало');
// setTimeout(() => {
//     console.log('2: Таймер(макрозадача)');
// }, 0);
// Promise.resolve().then(() => {
//     console.log('3: Promise(Микрозадача)');
// });
// console.log('4: Конец');
console.log();
console.log('5: Table');
console.log();
const users = [
    { name: 'Alexey', age: 25 },
    { name: 'Big Bo$$', age: 47 },
];

console.table(users);
console.log();
console.log('10: Loop');
console.log();
console.time('loop');

let sum = 0;
for (let i = 0; i < 1_000_000; i++) {
    sum += i;
}
console.timeEnd('loop');

console.log();
console.log('15: Tuff');
console.log();

console.log('^.^')