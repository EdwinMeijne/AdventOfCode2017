import {forEachComment} from 'tslint';

console.time('Total time');

import {input} from './input';

const programsArr = input
    .split('\n')
    .reduce((programArr, program: string) => {
        const [, id, weight, children] = program.match(/^([a-z]*) \((.*)\)(?: -> )?(.*)$/);

        programArr.push({
            id,
            weight: parseInt(weight, 10),
            combinedWeight: 0,
            childIds: children ? children.split(',').map((child) => child.trim()) : [],
            children: {},
        });
        return programArr;
    }, []);

interface IProgram {
    id: string;
    weight: number;
    combinedWeight: number;
    childIds: string[];
}

const rootNode = findRootNode(...programsArr);

console.log('Answer 1: ' + rootNode);
console.log('Answer 2: ' + findWeightBalance(rootNode, ...programsArr));

console.timeEnd('Total time');

// --------------------------------

/**
 * The root node is the only node without a parent
 * @param {IProgram} nodes
 * @return {IProgram}
 */
function findRootNode(...nodes: IProgram[]) {
    const childNodeIds = nodes.reduce((nodeAcc, node) => nodeAcc.concat(node.childIds), []);
    // we assume it will be found, otherwise will throw an error
    return nodes.filter((node) => childNodeIds.indexOf(node.id) === -1)[0];
}

function findWeightBalance(root, ...nodes: IProgram[]) {
    const nodeToWeight = nodes.reduce((tree, node) => {
        tree[node.id] = node.weight;
        return tree;
    }, {});

    const nodeToChildren = nodes.reduce((tree, node) => {
        tree[node.id] = [...node.childIds];
        return tree;
    }, {});

    console.log(nodeToChildren, nodeToWeight);


}
