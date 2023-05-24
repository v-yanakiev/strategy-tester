import type { Cell } from '@maxgraph/core';

export function isCondition(node: Cell) {
    return (node.value as string).startsWith('if');
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
export function getCondition(node: Cell) {
    return (node.value as string).slice('if: '.length)[0];
}
export function getCodeToExecute(node: Cell) {
    return (node.value as string).slice('Execute code: '.length)[0];
}
