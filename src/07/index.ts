import {input} from './input';

console.time('Total time');

interface ITreeNode {
    weight: number;
    parent: string;
    childIds: string[];
}

const programTreeMap: Map<string, ITreeNode> = input
    .split('\n')
    .reduce((treeMap, program: string) => {
        const [, id, weight, children] = program.match(/^([a-z]*) \((.*)\)(?: -> )?(.*)$/);
        treeMap.set(id, {
            weight: parseInt(weight, 10),
            parent: '',
            childIds: children ? children.split(',').map((child) => child.trim()) : [],
        });
        return treeMap;
    }, new Map());

programTreeMap.forEach((node, id) => {
    node.childIds.forEach((childId) => {
        if (programTreeMap.has(childId)) {
            programTreeMap.get(childId).parent = id;
        }
    });
});

console.log('Answer 1: ', getOrphans(programTreeMap));
console.log('Answer 2: ', checkBalance(programTreeMap));

console.timeEnd('Total time');

// --------------------------------

function getOrphans(tree: Map<string, ITreeNode>) {
    return [...tree.entries()].find(([id, node]) => node.parent === '');
}

/*
loop through all top level children
for each kid, check siblings
check total weight
see if in balance
if yes, remove kids
go back to begin
 */

function checkBalance(tree: Map<string, ITreeNode>) {
    console.log('Balancing cycle: ----------');
    const treeClone = new Map(tree);

    const checkMap = [...treeClone.entries()]
        .filter(([, node]) => node.childIds.filter((childId) => treeClone.has(childId)).length === 0)
        .reduce((parentMap, [id, node]) => {
            if (! parentMap.has(node.parent)) {
                parentMap.set(node.parent, []);
            }
            parentMap.get(node.parent).push(node);

            treeClone.delete(id);
            return parentMap;
        }, new Map() as Map<string, ITreeNode[]>);

    if (checkMap.size > 1) {
        checkMap.forEach((lastChilds, id) => {
            lastChilds.forEach((lastChild) => {
                 
            });
        });

        // console.log(treeClone);
        checkBalance(treeClone);
    } else {
        return false;
    }
}
