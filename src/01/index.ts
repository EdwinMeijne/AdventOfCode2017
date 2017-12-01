console.time('Total time');

import {input} from './input';

// Extract to array and add first character to the end to simulate a loop
const inputArray = input.split('').map((num) => parseInt(num));

const distance = Math.floor(inputArray.length / 2);
let sum1 = 0;
let sum2 = 0;

inputArray.forEach((value, index, array) => {
    if (value === array[(index + 1) % array.length]) sum1 += value;
    if (value === array[(index + distance) % array.length]) sum2 += value;
});

console.log('Answer 1: ' + sum1);
console.log('Answer 2: ' + sum2);
console.timeEnd('Total time');
