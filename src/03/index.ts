console.time('Total time');

import {input} from './input';
const memLoc = parseInt(input);

console.log('Answer 1: ' + taxiDistanceToInputMemory(memLoc));
console.log('Answer 2: ' + stressTest(memLoc));

console.timeEnd('Total time');

function taxiDistanceToInputMemory(input: number) {
    const memSize = calculateSize(input);
    const memPos = (memSize * memSize) - input;

    const direction = Math.floor(memPos / (memSize - 1));
    const location = memPos % (memSize - 1);

    const zeroPoint = {
        x: Math.ceil(memSize / 2),
        y: Math.ceil(memSize / 2),
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

function stressTest(memLoc: number) {
    const enum directions {
        'right',
        'up',
        'left',
        'down',
    }

    const gridValues = [{
        x: 0,
        y: 0,
        value: 1,
    }];

    let x = 0;
    let y = 0;
    let direction = directions.right;
    let value = 1;

    do {
        // Calculate new position of x / y and new direction based on 'if we can go around the corner yet'
        switch (direction) {
            case directions.right:
                x++;
                direction = (gridValues.some((entry) => entry.y === y - 1 && entry.x === x)) ? direction : directions.up;
                break;
            case directions.up:
                y--;
                direction = (gridValues.some((entry) => entry.y === y && entry.x === x - 1)) ? direction : directions.left;
                break;
            case directions.left:
                x--;
                direction = (gridValues.some((entry) => entry.y === y + 1 && entry.x === x)) ? direction : directions.down;
                break;
            case directions.down:
                y++;
                direction = (gridValues.some((entry) => entry.y === y && entry.x === x + 1)) ? direction : directions.right;
                break;
        }

        value = gridValues
            .filter((entry) => Math.abs(entry.x - x) <= 1 && Math.abs(entry.y - y) <= 1) // grab all fields around item
            .reduce((total, {value}) => total + value, 0); // count total

        gridValues.push({x, y, value});

    } while (value < memLoc);

    console.log(gridValues.map(val => ({x:val.x, y:val.y})));

    return value;
}

function calculateSize(input: number) {
    const sqr = Math.ceil(Math.sqrt(input));
    return sqr % 2 === 1 ? sqr : sqr + 1;
}

function taxiDistance(marker1, marker2 = {x: 0, y: 0}): number {
    return Math.abs(marker1.x - marker2.x) + Math.abs(marker1.y - marker2.y);
}
