console.time('Total time');
import {input} from './input';

interface IMarker {
    x: number,
    y: number
}

interface IMarkers {
    a: IMarker[];
    b: IMarker[];
    x: number,
    y: number,
}

const inputArray: string[] = input.replace(/ /g, '').split(',');

// First convert input into two arrays of placed markers
const {a: markersA, b: markersB}: IMarkers = inputArray.reduce(reduceToMarkerArrays, {a: [], b: [], x: 0, y: 0});

console.time('distance');
// Calculate distance of both A and B markers by finding the largest taxi distance
const distanceA = markersA.map((marker) => taxiDistance(marker)).reduce(findMax, 0);
const distanceB = markersB.map((marker) => taxiDistance(marker)).reduce(findMax, 0);
console.timeEnd('distance');

console.time('distance2');
// Calculate distance of both A and B markers by finding the largest taxi distance
let maxO = 0;
markersA.concat(markersB).forEach((marker) => {
    maxO = findMax(maxO, taxiDistance(marker));
});
console.timeEnd('distance2');


// Calculate distance between all possible pairs and find the max value
console.time('longest');
const longestDistance = markersA.map((marker1) => {
    return markersB.map((marker2) => {
        return taxiDistance(marker1, marker2);
    }).reduce(findMax, 0);
}).reduce(findMax, 0);
console.timeEnd('longest');

console.time('longest2');
let maxAB = 0;
// Calculate distance between all possible pairs and find the max value
markersA.forEach((marker1) => {
    markersB.forEach((marker2) => {
        maxAB = findMax(maxAB, taxiDistance(marker1, marker2));
    });
});
console.timeEnd('longest2');

console.log(`'A' markers: ${markersA.length}`);
console.log(`'B' markers: ${markersB.length}`);
console.log(`Tested ${markersA.length * markersB.length} combinations!`);
console.log('Answer 1: ' + Math.max(distanceA, distanceB));
console.log('Answer 2: ' + longestDistance);
console.log('Answer 1: ' + maxO);
console.log('Answer 2: ' + maxAB);
console.timeEnd('Total time');

// --------------------------------

function reduceToMarkerArrays(markerArrays: IMarkers, item: string) {
    switch (item) {
        case 'Down':
            markerArrays.y--;
            break;
        case 'Up':
            markerArrays.y++;
            break;
        case 'Left':
            markerArrays.x--;
            break;
        case 'Right':
            markerArrays.x++;
            break;
        case 'A':
            markerArrays.a.push({
                x: markerArrays.x,
                y: markerArrays.y,
            });
            break;
        case 'B':
            markerArrays.b.push({
                x: markerArrays.x,
                y: markerArrays.y,
            });
            break;
        default:
    }
    return markerArrays;
}

function findMax(furthest: number, taxiDistance: number) {
    return Math.max(taxiDistance, furthest);
}

function taxiDistance(marker1, marker2 = {x: 0, y: 0}): number {
    return Math.abs(marker1.x - marker2.x) + Math.abs(marker1.y - marker2.y);
}

