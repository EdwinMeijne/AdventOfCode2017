console.time('Total time');

import {input} from './input';
const phrases: string[] = input.split('\n');

console.log('Answer 1: ' + getNonDuplicatingPhrases(phrases).length);
console.log('Answer 2: ' + getNonAnagramPhrases(phrases).length);

console.timeEnd('Total time');

// --------------------------------

function getNonDuplicatingPhrases(phrases: string[]) {
    return phrases.filter((phrase) => {
        const phraseArr = phrase.split(' ');
        return (new Set(phraseArr)).size === phraseArr.length;
    });
}

function getNonAnagramPhrases(phrases: string[]) {
    return phrases.filter((phrase) => {
        const phraseArrSorted = phrase.split(' ').map(word => word.split('').sort().toString());
        return (new Set(phraseArrSorted)).size === phraseArrSorted.length;
    });
}
