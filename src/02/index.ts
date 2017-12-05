console.time('Total time');

import {input} from './input';

const rows: number[][] = input.split('\n').map(row => row.split('\t').map(item => parseInt(item)));

// const checksum1 = rows
//     .map(row => Math.max(...row)) - Math.min(..row))
//     .reduce((total, item) => total + item);

const checksum2 = rows.map(row => {
    let division = 0;
    row.forEach((item) => {
        row.forEach((comparingItem) => {
            if((item % comparingItem) === 0 && comparingItem !== item) {
                division = item / comparingItem;
            }
        });
    });
    return division;
}).reduce((total, item) => total + item);

console.log('Answer 1:', checksum1);
console.log('Answer 2:', checksum2);

console.timeEnd('Total time');
