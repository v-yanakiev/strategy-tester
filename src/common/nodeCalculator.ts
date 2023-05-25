import type { Cell } from '@maxgraph/core';
export enum NodeType {
    If = 1,
    Buy = 2,
    Sell = 3,
    Start = 4,
    End = 5
}
export function isCondition(node: Cell) {
    return node.value.type == NodeType.If;
}
export function isEnd(node: Cell) {
    return node.value.type == NodeType.End;
}
export function isStart(node: Cell) {
    return node.value.type == NodeType.Start;
}
export function leadsNowhere(node?: Cell) {
    return !node?.getOutgoingEdges().length;
}
export function getNodeValue(node: Cell) {
    return node.value.value;
}
export function transformConditionIntoValueReturningFunction(
    conditionNode: Cell
) {
    return new Function(
        'currentStep',
        'previousSteps',
        'currentBalance',
        'previousBalances',
        `let ss=globalThis.ss;let mathjs=globalThis.mathjs;
        return ${getNodeValue(conditionNode)}`
    ) as any as (...args: any[]) => any;
}
