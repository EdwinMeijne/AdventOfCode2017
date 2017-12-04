console.time('Total time');

import {input} from './input';
const memLoc = parseInt(input);

console.log('Answer 1: ' + taxiDistanceToInputMemory(memLoc));

console.timeEnd('Total time');

function taxiDistanceToInputMemory(input) {
    const memSize = calculateSize(input);
    const memPos = (memSize * memSize) - input;

    const direction = Math.floor(memPos / (memSize - 1));
    const location = memPos % (memSize - 1);

    const zeroPoint = {
        x: Math.ceil(memSize / 2),
        y: Math.ceil(memSize / 2)
    };

    const memPoint = {
        x: 0,
        y: 0,
    };

    switch(direction) {
        case 0:
            memPoint.y = memSize;
            memPoint.x = memSize - location;
            break;
        case 1:
            memPoint.y = memSize - location;
            memPoint.x = 1;
            break;
        case 2:
            memPoint.y = 1;
            memPoint.x = memSize - location;
            break;
        case 3:
            memPoint.y = memSize - location;
            memPoint.x = memSize;
            break;
        default:
    }

    return taxiDistance(zeroPoint, memPoint);
}

function calculateSize(input: number) {
    const sqr = Math.ceil(Math.sqrt(input));
    return sqr % 2 === 1 ? sqr : sqr + 1;
}

function taxiDistance(marker1, marker2 = {x: 0, y: 0}): number {
    return Math.abs(marker1.x - marker2.x) + Math.abs(marker1.y - marker2.y);
}
