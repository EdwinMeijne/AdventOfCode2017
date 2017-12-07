import {input} from './input';

console.time('Total time');

const programsArr = input
    .split('\n')
    .reduce((programArr, program: string) => {
        const [, id, weight, children] = program.match(/^([a-z]*) \((.*)\)(?: -> )?(.*)$/);

        programArr.push({
            id,
            weight: parseInt(weight, 10),
            childIds: children ? children.split(',').map((child) => child.trim()) : [],
        });
        return programArr;
    }, []);

interface IProgram {
    id: string;
    weight: number;
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
    return nodes.filter((node) => childNodeIds.indexOf(node.id) === -1)[0].id;
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
