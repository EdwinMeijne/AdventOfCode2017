console.time('Total time');

import {input} from './input';
const jumps: number[] = input.split('\n').map((val) => parseInt(val));

console.log('Answer 1: ' + breakout(...jumps));
console.log('Answer 2: ' + breakoutDifferent(...jumps));

console.timeEnd('Total time');

// --------------------------------

function breakout(...jumpArr: number[]) {
    let index = 0;
    let steps = 0;

    do {
        steps++;
        index += jumpArr[index]++;
    } while(jumpArr.length > index || index < 0);

    return steps;
}

function breakoutDifferent(...jumpArr: number[]) {
    let index = 0;
    let steps = 0;

    do {
        steps++;
        index += (jumpArr[index] >= 3) ? jumpArr[index]-- : jumpArr[index]++;
    } while(jumpArr.length > index || index < 0);

    return steps;
}
