import type { Cell } from '@maxgraph/core';

export function isCondition(node: Cell) {
    return (
        (node.value as string).startsWith('If') ||
        (node.value as string).startsWith('While')
    );
}
export function isEnd(node: Cell) {
    return node.value == 'End';
}
export function isStart(node: Cell) {
    return node.value == 'Start';
}
export function leadsNowhere(node?: Cell) {
    return !node?.getOutgoingEdges().length;
}
