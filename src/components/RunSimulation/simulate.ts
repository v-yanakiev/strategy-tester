import {
    getNodeValue,
    isBuy,
    isCondition,
    isSell,
    isStart,
    transformConditionValueIntoValueReturningFunction,
    type ConditionToCalculate,
    isEnd,
    returnNodeWhichFollowsFromTrue,
    returnNodeWhichFollowsFromFalse,
    returnNodeWhichFollows
} from '@/common/nodeCalculator';
import { useGraphStore } from '@/stores/graphStore';
import { useParsedDataStore } from '@/stores/parsedDataStore';
import { SimulationState, useSimulationStore } from '@/stores/simulationStore';
import type { Cell } from '@maxgraph/core';
import { watch } from 'vue';
import * as simplestats from 'simple-statistics';
import * as mathjs from 'mathjs';
import * as technicalindicators from 'technicalindicators';
export async function simulate() {
    const graphStore = useGraphStore();
    const simulationStore = useSimulationStore();
    const parsedDataStore = useParsedDataStore();
    // const url = new URL(
    //     '../../workers/computeAnswerToConditionWorker.js',
    //     import.meta.url
    // );
    // const poolToUse = (workerpool as any).pool(url.toString(), {
    //     type: 'module'
    // });
    simulationStore.state = SimulationState.StartingCalculations;
    const steps = parsedDataStore
        .getNonProxyParsedData()!
        .data.sort((a) => a[parsedDataStore.timeVariableName!]);
    simulationStore.moneyBalances = [
        simulationStore.getInitialBalance()!,
        simulationStore.getInitialBalance()!
    ];
    simulationStore.quantitiesOfAssetInPossession = [0, 0];

    const nodeAndItsConditionsResultOverTime = new Map<
        string,
        ConditionToCalculate | boolean[]
    >();
    const allConditions = graphStore.getAllConditions();
    watch(
        () => simulationStore.state,
        () =>
            simulationStore.state ==
                SimulationState.InitialCalculationsFinished &&
            simulateEvolutionOfBalance(
                graphStore.getStartNode(),
                nodeAndItsConditionsResultOverTime,
                steps,
                simulationStore.moneyBalances,
                simulationStore.quantitiesOfAssetInPossession,
                parsedDataStore.priceVariableName!
            )
    );

    preCalculateWherePossible(
        allConditions,
        nodeAndItsConditionsResultOverTime,
        steps
        // poolToUse,
    );
}
function simulateEvolutionOfBalance(
    startNode: Cell,
    nodeAndItsConditionsResultOverTime: Map<
        string,
        ConditionToCalculate | boolean[]
    >,
    steps: any[],
    moneyBalances: number[],
    quantitiesOfAssetInPossession: number[],
    priceVariableName: string
) {
    const simulationStore = useSimulationStore();
    simulationStore.maxQuantityThatCouldHaveBeenPurchasedInTheBeginning =
        Math.floor(moneyBalances[1] / steps[1][priceVariableName]);
    for (let stepIndex = 1; stepIndex < steps.length; stepIndex++) {
        handleAllConnectedNodesInGraph(startNode);
        performContinuationOfTimeSeries();
        function performContinuationOfTimeSeries() {
            moneyBalances[stepIndex + 1] = moneyBalances[stepIndex];
            quantitiesOfAssetInPossession[stepIndex + 1] =
                quantitiesOfAssetInPossession[stepIndex];
        }
        function handleAllConnectedNodesInGraph(node: Cell): void {
            if (isStart(node)) {
                handleAllConnectedNodesInGraph(returnNodeWhichFollows(node));
            } else if (isCondition(node)) {
                continueFromConditionNode(node);
            } else if (isBuy(node) || isSell(node)) {
                executeActivityNode(node);
                handleAllConnectedNodesInGraph(returnNodeWhichFollows(node));
            } else {
                return;
            }
        }
        function continueFromConditionNode(node: Cell) {
            const calculationOrResult = nodeAndItsConditionsResultOverTime.get(
                node.id!
            )!;
            let outcome: boolean;
            if (calculationOrResult instanceof Function) {
                outcome = calculationOrResult(
                    steps[stepIndex],
                    steps.slice(0, stepIndex),
                    moneyBalances[stepIndex],
                    moneyBalances,
                    simplestats,
                    mathjs,
                    technicalindicators
                );
            } else {
                outcome = calculationOrResult[stepIndex];
            }
            if (outcome) {
                handleAllConnectedNodesInGraph(
                    returnNodeWhichFollowsFromTrue(node)
                );
            } else {
                handleAllConnectedNodesInGraph(
                    returnNodeWhichFollowsFromFalse(node)
                );
            }
        }
        function executeActivityNode(node: Cell) {
            if (isBuy(node)) {
                if (
                    moneyBalances[stepIndex] -
                        steps[stepIndex][priceVariableName] *
                            getNodeValue(node) >=
                    0
                ) {
                    quantitiesOfAssetInPossession[stepIndex] +=
                        getNodeValue(node);
                    moneyBalances[stepIndex] -=
                        steps[stepIndex][priceVariableName] *
                        getNodeValue(node);
                } else {
                    // console.log(
                    //     `You wanted to buy ${getNodeValue(
                    //         node
                    //     )} assets, at a price of ${
                    //         steps[stepIndex][priceVariableName]
                    //     } each, but you only had ${
                    //         moneyBalances[stepIndex]
                    //     } money`
                    // );
                }
            } else if (isSell(node)) {
                if (
                    quantitiesOfAssetInPossession[stepIndex] -
                        getNodeValue(node) >=
                    0
                ) {
                    quantitiesOfAssetInPossession[stepIndex] -=
                        getNodeValue(node);
                    moneyBalances[stepIndex] +=
                        steps[stepIndex][priceVariableName] *
                        getNodeValue(node);
                } else {
                    // console.log(
                    //     `You wanted to sell ${getNodeValue(
                    //         node
                    //     )} assets, but you only had ${
                    //         quantitiesOfAssetInPossession[stepIndex]
                    //     }`
                    // );
                }
            }
        }
    }
    simulationStore.state = SimulationState.AllCalculationsFinished;
}
function preCalculateWherePossible(
    allConditions: Cell[],
    nodeAndItsConditionsResultOverTime: Map<string, Function | boolean[]>,
    steps: any[]
    // poolToUse: any,
) {
    for (const condition of allConditions) {
        // if (
        //     (getNodeValue(condition) as string).includes('currentBalance') ||
        //     (getNodeValue(condition) as string).includes('previousBalances')
        // ) {
        //cannot be precalculated
        nodeAndItsConditionsResultOverTime.set(
            condition.id!,
            transformConditionValueIntoValueReturningFunction(
                getNodeValue(condition)
            )
        );
        // } else {
        //     //can be precalculated across all steps
        //     nodeAndItsConditionsResultOverTime.set(condition.id!, []);
        //     for (let i = 0; i < steps.length; i++) {
        //         calculate(
        //             poolToUse,
        //             condition,
        //             steps,
        //             nodeAndItsConditionsResultOverTime,
        //             i,
        //             condition.id!,
        //             simulationStore
        //         );
        //     }
        // }
    }
    useSimulationStore().state = SimulationState.InitialCalculationsFinished;
}

// function calculate(
//     poolToUse: any,
//     condition: Cell,
//     steps: any[],
//     nodeAndItsConditionsResultOverTime: Map<string, Function | boolean[]>,
//     lockedIndex: number,
//     lockedConditionId: string,
//     simulationStore: any
// ) {
//     poolToUse
//         .exec('computeAnswerToCondition', [
//             getNodeValue(condition),
//             steps[lockedIndex],
//             steps.slice(0, lockedIndex)
//         ])
//         .then((result: any) => {
//             console.log(`result: ${result}`);
//             const array = nodeAndItsConditionsResultOverTime.get(
//                 lockedConditionId
//             ) as boolean[];
//             array[lockedIndex] = result;
//         })
//         .catch((error: any) => {
//             console.log(`error: ${error}`);
//         })
//         .then((maybeAnswer: any) => {
//             if (
//                 poolToUse.stats().pendingTasks === 0 &&
//                 poolToUse.stats().activeTasks === 0
//             ) {
//                 poolToUse.terminate();
//                 simulationStore.state =
//                     SimulationState.InitialCalculationsFinished;
//             }
//         });
// }
