console.time('Total time');

import {input} from './input';
const bank: number[] = input.split('\t').map(val => parseInt(val));

const {cycles, loop} = distCycles(...bank);

console.log('Answer 1: ' + cycles);
console.log('Answer 2: ' + loop);

console.timeEnd('Total time');

// --------------------------------

function distCycles(...bank:number[]) {
    const combinations: string[] = [bank.join(',')];

    while(true) {
        const largestIndex = bank.indexOf(Math.max(...bank));

        bank[largestIndex] = 0;
        for(let i = 1; i <= bank[largestIndex]; i++) {
            bank[(largestIndex + i) % bank.length]++;
        }

        if (combinations.indexOf(bank.join(',')) === -1) {
            combinations.push(bank.join(','));
        } else {
            break;
        }
    }

    return {
        cycles: combinations.length,
        loop: combinations.length - combinations.indexOf(bank.join(',')),
    };
}
