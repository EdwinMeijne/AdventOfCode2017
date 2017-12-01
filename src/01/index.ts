console.time('Total time');

import {input} from './input';

// Extract to array and add first character to the end to simulate a loop
const inputArray = input.split('').concat([input.charAt(0)]).map((num) => parseInt(num));

interface IAcc {
    last: number,
    sum: number,
}

const {sum} = inputArray.reduce((acc: IAcc, item: number) => {
    if (acc.last === item) acc.sum += item;
    acc.last = item;
    return acc;
}, { last: 0, sum: 0});

console.log('Answer 1: ' + sum);
console.timeEnd('Total time');
