import type { Cell } from '@maxgraph/core';
export enum NodeType {
    If = 1,
    Buy = 2,
    Sell = 3,
    Start = 4,
    End = 5
}
export enum PathChosen {
    True = 1,
    False = 2
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
export function isBuy(node: Cell) {
    return node.value.type == NodeType.Buy;
}
export function isSell(node: Cell) {
    return node.value.type == NodeType.Sell;
}
export function leadsNowhere(node?: Cell) {
    return !node?.getOutgoingEdges().length;
}
export function getNodeValue(node: Cell) {
    return node.value.value;
}
export function returnNodeWhichFollows(simpleNode: Cell) {
    return simpleNode.getOutgoingEdges()[0].target!;
}
export function returnNodeWhichFollowsFromTrue(conditionalNode: Cell) {
    return conditionalNode
        .getOutgoingEdges()
        .find((a) => a.value == PathChosen.True)!.target!;
}
export function returnNodeWhichFollowsFromFalse(conditionalNode: Cell) {
    return conditionalNode
        .getOutgoingEdges()
        .find((a) => a.value == PathChosen.False)!.target!;
}
export function transformConditionValueIntoValueReturningFunction(
    conditionValue: string
) {
    return new Function(
        'currentStep',
        'previousSteps',
        'currentBalance',
        'previousBalances',
        'simplestats',
        'mathjs',
        'indicatorts',
        `return ${conditionValue}`
    ) as ConditionToCalculate;
}
export type ConditionToCalculate = (
    currentStep: any,
    previousSteps: any,
    currentBalance: any,
    previousBalances: any,
    simplestats: any,
    mathjs: any
) => boolean;
